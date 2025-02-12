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
import seances from '../../public/assets/seances.json'
import Picto3 from '../../public/assets/main/picto3.svg'
import transi from '../../public/assets/main/trans1.svg'
import { unlock } from "@/utils/lockScreen";

import { PrevButton, NextButton, usePrevNextButtons } from "@/utils/emblaButton";
import { DotButton, useDotButton } from "@/utils/emblaDot";

import useEmblaCarousel from 'embla-carousel-react'

import { Newletter, Title, Card, Picto, CustomButton, Service, ProSentence, SeancesComp } from "@/components/homepage/homepage";
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

// function load(key) {
//   const once = window.sessionStorage.getItem(key);
//   return once != null ? JSON.parse(once) : true;
// }

const OPTIONS = { slidesToScroll: 'auto' }

export default function Home({workshops, first_products}) {
  // const [landing, setLanding] = useState(true);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  // useEffect(() => {
  //   setLanding(() => load('start'))
  // },[])

  return (
    <>
      <CustomHead pageName='Accueil' metaResume="Découvrez l'ensemble de notre gamme" />
      {/* {
      landing 
        ? 
        <main className="h-[100vh] w-[100vw] flex items-center justify-center hsm:h-auto hsm:my-10">
          <div className="h-[97%] w-[98%] gap-16 pt-5 bg-no-repeat bg-cover pb-20 bg-center text-center flex flex-col rounded-3xl items-center justify-center text-white relative lg:gap-10 sm:gap-6 sm:py-5 hsm:py-10 sm:justify-start" style={{backgroundImage:`url(${Fullscreen2.src})`}}>
              <h2 className="text-2xl font-semibold px-3 md:text-lg">La société Morph’ose Evolution vous propose de découvrir</h2>
              <Image src={Logo} className='h-[50%] flex-1 w-auto lg:max-h-[250px] sm:h-auto sm:w-[80%] sm:mt-10' alt='Logo' priority />
              <div className="flex items-center gap-10 font-Quesha text-8xl xl:text-6xl lg:gap-5 lg:text-5xl sm:text-[27px] sm:gap-2 sm:-mt-6">
                <h1 className="text-white">Bien-être</h1>
                <Image src={transi} alt='animation icon' className="sm:h-auto sm:w-4" priority />
                <h1 className="text-white">Spiritualité</h1>
                <Image src={transi} alt='animation icon' className="sm:h-auto sm:w-4" priority />
                <h1 className="text-white">Esotérisme</h1>
              </div>
              <button className="text-sm font-black bg-background text-primary place-self-end absolute bottom-3 right-3 rounded-2xl py-5 px-10 sm:px-5 sm:py-3 sm:text-xs sm:font-extrabold sm:place-self-center sm:static" onClick={() => {unlock(); window.sessionStorage.setItem('start', JSON.stringify(false)); setLanding(false)}}>
                VISITER LE SITE
              </button>
            </div>
        </main>
        : */}
        <Layout>
          <main className="pt-[1.5vh]">
            <section className="h-home w-[98vw] ml-[1vw] bg-no-repeat bg-cover bg-center flex flex-col relative rounded-3xl justify-center text-white md:items-center" style={{backgroundImage:`url(${Fullscreen2.src})`}}>
              <div className=" w-[500px] ml-20 md:ml-0 sm:max-w-[500px] sm:w-[90%]">
                <div  className="backdrop-blur-sm rounded-3xl pt-4 pb-5 bg-[#582D3E80]">
                  <div className="flex flex-col gap-7 px-7 w-full items-center md:gap-5">
                    <div className="flex font-Quesha w-full text-6xl xl:text-5xl gap-2 md:text-4xl sm:text-3xl flex-wrap">
                      <h1>Holistique</h1>
                      <span>-</span>
                      <h1>Apprentissage</h1>
                      <span>-</span>
                      <h1>Développement Personnel</h1>
                    </div>
                    <div className="h-[2px] bg-white place-self-start w-full"></div>
                    <p className="font-medium text-xl sm:text-lg">Bienvenue dans un univers où votre enchantement est notre priorité !</p>
                    <p className="font-medium text-xl sm:text-lg">Explorez notre boutique ésotérique et découvrez nos services conçus pour éclairer votre parcours personnel et spirituel.</p>
                  </div>
                </div>
                <div className="flex gap-5 w-full mt-5">
                  <Link href='/services' className="w-1/2 flex justify-center border-2 border-primary text-sm font-black bg-background text-primary place-self-end rounded-2xl py-5 md:py-3 md:font-extrabold">
                    SERVICES
                  </Link>
                  <Link href='/categories' className="w-1/2 flex justify-center text-sm border-2 border-secondary font-black bg-background text-secondary place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:font-extrabold">
                    BOUTIQUE
                  </Link>
                </div>
              </div>
            </section>

            <section id="headlight" className="scroll-m-32 flex flex-col items-center gap-14 mx-10 justify-center my-20 sm:my-10 sm:gap-8 sm:px-3 md:mx-5">
              <Title title='Nos collections phares' />
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
              <Picto image={Picto2} text="Un site sécurisé garantissant un paiement sécurisé !" title="Paiement sécurisé !" />
              <Picto image={Picto1} text="Une livraison rapide grâce à des partenaires reconnus !" title="Livraison express" />
              <div className="sm:hidden">
                <Picto image={Picto3} text="Certainement un produit, pour chacune de vos envies..." title="Produits divers !" />
              </div>
            </section>

            <section id="service" className="scroll-m-32 flex flex-col items-center gap-14 mx-10 justify-center relative my-20 sm:my-10 sm:gap-8 sm:px-3 md:mx-5">
              <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[70%] top-[15%] w-full"></div>
              <Title title='Nos services' butterfly={true} />
              <p className="max-w-[1200px] text-2xl flex flex-col gap-5 font-medium lg:text-xl sm:text-base text-center text-secondary">Chez merveilles de Morph’ose nous mettons l’accent sur la découverte de soi et l’ouverture d’esprit en mettant à votre disposition des professionnels du bien-être, du développement personnel et bien plus encore !</p>
              <div className="flex flex-col gap-5 mt-5 place-self-center text-center text-secondary text-lg font-medium sm:text-sm max-w-[1500px] ">
                <h3 className="text-4xl font-semibold lg:text-3xl sm:text-xl text-primary">Osez explorer nos ateliers et évènements</h3>
                <p className="pt-5 sm:pt-2">{`Si vous êtes curieux de découvrir les secrets de l'ésotérisme, participer à des ateliers créatifs ou encore  vous plonger dans le bien-être.`} <span className="font-semibold">Vous êtes au bon endroit !</span> Notre plateforme vous permet de réserver facilement votre place pour participer à des ateliers et événements captivants.</p>
                <p >{`De la méditation à l'astrologie, nos sessions sont conçues pour enrichir votre esprit et nourrir votre “Etre”. Nos experts vous guideront dans chaque étape de votre parcours. Les places sont limitées pour garantir une expérience personnelle et immersive.`}</p>
              </div>
              {workshops?.length > 0 
                ? <div className=" max-w-[1200px] m-auto w-full">
                  {/* VIEWPORT */}
                  <div className="overflow-hidden" ref={emblaRef}> 
                  {/* CONTAINER */}
                    <div className="flex touch-pan-y -ml-5">
                      { workshops.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0,5).map((workshop, index) => <Service key={index} workshop={workshop} description="Participez à nos ateliers et évènements  en vous inscrivant !" />)}
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
              <div className="flex flex-col gap-5 text-center mt-5">
                <p className="text-2xl font-semibold lg:text-2xl sm:text-lg text-primary">Prêt à explorer ? Réservez maintenant et vivez une expérience unique !</p>
                <Link href="/services" className="place-self-center mt-5">
                  <CustomButton text="Réserver" butterfly={true} />
                </Link>
              </div>
            </section>

            <AllSeances workshops={workshops} />

            <section id="pro" className="scroll-m-32 flex flex-col items-center gap-14 mx-10 justify-center my-20 sm:gap-8 sm:px-3 md:gap-10 md:mx-5">
              <Title title='Pour les professionnels' />
              <div className="max-w-[1200px] text-2xl flex flex-col gap-5 mb-5 font-medium lg:text-xl sm:text-base text-center text-secondary">
                <p className="">{`Vous êtes un professionnel du bien-être, de l'ésotérisme, écrivain ou simplement créatif ? Chez Merveilles de Morph’ose, nous vous faisons profiter de nos locaux situés à Cournon d’Auvergne  pour que vous puissiez organiser vos ateliers, évènements holistiques, séances et conférences. En bref vous l’aurez compris, notre espace devient le votre...`}</p>
                <p className="font-bold">Touchez une communauté engagée et passionnée !</p>
              </div>
              <div className="flex items-center justify-center md:flex-col md:gap-10">
                <div className="flex flex-col w-[70%] py-10 shadow-2xl rounded-l-2xl lg:w-1/2 md:rounded-2xl lg:py-5 md:w-full">
                  <h2 className="text-primary font-Quesha text-6xl xl:text-5xl lg:text-4xl md:text-3xl px-10 sm:px-5">Et si nous avancions ensemble?</h2>
                  <div className="bg-primary h-[3px] w-[95%] my-10 place-self-end lg:my-5 md:w-full md:place-self-start"></div>
                  <div className="text-secondary px-10 flex flex-col gap-3 sm:px-5">
                    <p className="text-xl lg:text-lg sm:text-base lg:max-w-full pb-2 font-semibold">Œuvrer ensemble c’est vous permettre de...</p>
                    <ProSentence text="Gagner en visibilité." />
                    <ProSentence text="Partager votre expertise." />
                    <ProSentence text="Réduire vos coûts en louant notre espace tout équipé quand vous en avez besoin." />
                    <ProSentence text="Fixer vos tarifs et le nombre de participants que vous souhaitez accompagner. " />
                    <ProSentence text="Faciliter la réservation et le paiement des participants directement sur ce site web." />
                  </div>
                </div>
                <div className="w-[40%] max-w-[350px] h-full shadow-2xl overflow-hidden rounded-2xl lg:w-1/2 md:w-full">
                  <div className="w-full h-[450px] md:h-auto">
                    <Image src={Pro} alt='categories picture' className="h-full w-full object-cover" priority />
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
      {/* } */}
    </>
  )
}

function AllSeances ({workshops}) {

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return(
    <section className="flex flex-col items-center gap-14 mx-10 justify-center relative my-20 sm:my-10 sm:gap-8 sm:px-3 md:mx-5">
    <div className="flex flex-col gap-5 mt-5 place-self-center text-center text-secondary text-lg font-medium sm:text-sm max-w-[1500px]">
      <h3 className="text-4xl font-semibold lg:text-3xl sm:text-xl text-primary">Séances individuelles</h3>
      <p className="pt-5 sm:pt-2">{`Nos experts vous accompagnent au travers de séances individuelles que nous pouvons dispenser à distance ou dans nos locaux. Il suffit de réserver en ligne... Alors n’attendez plus pour prendre votre place et découvrir les prestations proposées par Merveilles de Morph’ose : cartomancie, poème d'âme, chant d'âme, guidance, messages d'âme...`} <span className="font-semibold">Respect et bienveillance</span>, notre mantra !</p>
      <p className="text-sm sm:text-xs">Petit mot : merci de bien vouloir faire preuve de discernement quoiqu’il puisse vous être conseillé, vous êtes seul(e) décisionnaire de votre vie.</p>
    </div>
    {workshops?.length > 0 
      ? <div className=" max-w-[1200px] m-auto w-full">
        {/* VIEWPORT */}
        <div className="overflow-hidden" ref={emblaRef}> 
        {/* CONTAINER */}
          <div className="flex touch-pan-y -ml-10">
            { seances.seance.map((s, index) => <SeancesComp key={index} seance={s} index={index} />)}
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
    <Link href="/seances" className="place-self-center mt-5 mb-10 sm:mb-5">
      <CustomButton text="Découvrir les séances" butterfly={true} />
    </Link>
  </section>
  )
}

