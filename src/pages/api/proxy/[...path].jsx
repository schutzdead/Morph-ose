// import httpProxy from 'http-proxy'
// import Cookies from 'cookies'
// import url from 'url'

// const proxy = httpProxy.createProxyServer()

// export const config = {
// 	api: {
// 		bodyParser: false,
// 	},
// }

// // eslint-disable-next-line import/no-anonymous-default-export
// export default (req, res) => {
// 	delete req.headers.host
// 	delete req.headers["x-forwarded-port"]
// 	// delete req.headers["x-invoke-output"]

// 	return new Promise((resolve, reject) => {
// 		const pathname = url.parse(req.url).pathname
// 		const isLogin = pathname === '/api/proxy/guest/authentication' || pathname === '/api/proxy/guest/authentication/admin' || pathname === '/api/proxy/guest/register'
// 		const cookies = new Cookies(req, res)
// 		const authToken = cookies.get('auth-token')

// 		req.url = req.url.replace(/^\/api\/proxy/, '')
// 		req.headers.cookie = ''

// 		if (authToken) {
// 			// console.log('send API request with token');
// 			req.headers['Authorization'] = `Bearer ${authToken}`
// 		}
// 		if (isLogin) {
// 			// console.log('try to connect');
// 			proxy.once('proxyRes', interceptLoginResponse)
// 		}

// 		proxy.once('error', reject)
// 		proxy.web(req, res, {
// 			target: process.env.NEXT_PUBLIC_API_URL, 
// 			autoRewrite: false, //donnée de la requête
// 			selfHandleResponse: isLogin, //true > alors on s'occupe nous même de la réponse (objectif recupérer le JWT)
// 			// changeOrigin:true
// 		})

// 		function interceptLoginResponse(proxyRes, req, res) {
// 			let apiResponseBody = ''
// 			proxyRes.on('data', (chunk) => {
// 				apiResponseBody += chunk
// 			})
// 			proxyRes.on('end', () => {
// 				try {
// 					if (proxyRes.statusCode === 200) {
// 						const bodyToken = JSON.parse(apiResponseBody)
// 						const authToken = bodyToken.token.plainTextToken
// 						const userData = bodyToken.user
// 						const cookies = new Cookies(req, res)
// 						cookies.set('auth-token', authToken, {
// 							httpOnly: true,
// 							sameSite: 'lax', //protection supplémentaire CSRF
				
// 						})
// 						res.status(200).json({ data:userData })
// 						// res.status(200).json({ loggedIn: true })
// 						resolve()
// 					} 
// 					else {
// 						res.status(proxyRes.statusCode).json({ loggedIn: false })
// 						resolve()
// 					}
// 				} catch (err) {
// 					console.log("Server error :" && err);
// 					reject(err)
// 				}
// 			})
// 		}
// 	})
// }

import { parse, serialize } from 'cookie';

export const config = {
	api: {
		bodyParser: true, // On autorise bodyParser car on utilise fetch directement
	},
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//const pathname = url.parse(req.url).pathname
// 		const isLogin = pathname === '/api/proxy/guest/authentication' || pathname === '/api/proxy/guest/authentication/admin' || pathname === '/api/proxy/guest/register'
// 		const cookies = new Cookies(req, res)
// 		const authToken = cookies.get('auth-token')

// 		req.url = req.url.replace(/^\/api\/proxy/, '')
// 		req.headers.cookie = ''

// 		if (authToken) {
// 			// console.log('send API request with token');
// 			req.headers['Authorization'] = `Bearer ${authToken}`
// 		}
// 		if (isLogin) {
// 			// console.log('try to connect');
// 			proxy.once('proxyRes', interceptLoginResponse)
// 		}


export default async function handler(req, res) {
	try {
		// 🏃 Récupération du chemin et de la query sans /api/proxy
		const path = req.url.replace(/^\/api\/proxy/, '');
		const targetUrl = `${API_URL}${path}${req.url.includes('?') ? `?${req.url.split('?')[1]}` : ''}`;
		// console.log(path, targetUrl);
		

		// 🍪 Lecture du cookie auth-token
		const cookies = parse(req.headers.cookie || '');
		const authToken = cookies['auth-token'];
		// console.log(cookies, authToken);

		// 📝 Configuration de la requête proxy
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
		};
		// console.log(headers);
		

		const fetchOptions = {
			method: req.method,
			headers,
			...(req.method !== 'GET' && req.method !== 'HEAD' ? { body: JSON.stringify(req.body) } : {}),
		};
		// console.log(fetchOptions);
		

		// 🌐 Requête vers l'API cible
		const apiResponse = await fetch(targetUrl, fetchOptions);
		const responseData = await apiResponse.json();
		// console.log(apiResponse);
		// console.log(responseData);
		

		// 🔐 Si c'est une authentification, on stocke le token dans un cookie sécurisé
		if (['/guest/authentication', '/guest/authentication/admin', '/guest/register'].includes(path) && apiResponse.ok) {
			const { token, user } = responseData;
			const authToken = token.plainTextToken;
			// console.log(authToken);
			
			res.setHeader(
				'Set-Cookie',
				serialize('auth-token', authToken, {
					httpOnly: true,
					sameSite: 'lax',
					path: '/',
					encode: (value) => value, // 🔥 Empêche l'encodage URL
				})
			);

			return res.status(200).json({ data: user });
		}

		// 🔄 On renvoie la réponse telle quelle
		return res.status(apiResponse.status).json(responseData);
	} catch (error) {
		console.error('Erreur du proxy:', error);
		return res.status(500).json({ error: 'Erreur interne du serveur proxy' });
	}
}