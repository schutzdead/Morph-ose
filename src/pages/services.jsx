import Layout from "@/components/layout/layout";
import Image from "next/image";
import { CustomHead } from "@/components/customHead";
import Link from 'next/link'
import Picture from '../../public/assets/services/bg.webp'
import { Newletter, Title} from "@/components/homepage/homepage";
import { GETRequest } from "@/utils/requestHeader";
import Vector from '../../public/assets/about/vector.svg'
import { Skeleton } from "@mui/material";

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
  const today = new Date();
  
  return (
    <>
      <CustomHead pageName='Services' metaResume="Retrouvez l'ensemble de nos services"/>
        <Layout>
          <main className="pt-[1.5vh] flex flex-col">

            <section className="h-home w-[98vw] items-start ml-[1vw] gap-16 pt-5 hxl:pb-5 bg-no-repeat bg-cover bg-bottom flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5 hxl:h-auto hlg:py-10" style={{backgroundImage:`url(${Picture.src})`}}>
              <div className=" w-[500px] ml-20 md:ml-0 sm:max-w-[500px] sm:w-[90%]">
                <div  className="backdrop-blur-sm rounded-3xl py-4 bg-[#582D3E80]">
                  <div className="flex flex-col gap-5 px-7 w-full items-center md:gap-5">
                  <h1 className="text-white leading-[50px] font-Quesha text-7xl md:text-5xl md:leading-[35px]">Nos ateliers et événements collectifs</h1>
                    <div className="h-[2px] bg-white place-self-start w-full"></div>
                    <p className="font-medium text-lg md:text-base sm:text-sm">Curieux d’explorer le monde du bien-être, de plonger dans des pratiques ésotériques et holistiques ou simplement parfaire vos connaissances ? Alors vous êtes au bon endroit !</p>
                    <p className="font-medium text-lg md:text-base sm:text-sm">Que vous débutiez ou que vous soyez déjà avancé dans votre quête spirituelle, créative ou vers votre mieux-être, nous avons diverses activités à vous proposer...</p>
                    <p className="font-bold text-lg md:text-base sm:text-sm"><b>Êtes-vous prêt pour ce merveilleux voyage en notre compagnie ?</b></p>
                  </div>
                </div>
                <div className="flex gap-3 w-full mt-3">
                  <Link href='/services' className="w-1/2 flex justify-center border-2 border-primary text-sm font-black bg-background text-primary place-self-end rounded-2xl py-3 md:font-extrabold">
                    SERVICES
                  </Link>
                  <Link href='/categories' className="w-1/2 flex justify-center text-sm border-2 border-secondary font-black bg-background text-secondary place-self-end rounded-2xl px-10 md:px-5 py-3 md:font-extrabold">
                    BOUTIQUE
                  </Link>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-14 items-center place-self-center justify-center relative my-20 sm:my-10 sm:gap-8 sm:px-0 mx-5 max-w-[1280px]">
                <div className="flex flex-col gap-5 mt-5 text-secondary text-xl lg:text-lg font-medium sm:text-sm">
                    <Title title='Qu’avons-nous à vous proposer?' />
                    <p>Chez Merveilles de Morph’ose, nous vous proposons des <b>ateliers, événements, conférences...</b> aux thématiques variées et <b>animés par du personnel certifié !</b> Que ce soit en ligne, dans notre cocon au 28 rue du commerce à Cournon-D’Auvergne (63) ou ailleurs <b>vous trouverez surement votre bonheur</b> !</p>
                    <p>Vous vous intéressez aux constellations familiales, aux pratiques énergétiques, à la communication 
                    bienveillante, au bien être au naturel ? Ou peut-être à la cartomancie, la médiumnité, l’écriture intuitive, aux activités créatives ? Et bien c’est ce que nous vous proposons et bien plus encore !</p>

                    <p>Nos ateliers et événements sont pensés <b>pour vous accompagner au mieux </b>dans vos apprentissages et dans votre croissance personnelle ! Ceci, en vous guidant dans votre évolution ou simplement en vous proposant de chaleureux moments de convivialité. Tout cela, toujours <b>dans les meilleures conditions</b> : une ambiance <b>bienveillante, respectueuse et professionnelle. </b></p>
                    <p>Venez découvrir ces merveilleux espaces et faire un pas de plus vers l’art de votre transformation…</p>
                </div>
                {workshops?.filter(workshop => new Date(workshop.date) >= today).length === 0 || !workshops
                ? <p className='font-medium place-self-center text-secondary text-center pt-10 sm:text-sm'>Aucun évènement de disponible pour le moment, revenez plus tard.</p>
                : <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6 mt-10 md:mt-5 w-full justify-items-center">
                    { workshops.filter(workshop => new Date(workshop.date) >= today).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((workshop, index) => <Individual key={index} workshop={workshop} description="Participez à nos ateliers et évènements  en vous inscrivant !" />)}
                </div>
                }
                <section className="flex mt-28 md:mt-10 items-center w-full gap-10 relative sm:gap-8">
                    <Image src={Vector} alt='Vector icon' className="max-w-[35%] md:hidden" priority/>
                    <div className="w-full flex justify-center"><Link href="/seances" className='flex place-self-center items-center gap-3 text-white justify-center bg-homeGradient3 py-4 w-full px-4 text-xl font-semibold rounded-2xl text-center lg:text-lg md:text-md md:w-fit cursor-pointer sm:place-self-center'>Découvrez nos séances individuelles</Link></div>
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
        <div className="w-full flex flex-col relative rounded-3xl overflow-hidden max-w-[450px] h-full shadow-lg">
            {workshop?.image 
            ? <div className="w-full h-0 pb-[60%] relative bg-white rounded-t-2xl">
                 <Image src={workshop?.image?.url} alt='service picture' fill className="rounded-t-2xl object-cover" priority />
              </div>
            : ""
            }
            <div className="flex bg-white flex-col text-primary font-medium justify-start pt-5 px-5 gap-0.5 rounded-b-2xl flex-1">
                <h2 className="text-xl lg:text-lg sm:text-base font-bold">{workshop?.title}</h2>
                <p className="text-sm font-normal">{workshop?.entries_available - workshop?.entries_reserved} places restantes</p>
                <p>{new Date(workshop?.date).toLocaleDateString('fr')} {new Date(workshop?.date).toLocaleTimeString('fr')}</p>
                {workshop?.speaker_name ? <p>Organisateur : {workshop?.speaker_name}</p> : ''}
                <p>Durée : {workshop?.duration} minutes</p>
                {/* {workshop?.description 
                    ? <p className="line-clamp-3 text-ellipsis flex-1 h-full font-normal my-3">{workshop?.description}</p>
                    : ''
                } */}
                <p className="font-semibold mt-3 w-fit border border-primary rounded-md px-3 py-1">{workshop?.price}€ TTC / personne</p>
                {workshop?.entries_available - workshop?.entries_reserved === 0 
                  ? <p className="my-5 place-self-center font-bold text-lg md:text-base">Cet évènement est complet.</p>
                  : <>
                      <Link href={{pathname:'/servicesCheckout', query:{id:workshop.id}}} className="place-self-center"><button className="w-fit px-7 py-2 mb-3 mt-6 bg-mainGradient rounded-[50px] text-white font-medium text-base md:text-sm sm:mt-3">Réserver</button></Link>
                    </>
                }
            </div>
        </div>
    )
  }

