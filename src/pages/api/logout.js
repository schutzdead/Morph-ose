import { serialize } from 'cookie';

export default function handler(req, res) {
	res.setHeader(
		'Set-Cookie',
		serialize('auth-token', '', {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			expires: new Date(0),
		})
	);
	res.status(200).json({ message: 'Logged out' });
}