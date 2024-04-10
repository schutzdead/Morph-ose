import Layout from "@/components/layout/layout";
import { CustomHead } from "@/components/customHead";
import { ContactForm } from "@/components/contact/contactForm";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export async function getStaticProps({locale}) {
  return {
      props: {
          ...(await serverSideTranslations(locale, ['common'])),
      }
  }
}

export default function Contact() {
  const { t } = useTranslation()
  return (
    <>
      <CustomHead pageName='Contact' metaResume='Write us' />
      <Layout>
        <main className="flex-1 flex items-center mt-14 mb-24">
          <section className="flex flex-col w-2/5 max-w-[500px] lg:w-3/5 sm:w-4/5">
              <h1 className="text-lg text-center">{t('contact.title')}</h1>
              <p className="text-center pt-3 pb-10">{t('contact.description')}</p>
              <ContactForm />
          </section>
        </main>
      </Layout>
  </>
  )
}