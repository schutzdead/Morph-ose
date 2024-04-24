import Layout from "@/components/layout/layout";
import Image from "next/image";
import { CustomHead } from "@/components/customHead";
import { useEffect, useState } from "react";
import Link from 'next/link'
import Fullscreen from '../../public/assets/main/fullscreen1.webp'
import Fullscreen2 from '../../public/assets/main/fullscreen2.webp'
import Pro from '../../public/assets/main/pro.webp'
import Logo from '../../public/assets/header/logo1.svg'
import Picto1 from '../../public/assets/main/picto.svg'
import Picto2 from '../../public/assets/main/picto2.svg'
import Picto3 from '../../public/assets/main/picto3.svg'
import transi from '../../public/assets/main/trans1.svg'
import { unlock } from "@/utils/lockScreen";

import { PrevButton, NextButton, usePrevNextButtons } from "@/utils/emblaButton";
import { DotButton, useDotButton } from "@/utils/emblaDot";

import useEmblaCarousel from 'embla-carousel-react'

import { Newletter, Title, Card, Picto, CustomButton, Service } from "@/components/homepage/homepage";
import { GETRequest } from "@/utils/requestHeader";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getServerSideProps() {
  const result = await fetch(`${API_URL}/workshops`, GETRequest).then(r => r.json())
  const first = await fetch(`${API_URL}/catalog/homepage`, GETRequest).then(r => r.json())

  return {
      props: {
          workshops:result,
          first_products:first,
      }
  }
}

function load(key) {
  const once = window.sessionStorage.getItem(key);
  return once != null ? JSON.parse(once) : true;
}

const OPTIONS = { slidesToScroll: 'auto' }

export default function Home({workshops, first_products}) {
  const [landing, setLanding] = useState(true);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  useEffect(() => {
    setLanding(() => load('start'))
  },[])

  return (
    <>
      <CustomHead pageName='Accueil' metaResume="Découvrez l'ensemble de notre gamme" />
      {
      landing 
        ? 
        <main className="h-[100vh] w-[100vw] flex items-center justify-center hsm:h-auto hsm:my-10">
          <div className="h-[97%] w-[98%] gap-16 pt-5 bg-no-repeat bg-cover pb-20 bg-center text-center flex flex-col rounded-3xl items-center justify-center text-white relative lg:gap-10 sm:gap-6 sm:py-0 hsm:py-10" style={{backgroundImage:`url(${Fullscreen.src})`}}>
            <button className="text-sm font-black hidden bg-background text-primary place-self-center mb-5 rounded-2xl py-5 px-10 sm:px-5 sm:py-3 sm:text-xs sm:font-extrabold sm:block sm:mb-0" onClick={() => {window.sessionStorage.setItem('start', JSON.stringify(false)); setLanding(false); unlock()}}>
              VISITER LE SITE
            </button>
            <h2 className="text-2xl font-bold px-3 md:text-xl">La société Morph’ose Evolution vous propose de découvrir</h2>
            <Image src={Logo} className='h-[50%] w-auto lg:max-h-[250px] sm:h-auto sm:w-[80%]' alt='Logo' priority />
            <div className="flex items-center gap-10 font-Quesha text-8xl xl:text-6xl lg:gap-5 lg:text-5xl sm:text-3xl sm:flex-col sm:gap-0">
              <h1>Bien-être</h1>
              <Image src={transi} alt='animation icon' className="sm:h-auto sm:w-6" priority />
              <h1>Spiritualité</h1>
              <Image src={transi} alt='animation icon' className="sm:h-auto sm:w-6" priority />
              <h1>Esotérisme</h1>
            </div>
            <button className="text-sm font-black bg-background text-primary place-self-end absolute bottom-3 right-3 rounded-2xl py-5 px-10 sm:px-5 sm:py-3 sm:text-xs sm:font-extrabold sm:hidden" onClick={() => {unlock(); window.sessionStorage.setItem('start', JSON.stringify(false)); setLanding(false)}}>
              VISITER LE SITE
            </button>
          </div>
        </main>
        :
        <Layout>
          <main className="pt-[1.5vh]">
            <section className="h-home w-[98vw] ml-[1vw] gap-16 pt-5 bg-no-repeat bg-cover pb-20 bg-center flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5" style={{backgroundImage:`url(${Fullscreen2.src})`}}>
              <div className="gap-10 flex flex-col px-20 w-full text-center items-center md:gap-5 md:ml-0 lg:px-10 sm:px-5">
                <div className="flex gap-10 font-Quesha text-7xl whitespace-nowrap xl:text-6xl lg:gap-5 lg:text-5xl md:text-4xl sm:text-[26px]">
                  <h1>Bien-être</h1>
                  <h1>Spiritualité</h1>
                  <h1>Esotérisme</h1>
                </div>
                <p className="text-3xl font-semibold lg:text-2xl sm:text-lg max-w-[1000px]">Bienvenue dans un univers où votre bien-être est notre priorité !</p>
                <p className="text-3xl font-semibold lg:text-2xl sm:text-lg max-w-[1000px]">Explorez notre boutique ésotérique et découvrez nos services conçus pour éclairer votre parcours personnel et spirituel.</p>
              </div>
              <div className="flex gap-3 absolute bottom-3 right-3">
                <Link href='/services' className="text-sm font-black bg-background text-primary place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:text-xs md:font-extrabold">
                  SERVICES
                </Link>
                <Link href='/categories' className="text-sm font-black bg-background text-[#A37C99] place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:text-xs md:font-extrabold">
                  BOUTIQUE
                </Link>
              </div>
            </section>

            <section id="headlight" className="scroll-m-32 flex flex-col items-center gap-14 mx-10 justify-center my-20 sm:my-10 sm:gap-8 sm:px-3 md:mx-5">
              <Title title='Nos collections phares !' />
              <div className="text-2xl flex flex-col gap-5 font-bold lg:text-xl sm:text-lg text-center text-primary">
                <p>Osez découvrir de nouvelles facettes de votre personnalité.</p>
                <p className="font-medium text-secondary">Que vous cherchiez des minéraux, des tarots divinatoires, des livres enrichissants ou encore découvrir l’univers Wicca, nos collections phares sont sélectionnées pour vous guider sur votre chemin de développement personnel et spirituel.</p>
              </div>
              <div className="grid grid-cols-3 w-full grid-rows-1 max-h-[700px] h-[55vh] min-h-[430px] gap-10 mt-5 lg:grid-cols-2 sm:grid-cols-1">
                <div className="sm:hidden">
                  <Card  product={first_products[0]} />
                </div>
                <div className="flex flex-col h-full gap-10">
                  <Card product={first_products[1]} />
                  <Card product={first_products[2]} />
                </div>
                <div className="lg:hidden">
                  <Card  product={first_products[3]} />
                </div>
              </div>
            </section>

            <section className="flex justify-evenly w-[95vw] mx-[2.5vw] relative sm:mx-5 py-20 sm:flex-col sm:items-center sm:py-10 sm:gap-10">
              <div className="absolute -z-10 bg-pictoGradient blur-[175px] h-[70%] top-[15%] w-full"></div>
              <Picto image={Picto2} text="Un site sécurisé pour vous garantir un paiement sécurisé !" title="Paiement sécurisé !" />
              <Picto image={Picto1} text="Une livraison rapide grâce à des partenaires reconnus !" title="Livraison express" />
              <div className="sm:hidden">
                <Picto image={Picto3} text="Certainement un produit, pour chacune de vos envies..." title="Produits divers !" />
              </div>
            </section>

            <section id="service" className="scroll-m-32 flex flex-col items-center gap-14 mx-10 justify-center relative my-20 sm:my-10 sm:gap-8 sm:px-3 md:mx-5">
              <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[70%] top-[15%] w-full"></div>
              <Title title='Nos services !' butterfly={true} />
              <div className="text-3xl flex flex-col gap-5 font-bold lg:text-2xl sm:text-lg text-center text-primary">
                <p className="max-w-[1000px]">Chez Morph’ose Evolution on ne vous laisse pas tout seul dans l’aventure de la découverte de soit !</p>
              </div>
              {workshops?.length > 0 
                ? <div className=" max-w-[1200px] m-auto w-full">
                  {/* VIEWPORT */}
                  <div className="overflow-hidden" ref={emblaRef}> 
                  {/* CONTAINER */}
                    <div className="flex touch-pan-y -ml-5">
                      { workshops.slice(0,7).map(workshop => <Service key={workshop.id} workshop={workshop} description="Participez à nos ateliers et évènements  en vous inscrivant !" />)}
                    </div>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] justify-between items-center gap-[1.2rem] mt-[1.8rem]">
                    <div className="grid grid-cols-2 gap-[0.6rem] items-center h-8 w-fit md:h-6 ">
                      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                    </div>
                    <div className="embla__dots">
                      {scrollSnaps.map((_, index) => (
                        <DotButton key={index} onClick={() => onDotButtonClick(index)} className={'embla__dot'
                          .concat(
                            index === selectedIndex ? ' embla__dot--selected' : ''
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                : <p className="font-semibold text-xl lg:text-lg sm:text-base text-secondary">Aucun évènement disponible dans les prochains jours.</p>
              }
              <div className="flex flex-col gap-5 text-center mt-10">
                <p className="text-5xl font-bold lg:text-3xl sm:text-xl  text-primary">Réservez nos services en ligne dès maintenant ! </p>
                <p className="text-xl lg:text-lg sm:text-base text-secondary max-w-[1400px]">Nous avons développer pour vous accompagner dans votre métamorphose, plusieurs services : des ateliers, des évènements ou encore des séances personnalisées en ligne ou dans nos locaux</p>
                <Link href="/services" className="place-self-center mt-10">
                  <CustomButton text="Réserver" butterfly={true} />
                </Link>
              </div>
            </section>

            <section id="pro" className="scroll-m-32 flex flex-col items-center gap-20 mx-10 justify-center my-20 sm:my-10 sm:gap-8 sm:px-3 md:gap-10 md:mx-5">
              <Title title='Pour les pros' />
              <div className="flex items-center justify-center md:flex-col md:gap-10">
                <div className="flex flex-col max-w-[800px] w-full py-10 shadow-2xl px-10 rounded-l-2xl md:rounded-2xl md:py-5 sm:px-5">
                  <h2 className="text-primary font-Quesha text-6xl xl:text-5xl lg:text-4xl md:text-3xl">Vous êtes un professionnel dans le milieu de l’ésotérisme?</h2>
                  <div className="bg-primary h-[3px] w-[80%] my-10 place-self-end lg:my-5 md:place-self-start"></div>
                  <p className="text-secondary text-xl lg:text-lg sm:text-base max-w-[80%] place-self-end text-end lg:max-w-full md:place-self-start md:text-start">Venez proposer votre vos service ou réserver notre local pour proposer un atelier !</p>
                </div>
                <div className="w-[25vw] max-w-[600px] min-w-[300px] shadow-2xl overflow-hidden rounded-2xl">
                  <div className="h-[25vw] max-h-[600px] min-h-[300px]">
                    <Image src={Pro} alt='categories picture' className="h-full object-cover" priority />
                  </div>
                  <Link href='/rent'>
                    <div className="w-full p-4 bg-homeGradient3">
                        <button className="bg-homeGradient2 text-white font-semibold rounded-lg py-4 w-full text-xl lg:text-lg sm:text-base">{`Je m'inscris !`}</button>
                    </div>
                  </Link>
                </div>
              </div>
            </section>
            <Newletter />
          </main>
        </Layout>
      }
    </>
  )
}

