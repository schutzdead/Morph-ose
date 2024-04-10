export function getServerSideProps({ req, res, locale }) {
	const Cookies = require('cookies')
	const cookies = new Cookies(req, res)
	cookies.set('auth-token')
	return { 
        redirect: {
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