export function getServerSideProps({ req, res, locale }) {
	const Cookies = require('cookies')
	const cookies = new Cookies(req, res)
	cookies.set('auth-token')
	const uniqlocale = `/${locale}/connect/`
	return { 
        redirect: {
			destination: uniqlocale,
          	permanent: false,
        },
    }
}

export default function Logout() {
	return (
		<>
		</>
	)
}