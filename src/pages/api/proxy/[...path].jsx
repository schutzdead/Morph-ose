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
	// delete req.headers.referer
	//Un appel est effectué direction le proxy : exemple > fetch('/api/proxy/me').then((response) => response.data)
	return new Promise((resolve, reject) => {
		//récupère de la req le chemin et on verifie qu'il est égal à celui pour se log (renvoi true)
		const pathname = url.parse(req.url).pathname
		const isLogin = pathname === '/api/proxy/guest/authentication' || pathname === '/api/proxy/guest/register'
        //crée un cookie pour auth-token s'il existe, sinon rien
		const cookies = new Cookies(req, res)
		const authToken = cookies.get('auth-token')
        //on réécrit l'url du proxy pour la remplacer par l'url API
        //supprime le cookie pour ne pas l'envoyer à l'API
		req.url = req.url.replace(/^\/api\/proxy/, '')
		req.headers.cookie = ''

        //si auth-token existait bien, alors on l'intègre au header grâce au cookie
		if (authToken) {
			console.log('send API request with token');
			req.headers['Authorization'] = `Bearer ${authToken}`
		}
		if (isLogin) {
			proxy.once('proxyRes', interceptLoginResponse)
		}
		// if (isLogin) {
		// 	if(authToken !== undefined) { 
		// 		res.status(401).json({ loggedIn: true, message:'Already Connect' }) 
		// 		resolve()
		// 	} else {
		// 	console.log('trying to log & no cookie');
		// 	const cookies = new Cookies(req, res)
		// 	cookies.set('auth-token')
		// 	console.log('cookie delete');
		// 	proxy.once('proxyRes', interceptLoginResponse)}
		// } else {
		// 	//?????? unsolved ?????? ajout pour résoudre la promesse dans le cas où l'URL Api n'est pas loggin > si erreur NEXTJS > API resolved without sending a response for /auth/users/current, this may result in stalled requests.
		// 	// res.end()
		// 	resolve()
		// }

        //gestion des erreurs
		proxy.once('error', reject)
        //envoi de la requête à l'API
		proxy.web(req, res, {
			target: 'https://api.bat-n3.darianne.fr/', 
			autoRewrite: false, //donnée de la requête
			selfHandleResponse: isLogin, //true > alors on s'occupe nous même de la réponse (objectif recupérer le JWT)
			// changeOrigin:true
		})

		//function pour lire et traiter la réponse de l'API
		//proxyRes emit uniquement sir la réquête a emise une réponse
		function interceptLoginResponse(proxyRes, req, res) {
			let apiResponseBody = ''
			//proxy.on permet d'écouter la réponse (chunk) et de l'ajouter à la variable apiResponseBody
			proxyRes.on('data', (chunk) => {
				apiResponseBody += chunk
				//montre sur le log du serveur le token
				// console.log(apiResponseBody);
			})
			//une fois la réponse récupérer
			proxyRes.on('end', () => {
				try {
					if (proxyRes.statusCode === 200) {
						//recupère dans la réponse la ligne qui correspond à 'authToken'
						const bodyToken = JSON.parse(apiResponseBody)
						const authToken = bodyToken.plainTextToken || bodyToken.token.plainTextToken
						const userData = bodyToken.user
						// console.log(userData);
						//on crée un nouveau cookie 'authcookie'
						const cookies = new Cookies(req, res)
						cookies.set('auth-token', authToken, {
							httpOnly: true,
							sameSite: 'lax', //protection supplémentaire CSRF
				
						})
						//la réponse ne contient pas le JWT > il renvoie juste loggedIn pour lui confirmer que c'est bon
						// console.log(res.statusCode, proxyRes.statusCode)
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
