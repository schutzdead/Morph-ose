import Layout from "@/components/layout/layout";
import { CustomHead } from "@/components/customHead";
import { ContactForm } from "@/components/contact/contactForm";

export default function Contact() {
  return (
    <>
      <CustomHead pageName='Contact' metaResume='Write us' />
      <Layout>
        <main className="flex-1 flex items-center mt-14 mb-24">
          <section className="flex flex-col w-2/5 max-w-[500px] lg:w-3/5 sm:w-4/5">
              <h1 className="text-lg text-center">Contact</h1>
              <p className="text-center pt-3 pb-10">Description</p>
              <ContactForm />
          </section>
        </main>
      </Layout>
  </>
  )
}