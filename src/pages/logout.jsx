import { NoIndexHead } from '@/utils/customHead'

export function getServerSideProps({ req, res }) {
	const Cookies = require('cookies')
	const cookies = new Cookies(req, res)
	cookies.set('auth-token')
	return { 
        redirect: {
			destination: '/',
          	permanent: false,
        },
    }
}

export default function Logout() {
	return (
		<>
	    <NoIndexHead />
		</>
	)
}