import Layout from "@/components/layout/layout";
import Image from "next/image";
import { CustomHead } from "@/components/customHead";
import Link from 'next/link'
import Picture from '../../public/assets/contact/contact.webp'
import Butterfly from '../../public/assets/main/butterfly.svg'
import { ContactForm } from "@/components/forms/contactForm";

export default function Contact() {
  return (
    <>
      <CustomHead pageName='Contact' metaResume="Contactez nous pour plus d'informations."/>
        <Layout>
          <main className="pt-[1.5vh]">
            <section className="h-home w-[98vw] ml-[1vw] gap-16 pt-5 bg-no-repeat bg-cover bg-center flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5">
                <div className="h-full w-full place-self-center relative flex rounded-3xl" style={{background:'linear-gradient(82.92deg, #DE5B30 0%, #FFF7F1 98%)'}}>
                    <Image src={Picture} alt='Picture categories' className="w-[50%] rounded-3xl object-cover md:hidden" priority/>
                    <div className="flex justify-center items-center w-full px-4 relative">
                        <Image src={Butterfly} alt='butterfly icon' className="absolute h-auto w-16 left-1/2 top-40" priority />
                        <div className="w-fit mx-4 relative">
                            <div className="flex flex-col gap-3 items-center text-center">
                                <h1 className="gradient-text2  font-Quesha text-9xl lg:text-8xl md:text-7xl sm:text-6xl">CONTACT</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 absolute bottom-3 right-3">
                      <Link href='/services' className="text-sm font-black bg-background text-primary place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:text-xs md:font-extrabold">
                        SERVICES
                      </Link>
                      <Link href='/categories' className="text-sm font-black bg-background text-[#A37C99] place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:text-xs md:font-extrabold">
                        BOUTIQUE
                      </Link>
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center gap-14 mx-10 justify-center relative my-20 sm:my-10 sm:gap-8 sm:px-0 md:mx-5">
                <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[70%] top-[15%] w-full"></div>
                <div className="relative font-Quesha w-fit px-5 text-9xl xl:text-6xl md:text-4xl 2sm:text-center">
                  <h1 className="gradient-text2 text-center">Une question, un problème ?! Contactez-nous</h1>
                </div>
                <div className="text-3xl flex flex-col gap-5 font-bold lg:text-2xl sm:text-lg text-center text-primary">
                    <p className="max-w-[1000px]">On essaiera de faire au mieux pour trouver une solution à votre problème.</p>
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

