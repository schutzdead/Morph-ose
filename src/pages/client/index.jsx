import Layout from "@/components/layout/layout";
import { SignInForm } from "@/components/auth/signInForm";
import { SignUpForm } from "@/components/auth/signUpForm";
import { CustomHead } from "@/components/customHead";

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
  if(response.status === 200 && !person.is_admin) {
    return { 
      redirect: {
        destination: '/client/orders',
        permanent: false,
      },
  }}

  return {
    props: {}
  }
}

export default function ClientAuth() {
  return (
    <>
      <CustomHead pageName='Connexion' metaResume="Page d'inscription et de connexion" />
      <Layout>
        <main className="flex-1 flex flex-col items-center mt-14 mb-24">
          <section className="flex flex-col w-2/5 max-w-[500px] lg:w-3/5 sm:w-4/5">
              <h1 className="text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center pb-10 font-Quesha gradient-text">Connexion</h1>
              <SignInForm />
          </section>
          <div className="mt-20 mb-10 bg-black h-[1px] w-1/2 max-w-[1000px] lg:w-[70%] sm:w-[90%]"></div>
          <section className="flex flex-col w-2/5 max-w-[600px] lg:w-3/5 sm:w-4/5">
              <h1 className="text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center pb-10 font-Quesha gradient-text">Inscription</h1>
              <SignUpForm />
          </section>
        </main>
      </Layout>
  </>
  )
}
