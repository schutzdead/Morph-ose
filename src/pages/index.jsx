import Layout from "@/components/layout/layout";
import Image from "next/image";
import Link from "next/link";
import { GETRequest } from "@/utils/requestHeader";
import { Loading } from "@/components/loader";
import { CustomHead } from "@/components/customHead";
import { useCallback, useEffect, useState } from "react";

import Fullscreen from '../../public/assets/main/fullscreen.gif'
import Fullscreen2 from '../../public/assets/main/fullscreen2.webp'
import Services from '../../public/assets/main/services.webp'
import Service2 from '../../public/assets/main/service2.webp'
import RightArrow from '../../public/assets/main/right.svg'
import WRightArrow from '../../public/assets/main/white_right.svg'
import Women from '../../public/assets/main/women.svg'
import Logo from '../../public/assets/header/logo1.svg'
import PictoTest from '../../public/assets/main/picto.svg'
import Butterfly from '../../public/assets/main/butterfly.svg'
import Butterfly2 from '../../public/assets/main/butterfly2.svg'
import Plant1 from '../../public/assets/main/plant1.svg'
import transi from '../../public/assets/main/trans1.svg'
import { unlock } from "@/utils/lockScreen";

import { PrevButton, NextButton, usePrevNextButtons } from "@/utils/emblaButton";
import { DotButton, useDotButton } from "@/utils/emblaDot";

import useEmblaCarousel from 'embla-carousel-react'

function load(key) {
  const once = window.sessionStorage.getItem(key);
  return once != null ? JSON.parse(once) : true;
}

const OPTIONS = { slidesToScroll: 'auto' }

export default function Home() {
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
      <CustomHead pageName='Home' metaResume='Homepage'/>
      {
      landing 
        ? 
        <main className="h-[100vh] w-[100vw] flex items-center justify-center">
          <div className="h-[93%] w-[95%] gap-16 pt-5 bg-no-repeat bg-cover pb-20 bg-center text-center flex flex-col rounded-3xl items-center justify-center text-white relative lg:gap-10 sm:gap-6" style={{backgroundImage:`url(${Fullscreen.src})`}}>
            <h2 className="text-xl px-3">La société Morph’ose Evolution vous propose de découvrir</h2>
            <Image src={Logo} className='h-[50%] w-auto lg:max-h-[250px] sm:h-auto sm:w-[80%]' alt='Logo' priority />
            <div className="flex items-center gap-10 font-Quesha text-8xl xl:text-6xl lg:gap-5 lg:text-5xl sm:text-3xl sm:flex-col sm:gap-0">
              <h1>Bien-être</h1>
              <Image src={transi} alt='animation icon' className="sm:h-auto sm:w-6" priority />
              <h1>Spiritualité</h1>
              <Image src={transi} alt='animation icon' className="sm:h-auto sm:w-6" priority />
              <h1>Esotérisme</h1>
            </div>
            <button className="text-sm font-black bg-background text-primary place-self-end absolute bottom-3 right-3 rounded-2xl py-5 px-10 sm:px-5 sm:py-3 sm:text-xs sm:font-extrabold" onClick={() => {window.sessionStorage.setItem('start', JSON.stringify(false)); setLanding(false); unlock()}}>
              VISITER LE SITE
            </button>
          </div>
        </main>
        :
        <Layout>
          <main className="pt-[1.5vh]">
            <section className="h-home -mt-[112px] w-[98vw] ml-[1vw] gap-16 pt-5 bg-no-repeat bg-cover pb-20 bg-center flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5" style={{backgroundImage:`url(${Fullscreen2.src})`}}>
              <div className="w-[30%] animate-infiniteMove flex justify-end absolute top-1/2 -translate-y-1/2 right-0 md:w-auto md:h-[35%] md:static md:translate-y-0 md:animate-none">
                <Image src={Women} alt='women icon' className="max-w-[380px] w-full h-auto md:w-auto md:h-full" priority />
              </div>
              <div className="w-[70%] gap-10 flex flex-col ml-[5vw] md:w-[90%] md:text-center md:items-center md:gap-5 md:ml-0">
                <div className="flex gap-10 font-Quesha text-7xl whitespace-nowrap gradient-text xl:text-6xl lg:gap-5 lg:text-5xl md:text-4xl sm:text-[26px]">
                  <h1>Bien-être</h1>
                  <h1>Spiritualité</h1>
                  <h1>Esotérisme</h1>
                </div>
                <p className="gradient-text2 text-3xl font-bold lg:text-2xl sm:text-lg">Découvrez notre boutique ésotérique : Minéraux, Encens spirituel, Bougies, Librairie...</p>
              </div>
              <div className="flex gap-3 absolute bottom-3 right-3">
                <button className="text-sm font-black bg-background text-primary place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:text-xs md:font-extrabold" onClick={() => {window.sessionStorage.setItem('start', JSON.stringify(false)); setLanding(false); unlock()}}>
                  SERVICE
                </button>
                <button className="text-sm font-black bg-background text-[#A37C99] place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:text-xs md:font-extrabold" onClick={() => {window.sessionStorage.setItem('start', JSON.stringify(false)); setLanding(false); unlock()}}>
                  BOUTIQUE
                </button>
              </div>
            </section>
            <section className="flex flex-col items-center gap-14 mx-10 justify-center my-20 sm:my-10 sm:gap-8 sm:px-3 md:mx-5">
              <Title title='Nos Collections Phares !' />
              <div className="text-3xl flex flex-col gap-5 font-bold lg:text-2xl sm:text-lg text-center text-secondary">
                <p className="font-medium">Une collection de produits ésotériques et de bien être variée qui vous aidera à vous métamorphoser.</p>
                <p>Osez découvrir de nouvelles facettes de votre personnalité.</p>
              </div>
              <div className="grid grid-cols-3 grid-rows-1 max-h-[700px] h-[55vh] min-h-[430px] gap-10 mt-5 lg:grid-cols-2 sm:grid-cols-1">
                <div className="sm:hidden">
                  <Card  image={Services} title="Bougie" description="Une gamme de bougies parfumée qui vous fera voyager" />
                </div>
                <div className="flex flex-col h-full gap-10">
                  <Card image={Services} title="Bougie" description="Une gamme de bougies parfumée qui vous fera voyager" />
                  <Card image={Services} title="Bougie" description="Une gamme de bougies parfumée qui vous fera voyager" />
                </div>
                <div className="lg:hidden">
                  <Card  image={Services} title="Bougie" description="Une gamme de bougies parfumée qui vous fera voyager" />
                </div>
              </div>
            </section>
            <section className="flex justify-evenly w-[95vw] mx-[2.5vw] relative sm:mx-5 py-20 sm:flex-col sm:items-center sm:py-10 sm:gap-10">
              <div className="absolute -z-10 bg-pictoGradient blur-[175px] h-[70%] top-[15%] w-full"></div>
              <Picto image={PictoTest} text="Une livraison rapide grâce à des partenaires reconnus !" title="Livraison express" />
              <Picto image={PictoTest} text="Une livraison rapide grâce à des partenaires reconnus !" title="Livraison express" />
              <div className="sm:hidden">
                <Picto image={PictoTest} text="Une livraison rapide grâce à des partenaires reconnus !" title="Livraison express" />
              </div>
            </section>
            <section className="flex flex-col items-center gap-14 mx-10 justify-center relative my-20 sm:my-10 sm:gap-8 sm:px-3 md:mx-5">
              <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[70%] top-[15%] w-full"></div>
              <Title title='Nos services !' butterfly={true} />
              <div className="text-3xl flex flex-col gap-5 font-bold lg:text-2xl sm:text-lg text-center text-primary">
                <p className="max-w-[1000px]">Chez Morph’ose Evolution on ne vous laisse pas tout seul dans l’aventure de la découverte de soit !</p>
              </div>
              <div className=" max-w-[1200px] m-auto w-full">
                {/* VIEWPORT */}
                <div className="overflow-hidden" ref={emblaRef}> 
                {/* CONTAINER */}
                  <div className="flex touch-pan-y -ml-5">
                    <Service title="Nos ateliers et evenements" image={Service2} description="Participez à nos ateliers et évènements  en vous inscrivant !" />
                    <Service title="Nos ateliers et evenements" image={Service2} description="Participez à nos ateliers et évènements  en vous inscrivant !" />
                    <Service title="Nos ateliers et evenements" image={Service2} description="Participez à nos ateliers et évènements  en vous inscrivant !" />
                    <Service title="Nos ateliers et evenements" image={Service2} description="Participez à nos ateliers et évènements  en vous inscrivant !" />
                    <Service title="Nos ateliers et evenements" image={Service2} description="Participez à nos ateliers et évènements  en vous inscrivant !" />
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr] justify-between items-center gap-[1.2rem] mt-[1.8rem]">
                  <div className="grid grid-cols-2 gap-[0.6rem] items-center h-8 md:h-6">
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
              <div className="flex flex-col gap-5 text-center mt-10">
                <p className="text-5xl font-bold lg:text-3xl sm:text-xl  text-primary">Réservez nos services en ligne dès maintenant ! </p>
                <p className="text-xl lg:text-lg sm:text-base text-secondary max-w-[1400px]">Nous avons développer pour vous accompagner dans votre métamorphose, plusieurs services : des ateliers, des évènements ou encore des séances personnalisées en ligne ou dans nos locaux</p>
                <div className="place-self-center mt-10">
                  <CustomButton text="Réserver" butterfly={true} />
                </div>
              </div>
            </section>
            <section className="flex flex-col items-center gap-20 mx-10 justify-center my-20 sm:my-10 sm:gap-8 sm:px-3 md:gap-10 md:mx-5">
              <Title title='Pour Les Pros' />
              <div className="flex items-center justify-center md:flex-col md:gap-10">
                <div className="flex flex-col max-w-[800px] w-full py-10 shadow-2xl px-10 rounded-l-2xl md:rounded-2xl md:py-5 sm:px-5">
                  <h2 className="text-primary font-Quesha text-6xl xl:text-5xl lg:text-4xl md:text-3xl">Vous êtes un professionnel dans le milieu de l’ésotérisme?</h2>
                  <div className="bg-primary h-[3px] w-[80%] my-10 place-self-end lg:my-5 md:place-self-start"></div>
                  <p className="text-secondary text-xl lg:text-lg sm:text-base max-w-[80%] place-self-end text-end lg:max-w-full md:place-self-start md:text-start">Venez proposer votre vos service ou réserver notre local pour proposer un atelier !</p>
                </div>
                <div className="w-[25vw] max-w-[600px] min-w-[300px] shadow-2xl overflow-hidden rounded-2xl">
                  <div className="h-[25vw] max-h-[600px] min-h-[300px]">
                    <Image src={Services} alt='categories picture' className="h-full object-cover" priority />
                  </div>
                  <div className="w-full p-4 bg-homeGradient3">
                      <button className="bg-homeGradient2 text-white font-semibold rounded-lg py-4 w-full text-xl lg:text-lg sm:text-base">{`Je m'inscris !`}</button>
                  </div>
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

function Newletter () {
  return(
    <section className="flex flex-col gap-10 mx-10 mb-20 mt-32 sm:mb-10 sm:mt-20 md:mx-5">
      <div className="flex gap-20 bg-homeGradient3 rounded-3xl justify-center px-10 lg:gap-10 sm:gap-8 sm:px-3 ">
        <Image src={Plant1} alt='plant icon' className="self-end w-auto sm:hidden" priority />
        <div className="flex-col flex gap-10 text-white py-20 md:gap-5 sm:py-10 sm:items-center sm:text-center">
          <h1 className="font-Quesha w-fit text-9xl xl:text-6xl md:text-5xl">Gardez la pêche !</h1>
          <p className="font-bold text-2xl lg:text-xl md:text-base">Recevez régulièrement, gratuitement, votre billet de bonne humeur ! </p>
          <div className="bg-white rounded-xl w-fit p-1.5 gap-5 h-14 flex items-center">
            <input type="text" name="" id="" className="appearance-none h-full w-full px-5 text-black" placeholder="Entrez votre adresse email" />
            <button className="text-lg whitespace-nowrap font-semibold lg:text-base sm:text-sm px-4 h-full bg-primary text-white rounded-lg">{`Je m'inscris !`}</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-Quesha w-fit text-8xl xl:text-6xl md:text-4xl text-secondary 2sm:text-3xl">Ou Suivez Nous Sur Instagram...</h1>
        <div className="max-w-screen flex ml-20 gap-2 h-[200px] min-h-[200px] overflow-hidden lg:h-[150px] lg:min-h-[150px] sm:h-[100px] sm:min-h-[100px] lg:ml-0">
          <div className="flex-[0_0_25%] max-w-[200px] h-full lg:max-w-[150px] sm:max-w-[100px]">
            <Image src={Services} alt='plant icon' className="object-cover h-full" priority />
          </div>
          <div className="flex-[0_0_25%] max-w-[200px] h-full lg:max-w-[150px] sm:max-w-[100px]">
            <Image src={Services} alt='plant icon' className="object-cover h-full" priority />
          </div>
          <div className="flex-[0_0_25%] max-w-[200px] h-full lg:max-w-[150px] sm:max-w-[100px]">
            <Image src={Services} alt='plant icon' className="object-cover h-full" priority />
          </div>
          <div className="flex-[0_0_25%] max-w-[200px] h-full lg:max-w-[150px] sm:max-w-[100px]">
            <Image src={Services} alt='plant icon' className="object-cover h-full" priority />
          </div>
        </div>
      </div>
      </section>
  )
}

function Title ({butterfly=false, title}) {
  return(
    <div className="relative font-Quesha w-fit text-9xl xl:text-6xl md:text-4xl ">
      <div className="relative">
        <Image src={Butterfly} alt='butterfly icon' className="absolute h-auto w-16 -left-[53px] -top-[20px] xl:w-12 xl:-left-[41px] xl:-top-[23px] md:w-8 md:-left-[25px] md:-top-[16px]" style={butterfly ? {display:'block'} : {display:'none'}} priority />
        <h1 className="gradient-text2">{title}</h1>
      </div>
      <div className="h-[3px] w-full bg-mainGradient"></div>
    </div>
  )
}

function Card ({image, title, description}) {
  return(
    <div className="flex flex-col group rounded-3xl h-full relative overflow-hidden cursor-pointer">
      <div className="rounded-3xl absolute bg-homeGradient1 w-full h-[35%] min-h-[170px] flex flex-col gap-3 items-center justify-center text-white opacity-0 -top-[100%] pb-5 group-hover:top-[0%] group-hover:opacity-100 transition-all ease-out duration-1000 sm:h-[100%] sm:min-h-0 sm:opacity-100 sm:top-0">
        <h2 className="text-3xl font-bold lg:text-2xl sm:text-lg text-center">{title.toUpperCase()}</h2>
        <p className="font-bold text-center px-2 sm:text-sm">{description}</p>
        <button className="bg-white px-3 py-1 rounded-3xl text-xs font-bold flex gap-1 items-center absolute right-5 bottom-3">
          <p className="gradient-text2">Voir plus</p>
          <Image src={RightArrow} alt='arrow icon' className="mt-[2px]" priority />
        </button>
      </div>
      <Image src={image} alt='categories picture' className="h-full object-cover" priority />
    </div>
  )
}

function Picto ({image, text, title}) {
  return(
    <div className="flex flex-col items-center max-w-[300px] text-center lg:max-w-[250px]">
      <Image src={image} alt='pictogram description' className="mt-[2px] w-16 h-auto xl:w-12" priority />
      <h2 className="font-Quesha text-[#E25E3E] text-6xl xl:text-5xl lg:text-4xl text-center">{title}</h2>
      <p className="text-secondary font-medium lg:text-sm mt-2">{text}</p>
    </div>
  )
}

function Service ({image, title, description}) {
  return(
    <div className="min-w-0 flex-[0_0_33.33%] pl-5 h-fit lg:flex-[0_0_50%] md:flex-[0_0_100%]">
      <div className="bg-white h-full p-2 flex flex-col relative rounded-3xl overflow-hidden">
        <Image src={image} alt='service picture' className="w-full h-[60%] rounded-2xl object-cover" priority />
        <h2 className="text-3xl xl:text-2xl lg:text-xl sm:text-lg font-bold text-secondary mt-4">{title}</h2>
        <p className="text-[#A37C99] sm:text-sm">{description}</p>
        <div className="bg-secondary my-3 place-self-end rounded-full w-10 h-10 min-w-10 min-h-10 flex items-center justify-center mx-3">
          <Image src={WRightArrow} alt='arrow icon' className="" priority />
        </div>
      </div>
    </div>
  )
}

function CustomButton ({butterfly=false,text}) {
  return(
    <button className="h-12 w-fit px-10 bg-mainGradient rounded-[50px] text-white font-medium text-lg relative md:text-sm">
      <Image src={Butterfly2} alt='butterfly icon' className="absolute h-auto w-12 -right-[25px] -top-[23px]" style={butterfly ? {display:'block'} : {display:'none'}} priority />
      {text}
    </button>
  )
}