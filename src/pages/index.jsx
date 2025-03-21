import Layout from "@/components/layout/layout";
import { CustomHead } from "@/components/customHead";
import Link from 'next/link'
import Fullscreen2 from '../../public/assets/main/fullscreen2.webp'
import Picto1 from '../../public/assets/main/picto.svg'
import Picto2 from '../../public/assets/main/picto2.svg'
import Picto3 from '../../public/assets/main/picto3.svg'
import { seance } from "../../public/assets/seances.jsx";

import { PrevButton, NextButton, usePrevNextButtons } from "@/utils/emblaButton";
import { DotButton, useDotButton } from "@/utils/emblaDot";

import useEmblaCarousel from 'embla-carousel-react'

import { Newletter, Title, Card, Picto, CustomButton, Service, SeancesComp } from "@/components/homepage/homepage";
import { GETRequest } from "@/utils/requestHeader";

import { motion } from "framer-motion";

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

const OPTIONS = { slidesToScroll: 'auto' }

export default function Home({workshops, first_products}) {

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const today = new Date();

  return (
    <>
      <CustomHead pageName='Accueil' metaResume="Découvrez l'ensemble de notre gamme" />
        <Layout>
          <main className="pt-[1.5vh] flex flex-col items-center">

            <section className="h-home w-[98vw] bg-no-repeat bg-cover bg-center flex flex-col relative rounded-3xl justify-center text-white md:items-center hxl:h-auto hxl:py-10" style={{backgroundImage:`url(${Fullscreen2.src})`}}>
              <div className=" w-[500px] ml-20 md:ml-0 sm:max-w-[500px] sm:w-[90%]">
                <div  className="backdrop-blur-sm rounded-3xl pt-4 pb-5 bg-[#582D3E80]">
                  <div className="flex flex-col gap-7 px-7 w-full items-center md:gap-5">
                    <div className="flex font-Quesha w-full text-6xl xl:text-5xl gap-2 md:text-4xl sm:text-3xl flex-wrap">
                      <h1>Bien-être</h1>
                      <span>-</span>
                      <h1>Développement Personnel</h1>
                      <span>-</span>
                      <h1>Spiritualité</h1>
                    </div>
                    <div className="h-[2px] bg-white place-self-start w-full"></div>
                    <p className="font-medium text-xl sm:text-lg">Bienvenue dans un univers où <b>VOTRE ENCHANTEMENT</b> et <b>VOTRE ÉPANOUISSEMENT</b> sont nos
                    priorités !</p>
                    <p className="font-medium text-xl sm:text-lg">Explorez notre boutique holistique et découvrez nos produits ainsi que nos services conçus pour éclairer votre parcours personnel et spirituel.</p>
                  </div>
                </div>
                <div className="flex gap-5 w-full mt-3">
                  <Link href='/services' className="w-1/2 flex justify-center border-2 border-primary text-sm font-black bg-background text-primary place-self-end rounded-2xl py-3 md:py-3 md:font-extrabold">
                    SERVICES
                  </Link>
                  <Link href='/categories' className="w-1/2 flex justify-center text-sm border-2 border-secondary font-black bg-background text-secondary place-self-end rounded-2xl py-3 px-10 md:px-5 md:py-3 md:font-extrabold">
                    BOUTIQUE
                  </Link>
                </div>
              </div>
            </section>

            <motion.section id="headlight" className="scroll-m-32 max-w-[1280px] flex flex-col gap-10 justify-center my-20 sm:my-10 sm:gap-8 sm:px-3 mx-5">
              <Title title='Nos collections phares !' />
              <motion.div initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 150, damping: 25 }} className="text-xl flex flex-col gap-5 font-bold lg:text-lg sm:text-base text-primary">
                <p>Envie de découvrir nos magnifiques produits ?</p>
                <p className="font-medium text-secondary">Vous souhaitez vous faire plaisir et/ou faire plaisir ? Que vous cherchiez des livres enrichissants, des produits digitaux, des pierres et minéraux, des cartes pour la cartomancie, de l’encens, des accessoires de méditation ou des bougies, ... Nos collections phares sont sélectionnées pour vous guider vers les incontournables des produits bien-être !</p>
              </motion.div>
              <div className="grid grid-cols-3 w-full grid-rows-1 max-h-[350px] h-[55vh] min-h-[430px] gap-10 mt-5 lg:grid-cols-2 sm:grid-cols-1">
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
            </motion.section>

            <section className="flex justify-evenly w-[95vw] mx-[2.5vw] relative sm:mx-5 py-10 sm:flex-col sm:items-center sm:gap-10">
              <Picto image={Picto2} text="Un site sécurisé garantissant un paiement sécurisé !" title="Paiement sécurisé !" />
              <Picto image={Picto1} text="Une livraison rapide grâce à des partenaires reconnus !" title="Livraison express" />
              <div className="sm:hidden">
                <Picto image={Picto3} text="Certainement un produit, pour chacune de vos envies..." title="Produits divers !" />
              </div>
            </section>

            <section id="service" className="scroll-m-32 flex flex-col gap-10 justify-center relative mt-20 sm:mt-10 sm:gap-8 sm:px-3 max-w-[1280px] mx-5">
              <div className="flex flex-col gap-10 sm:gap-8 px-10">
                <Title title='Nos derniers évènements' butterfly={true} />
                <p className="max-w-[1200px] text-xl font-medium lg:text-lg sm:text-base text-secondary">Chez Merveilles de Morph’ose, nous mettons l’accent sur <b>la confiance, le partage, le respect et la bienveillance</b>. C’est pour cela que nous mettons à votre disposition des <b>professionnels sérieux et certifiés</b> du bien-être, du développement personnel, du développement spirituel et bien plus encore. Nous souhaitons que chaque intervention ait un impact concret sur votre vie : ouverture d’esprit, (re)connexion à soi et apprentis-sages.</p>
                <motion.div initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 150, damping: 25 }} className="flex flex-col gap-5 mt-5 text-secondary text-lg font-medium sm:text-sm max-w-[1500px] ">
                  <p className="text-xl font-bold lg:text-lg sm:text-base text-primary">De merveilleux ateliers et événements collectifs</p>
                  <p className="">Envie de participer à des <b>ateliers, conférences et évènements captivants</b>. Et bien, vous êtes au bon endroit ! Venez partager de <b>chaleureux moments</b> autour de thématiques variées : la créativité, la spiritualité, le développement personnel, les pratiques ésotériques et holistiques...
                  Réservez vos places en quelques clics !</p>
                  <p >Constellations familiales, méditation, numérologie, communication bienveillante ou encore initiations de toutes sortes, partage de méthodes, ateliers créatifs…<b> nos sessions sont conçues pour enrichir votre esprit et nourrir votre ÊTRE</b>.
                  Les places sont limitées pour garantir une <b>expérience personnelle et immersive</b>. Alors n’attendez plus !</p>
                </motion.div>
              </div>
              {workshops?.length > 0 
                ? <div className="relative w-full flex flex-col items-center max-w-[100vw]">
                    <div className="overflow-hidden w-[90%] md:w-[85%]" ref={emblaRef}> 
                      <div className="flex" style={{ gap: `24px` }}>
                        { workshops
                            ?.filter(workshop => workshop?.date && new Date(workshop.date) >= today)
                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                            .slice(0,5)
                            .map((workshop, index) => <Service key={index} workshop={workshop} description="Participez à nos ateliers et évènements  en vous inscrivant !" />)
                        }
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-[1.2rem] mt-[1.8rem] w-[90%] md:w-[85%]">
                      <div className="flex gap-[0.6rem] items-center h-8 w-fit md:h-6 ">
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
                <p className="text-2xl font-semibold lg:text-2xl sm:text-lg text-primary">Prêt à explorer ? Réservez dès maintenant et préparez-vous à vivre un moment unique !</p>
                <Link href="/services" className="place-self-center mt-5">
                  <CustomButton text="Découvrir les ateliers et évènements" butterfly={true} />
                </Link>
              </div>
            </section>

            <AllSeances workshops={workshops} />

            <Newletter />
          </main>
        </Layout>
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
    <section className="flex flex-col gap-14 justify-center relative mt-20 sm:my-10 sm:gap-8 sm:px-3 max-w-[1280px] mx-5">
    <div className="flex flex-col gap-5 mt-5 text-secondary text-lg font-medium sm:text-sm max-w-[1500px]">
      <Title title='Nos splendides séances individuelles' />
      <motion.div initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 150, damping: 25, duration:10 }} className="flex flex-col gap-5">
        <p className="pt-5 sm:pt-2">Besoin <b>d’éclaircir ou de débloquer une situation</b>, besoin de clés pour <b>faire vos propres choix</b> ou juste par curiosité, nos experts vous accompagnent au travers de nos séances individuelles : <b>dans nos locaux à Cournon-D’Auvergne (63), en Visio ou par retour mail</b>. N’attendez plus pour réserver en ligne et découvrir nos prestations : cartomancie, guidance (ou coaching intuitif et créatif), message d’âme, poème d’âme, ... </p>
        <p className="pt-3 sm:pt-2"><b>« Chaque jour j’évolue : je grandis, j’apprends, je m’épanouis. Ainsi va la vie. »</b> Mina de Merveilles de Morph’ose. Vous accompagnez dans chacune de ces étapes de vie est un privilège. </p>
        <p className="text-base sm:text-sm">Petit mot : merci de bien vouloir faire preuve de discernement, quoiqu’il puisse vous être conseillé, vous êtes et resterez le/la seul(e) décisionnaire de votre vie.</p>
      </motion.div>
    </div>
    {workshops?.length > 0 
      ? <div className=" max-w-[1200px] m-auto w-full md:max-w-[95vw]">
        {/* VIEWPORT */}
        <div className="overflow-hidden" ref={emblaRef}> 
        {/* CONTAINER */}
          <div className="flex touch-pan-y -ml-10">
            { seance?.map((s, index) => <SeancesComp key={index} seance={s} index={index} />)}
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

