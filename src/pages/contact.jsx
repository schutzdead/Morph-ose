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
          <section className="h-home w-[98vw] ml-[1vw] items-end gap-16 pt-5 bg-no-repeat bg-cover bg-bottom flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5" style={{backgroundImage:`url(${Picture.src})`}}>
            <div className=" w-[500px] mr-20 md:mr-0 sm:max-w-[500px] sm:w-[90%]">
                  <div  className="backdrop-blur-sm rounded-3xl py-10 bg-[#582D3E80]">
                      <div className="flex flex-col gap-10 px-7 w-full items-center md:gap-5">
                      <h1 className="text-white leading-[100px] font-Quesha text-8xl md:text-5xl md:leading-[35px]">Contact</h1>
                          <div className="h-[2px] bg-white place-self-start w-full"></div>
                          <p className="font-medium text-lg md:text-base sm:text-sm">{`Merveille de Morph’ose c’est une équipe réunie autour de passions communes : le bien - être, le développement personnel, le partage et l’ouverture d’esprit.`}</p>
                          <p className="font-bold text-lg md:text-base sm:text-sm">Pour en savoir plus sur nous, ça se passe juste en dessous !</p>
                      </div>
                  </div>
                  <div className="flex gap-5 w-full mt-3">
                  <Link href='/services' className="w-1/2 flex justify-center border-2 border-primary text-sm font-black bg-background text-primary place-self-end rounded-2xl py-5 md:py-3 md:font-extrabold">
                      SERVICES
                  </Link>
                  <Link href='/categories' className="w-1/2 flex justify-center text-sm border-2 border-secondary font-black bg-background text-secondary place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:font-extrabold">
                      BOUTIQUE
                  </Link>
                  </div>
              </div>
            </section>
            <section className="flex flex-col items-center gap-14 mx-10 justify-center relative my-20 sm:my-10 sm:gap-8 sm:px-0 md:mx-5">
                <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[70%] top-[15%] w-full"></div>
                <div className="relative font-Quesha w-fit px-5 text-9xl xl:text-6xl md:text-4xl 2sm:text-center">
                  <h1 className="gradient-text2 text-center">Une interrogation ?</h1>
                </div>
                <div className="text-2xl flex flex-col pb-10 gap-5 font-medium lg:text-xl sm:text-lg text-center text-secondary">
                    <p className="max-w-[1000px]">La relation client est une thématique centrale de notre établissement. Vous avez pris connaissance <Link href="/cgv" target="_blank" className="font-bold cursor-pointer">des conditions générales de vente</Link> ainsi que de la <span onClick={() => {setModal(true); setPosition(Math.max(window.screenY, document.documentElement.scrollTop, document.body.scrollTop))}} className="font-bold cursor-pointer">FAQ</span> et votre interrogation reste sans réponse ? Nous vous répondrons dans le plus bref délai.</p>
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

