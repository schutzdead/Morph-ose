import { parse, serialize } from 'cookie';

export const config = {
	api: {
		bodyParser: true,
	},
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req, res) {
	try {
		const path = req.url.replace(/^\/api\/proxy/, '');
		const targetUrl = `${API_URL}${path}${req.url.includes('?') ? `?${req.url.split('?')[1]}` : ''}`;

		const cookies = parse(req.headers.cookie || '');
		const authToken = cookies['auth-token'];

		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
		};
		

		const fetchOptions = {
			method: req.method,
			headers,
			...(req.method !== 'GET' && req.method !== 'HEAD' ? { body: JSON.stringify(req.body) } : {}),
		};
		

		const apiResponse = await fetch(targetUrl, fetchOptions);
		const responseData = await apiResponse.json();
		

		if (['/guest/authentication', '/guest/authentication/admin', '/guest/register'].includes(path) && apiResponse.ok) {
			const { token, user } = responseData;
			const authToken = token.plainTextToken;
			
			res.setHeader(
				'Set-Cookie',
				serialize('auth-token', authToken, {
					httpOnly: true,
					sameSite: 'lax',
					path: '/',
					encode: (value) => value,
				})
			);

			return res.status(200).json({ data: user });
		}

		return res.status(apiResponse.status).json(responseData);
	} catch (error) {
		console.error('Erreur du proxy:', error);
		return res.status(500).json({ error: 'Erreur interne du serveur proxy' });
	}
}