import httpProxy from 'http-proxy'
import Cookies from 'cookies'
import url from 'url'

const proxy = httpProxy.createProxyServer()

export const config = {
	api: {
		bodyParser: false,
	},
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
	delete req.headers.host
	delete req.headers["x-forwarded-port"]
	// delete req.headers["x-invoke-output"]

	return new Promise((resolve, reject) => {
		const pathname = url.parse(req.url).pathname
		const isLogin = pathname === '/api/proxy/guest/authentication' || pathname === '/api/proxy/guest/authentication/admin' || pathname === '/api/proxy/guest/register'
		const cookies = new Cookies(req, res)
		const authToken = cookies.get('auth-token')

		req.url = req.url.replace(/^\/api\/proxy/, '')
		req.headers.cookie = ''

		if (authToken) {
			console.log('send API request with token');
			req.headers['Authorization'] = `Bearer ${authToken}`
		}
		if (isLogin) {
			console.log('try to connect');
			proxy.once('proxyRes', interceptLoginResponse)
		}

		proxy.once('error', reject)
		proxy.web(req, res, {
			target: process.env.NEXT_PUBLIC_API_URL, 
			autoRewrite: false, //donnée de la requête
			selfHandleResponse: isLogin, //true > alors on s'occupe nous même de la réponse (objectif recupérer le JWT)
			// changeOrigin:true
		})

		function interceptLoginResponse(proxyRes, req, res) {
			let apiResponseBody = ''
			proxyRes.on('data', (chunk) => {
				apiResponseBody += chunk
			})
			proxyRes.on('end', () => {
				try {
					if (proxyRes.statusCode === 200) {
						const bodyToken = JSON.parse(apiResponseBody)
						const authToken = bodyToken.token.plainTextToken
						const userData = bodyToken.user
						
						const cookies = new Cookies(req, res)
						cookies.set('auth-token', authToken, {
							httpOnly: true,
							sameSite: 'lax', //protection supplémentaire CSRF
				
						})
						res.status(200).json({ data:userData })
						// res.status(200).json({ loggedIn: true })
						resolve()
					} 
					else {
						res.status(proxyRes.statusCode).json({ loggedIn: false })
						resolve()
					}
				} catch (err) {
					console.log("Server error :" && err);
					reject(err)
				}
			})
		}
	})
}
