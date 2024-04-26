import Layout from "@/components/layout/layout";
import Image from "next/image";
import { CustomHead } from "@/components/customHead";
import Link from 'next/link'
import Picture from '../../public/assets/services/main.webp'
import Butterfly from '../../public/assets/main/butterfly.svg'
import { Newletter, Title} from "@/components/homepage/homepage";
import { GETRequest } from "@/utils/requestHeader";
import Vector from '../../public/assets/about/vector.svg'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getServerSideProps() {
  const result = await fetch(`${API_URL}/workshops`, GETRequest).then(r => r.json())
  return {
      props: {
          workshops:result
      }
  }
}

export default function Services({workshops}) {
  return (
    <>
      <CustomHead pageName='Services' metaResume="Retrouvez l'ensemble de nos services"/>
        <Layout>
          <main className="pt-[1.5vh]">
            <section className="h-home w-[98vw] ml-[1vw] gap-16 pt-5 bg-no-repeat bg-cover bg-center flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5">
                <div className="h-full w-full place-self-center relative flex rounded-3xl" style={{background:'linear-gradient(82.92deg, #DE5B30 0%, #FFF7F1 98%)'}}>
                    <Image src={Picture} alt='Picture categories' className="w-[50%] rounded-3xl object-cover md:hidden" priority/>
                    <div className="flex justify-center items-center w-full px-4 relative">
                        <Image src={Butterfly} alt='butterfly icon' className="absolute h-auto w-16 left-3/4 top-10" priority />
                        <div className="w-fit mx-4 relative">
                            <div className="flex flex-col gap-3 items-center text-center">
                                <h1 className="gradient-text2 leading-[70px] font-Quesha text-8xl lg:text-7xl lg:leading-[50px] md:text-6xl md:leading-[40px] mb-5">Nos évènements et ateliers</h1>
                                <p className="text-secondary font-medium text-lg sm:text-base">{`Curieux d'explorer le monde de l'ésotérisme ou de plonger dans des pratiques de bien-être ? Alors vous êtes au bon endroit ! Que vous débutiez ou que vous soyez déjà avancé dans votre quête spirituelle ou créative, nous avons diverses activités à vous proposer... `}<span className="font-semibold">Etes vous prêt pour ce merveilleux voyage en notre compagnie?</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 absolute bottom-3 right-3">
                      <Link href='/seances' className="text-sm font-black bg-background text-primary place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:text-xs md:font-extrabold">
                        SEANCES
                      </Link>
                      <Link href='/categories' className="text-sm font-black bg-background text-[#A37C99] place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:text-xs md:font-extrabold">
                        BOUTIQUE
                      </Link>
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center gap-14 mx-10 justify-center relative my-20 sm:my-10 sm:gap-8 sm:px-0 md:mx-5">
                <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[70%] top-[15%] w-full"></div>
                <div className="flex flex-col gap-5 mt-5 text-secondary text-lg font-medium sm:text-sm max-w-[1500px] sm:place-self-center sm:text-center">
                    <h3 className="text-5xl font-semibold lg:text-4xl sm:text-2xl text-primary mb-5">Qu’avons-nous à vous proposer?</h3>
                    <p>{`Chez Merveilles de Morph’ose nous vous proposons, des ateliers et évènements variés. Venez nous qui ont lieu dans notre cocon situé à Cournon d’Auvergne. Des praticiens et coachs certifiés viennent animer les ateliers et évènements que vous pouvez réserver juste en dessous.`}</p>
                    <p>{`De la méditation au yoga en passant par des sessions plus pointues sur la tarologie, l'astrologie ou la guérison énergétique vous trouverez certainement votre bonheur ! Nos ateliers et événements sont pensés pour booster votre apprentissage et votre croissance personnelle dans une ambiance bienveillante et professionnelle.`}</p>
                    <p className="font-bold">{`Venez vous découvrir seul ou partager un moment sympa entre amis en participant à un atelier...`}</p>
                </div>
                {workshops?.length === 0 || !workshops
                ? <p className='font-medium place-self-center text-secondary text-center sm:text-sm'>Aucun évènement de disponible pour le moment, revenez plus tard.</p>
                : <div className="gap-8 grid grid-cols-2 mt-10 md:mt-5 w-full max-w-[1000px] justify-self-center lg:flex lg:flex-col lg:items-center">
                    { workshops.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(workshop => <Individual key={workshop.id} workshop={workshop} description="Participez à nos ateliers et évènements  en vous inscrivant !" />)}
                </div>
                }
                <section className="flex mt-28 md:mt-10 items-center w-full gap-10 relative sm:gap-8">
                    <Image src={Vector} alt='Vector icon' className="max-w-[35%] md:hidden" priority/>
                    <div className="w-full flex justify-center"><Link href="/seances" className='flex place-self-center items-center gap-3 text-white justify-center bg-homeGradient3 py-4 w-full px-4 text-xl font-semibold rounded-2xl text-center lg:text-lg md:text-md md:w-fit cursor-pointer sm:place-self-center'>Découvrez nos séances personnalisées</Link></div>
                    <Image src={Vector} alt='Vector icon' className="max-w-[35%] rotate-180 md:hidden" priority/>
                </section>
            </section>
            <Newletter />
          </main>
        </Layout>
    </>
  )
}


export function Individual ({workshop}) {
    return(
        <div className="bg-transparent p-2 w-full flex flex-col relative rounded-3xl overflow-hidden max-w-[550px]">
            <div className="w-full h-0 pb-[60%] relative bg-white rounded-t-2xl">
                <Image src={workshop?.image?.url} alt='service picture' fill className="rounded-t-2xl object-cover" priority />
            </div>
            <div className="flex bg-white flex-col text-primary font-medium justify-start pt-5 px-5 gap-0.5 rounded-b-2xl">
                <h2 className="text-xl lg:text-lg sm:text-base font-bold">{workshop?.title}</h2>
                <p className="text-sm font-normal">{workshop?.entries_available - workshop?.entries_reserved} places restantes</p>
                <p className="mt-2">2 rue du foirail - 63800 Cournon-d’Auvergne</p>
                <p>{new Date(workshop?.date).toLocaleDateString('fr')} {new Date(workshop?.date).toLocaleTimeString('fr')}</p>
                <p>Durée : {workshop?.duration} minutes</p>
                {workshop?.description 
                    ? <p className="line-clamp-3 text-ellipsis font-normal my-3">{workshop?.description}</p>
                    : ''
                }
                <p className="font-semibold mt-3 w-fit border border-primary rounded-md px-3 py-1">{workshop?.price}€ / personne</p>
                <Link href={{pathname:'/servicesCheckout', query:{id:workshop.id}}} className="place-self-center"><button className="w-fit px-7 py-2 mb-3 mt-6 bg-mainGradient rounded-[50px] text-white font-medium text-base md:text-sm sm:mt-3">Réserver</button></Link>
            </div>
        </div>
    )
  }

