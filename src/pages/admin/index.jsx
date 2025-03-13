import { SignInAuth } from '@/components/auth/signIn'
import { NoIndexHead } from '@/utils/customHead'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getServerSideProps({req, res}) {
  const Cookies = require('cookies')
  const cookies = new Cookies(req, res)
  const authToken = cookies.get('auth-token') || ''

  const response = await fetch(`${API_URL}/auth/users/current`, {
    method:'GET',
    mode: "cors",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }
  })
  const person = await response.json()
  
  if(response.status === 200 && person.is_admin) {
    return { 
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
  }}

  return {
    props: {}
  }
}

export default function AdminAuth() {
    return(
      <>
      <NoIndexHead />
      <main className='h-[100vh] w-[100vw] flex flex-col items-center justify-center bg-background lg:h-auto lg:min-h-[100vh] lg:py-10'>
        <h1 className='text-4xl font-bold mb-8 text-secondary sm:text-center'>SE CONNECTER</h1>
        <section className='w-[450px] flex flex-col sm:w-[90%]'>
            <SignInAuth path="guest/authentication/admin" pushPath="/admin/products" pass={false} />
        </section>
    </main>
    </>
    )
}