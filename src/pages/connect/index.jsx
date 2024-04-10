import Layout from "@/components/layout/layout";
import { SignInForm } from "@/components/connect/signInForm";
import { SignUpForm } from "@/components/connect/signUpForm";
import { CustomHead } from "@/components/customHead";

export default function Connect() {
  return (
    <>
      <CustomHead pageName='Connect' metaResume='Sign in or sign up' />
      <Layout>
        <main className="flex-1 flex items-center mt-14 mb-24">
          <section className="flex flex-col w-2/5 max-w-[500px] lg:w-3/5 sm:w-4/5">
              <h1 className="text-lg text-center pb-10">CONNEXION</h1>
              <SignInForm />
          </section>
          <div className="mt-20 mb-10 bg-black h-[1px] w-1/2 max-w-[1000px] lg:w-[70%] sm:w-[90%]"></div>
          <section className="flex flex-col w-2/5 max-w-[600px] lg:w-3/5 sm:w-4/5">
              <h1 className="text-lg text-center pb-10">INSCRIPTION</h1>
              <SignUpForm />
          </section>
        </main>
      </Layout>
  </>
  )
}
