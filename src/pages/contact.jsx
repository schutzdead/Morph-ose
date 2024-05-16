import Layout from "@/components/layout/layout";
import { CustomHead } from "@/components/customHead";
import Link from 'next/link'
import Picture from '../../public/assets/contact/bg.webp'
import { ContactForm } from "@/components/forms/contactForm";
import { ModalFAQ } from "./categories/[categories]/[articles]";
import { useEffect, useState } from "react";

export default function Contact() {
  const [modal, setModal] = useState(false)
  const [position, setPosition] = useState()
  const [body, setBody] = useState()

  useEffect(() => {
      setBody(document?.querySelector('body'))
  },[])

  return (
    <>
      <CustomHead pageName='Contact' metaResume="Contactez nous pour plus d'informations."/>
      <ModalFAQ modal={modal} setModal={setModal} position={position} body={body} />
        <Layout>
          <main className="pt-[1.5vh]">
          <section className="h-home w-[98vw] ml-[1vw] gap-16 pt-5 bg-no-repeat bg-cover bg-bottom flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5" style={{backgroundImage:`url(${Picture.src})`}}>
                <div className="flex flex-col text-center justify-center items-center w-full px-4 gap-10 md:gap-0">
                    <h1 className="text-white leading-[100px] bg-black/50 rounded-2xl py-5 px-8 font-Quesha text-9xl lg:text-7xl lg:leading-[50px] md:text-6xl md:leading-[40px] mb-5">Contact</h1>
                </div>
                <div className="flex gap-3 absolute bottom-3 right-3">
                    <Link href='/services' className="text-sm font-black bg-background text-primary place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:text-xs md:font-extrabold">
                        SERVICES
                    </Link>
                    <Link href='/categories' className="text-sm font-black bg-background text-secondary place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:text-xs md:font-extrabold">
                        BOUTIQUE
                    </Link>
                </div>
            </section>
            <section className="flex flex-col items-center gap-14 mx-10 justify-center relative my-20 sm:my-10 sm:gap-8 sm:px-0 md:mx-5">
                <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[70%] top-[15%] w-full"></div>
                <div className="relative font-Quesha w-fit px-5 text-9xl xl:text-6xl md:text-4xl 2sm:text-center">
                  <h1 className="gradient-text2 text-center">Une interrogation ?</h1>
                </div>
                <div className="text-2xl flex flex-col pb-10 gap-5 font-medium lg:text-xl sm:text-lg text-center text-secondary">
                    <p className="max-w-[1000px]">La relation client est une thématique centrale de notre établissement. Vous avez pris connaissance <Link href="/cgv" target="_blank" className="font-bold cursor-pointer">des conditions générales de vente</Link> ainsi que de la <span onClick={() => {setModal(true); setPosition(Math.max(window.screenY, document.documentElement.scrollTop, document.body.scrollTop)); body.style.overflow = 'hidden'}} className="font-bold cursor-pointer">FAQ</span> et votre interrogation reste sans réponse ?</p>
                    <p>Nous vous répondrons dans le plus bref délai.</p>
                </div>
                <div className="max-w-[800px] w-full flex flex-col justify-center">
                  <ContactForm />
                </div>
            </section>
          </main>
        </Layout>
    </>
  )
}

