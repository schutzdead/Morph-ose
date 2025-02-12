import Layout from "@/components/layout/layout";
import Image from "next/image";
import { CustomHead } from "@/components/customHead";
import Link from 'next/link'
import Picture from '../../public/assets/services/bg.webp'
import { Newletter} from "@/components/homepage/homepage";
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
          <main className="pt-[1.5vh]">
            <section className="h-home w-[98vw] items-end ml-[1vw] gap-16 pt-5 bg-no-repeat bg-cover bg-bottom flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5" style={{backgroundImage:`url(${Picture.src})`}}>
              <div className=" w-[500px] mr-20 md:mr-0 sm:max-w-[500px] sm:w-[90%]">
                <div  className="backdrop-blur-sm rounded-3xl pt-4 pb-5 bg-[#582D3E80]">
                  <div className="flex flex-col gap-7 px-7 w-full items-center md:gap-5">
                  <h1 className="text-white leading-[60px] font-Quesha text-7xl md:text-5xl md:leading-[35px]">Nos évènements et ateliers</h1>
                    <div className="h-[2px] bg-white place-self-start w-full"></div>
                    <p className="font-medium text-lg md:text-base sm:text-sm">{`Curieux d'explorer le monde de l'ésotérisme, de plonger dans des pratiques de bien-être ou simplement parfaire vos connaissances ? Alors vous êtes au bon endroit !`}</p>
                    <p className="font-medium text-lg md:text-base sm:text-sm">Que vous débutiez ou que vous soyez déjà avancé dans votre quête spirituelle, créative ou vers votre mieux-être, nous avons diverses activités à vous proposer...</p>
                    <p className="font-bold text-lg md:text-base sm:text-sm">Etes vous prêt pour ce merveilleux voyage en notre compagnie ?</p>
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
                <div className="flex flex-col gap-5 mt-5 text-secondary text-xl lg:text-lg font-medium sm:text-sm max-w-[1500px] place-self-center text-center">
                    <h3 className="text-primary mb-5 leading-[80px] font-Quesha text-8xl lg:text-7xl lg:leading-[50px] md:text-6xl md:leading-[40px]">Qu’avons-nous à vous proposer?</h3>
                    <p>Chez Merveilles de Morph’ose nous vous proposons des <b>ateliers, conférences, services, évènements…</b> aux thématiques variées, animés par du <b>personnel certifié</b> ! En ligne ou dans notre cocon situé à Cournon-d’Auvergne, vous trouverez certainement votre bonheur ! Vous vous intéressez à la méditation, aux soins énergétiques, au yoga, à la médiumnité ? Ou peut-être à la cartomancie, aux pendules, aux minéraux, aux activités créatives ?</p>
                    <p>Et bien c’est ce que nous vous proposons et bien plus encore !! Nos ateliers et événements sont pensés pour <b>vous accompagner au mieux</b> dans vos apprentissages et votre croissance personnelle ou simplement pour vous proposer des moments de convivialité. Tout cela dans une ambiance bienveillante, respectueuse et professionnelle. Venez découvrir ces merveilleux espaces et faire un pas de plus vers l’art de votre transformation…</p>
                </div>
                {workshops?.length === 0 || !workshops
                ? <p className='font-medium place-self-center text-secondary text-center pt-10 sm:text-sm'>Aucun évènement de disponible pour le moment, revenez plus tard.</p>
                : <div className="gap-8 grid grid-cols-2 mt-10 md:mt-5 w-full max-w-[1000px] justify-self-center lg:flex lg:flex-col lg:items-center">
                    { workshops.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((workshop, index) => <Individual key={index} workshop={workshop} description="Participez à nos ateliers et évènements  en vous inscrivant !" />)}
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
        <div className="bg-transparent p-2 w-full flex flex-col relative rounded-3xl overflow-hidden max-w-[550px]">
            {workshop?.image 
            ? <div className="w-full h-0 pb-[60%] relative bg-white rounded-t-2xl">
                 <Image src={workshop?.image?.url} alt='service picture' fill className="rounded-t-2xl object-cover" priority />
              </div>
            : <div className="w-full h-full">
                <Skeleton sx={{width:'100%', height:'100%', transform:'none', borderRadius:'16px 16px 0 0'}} />
              </div>
            }
            <div className="flex bg-white flex-col text-primary font-medium justify-start pt-5 px-5 gap-0.5 rounded-b-2xl min-h-[380px]">
                <h2 className="text-xl lg:text-lg sm:text-base font-bold">{workshop?.title}</h2>
                <p className="text-sm font-normal">{workshop?.entries_available - workshop?.entries_reserved} places restantes</p>
                <p>{new Date(workshop?.date).toLocaleDateString('fr')} {new Date(workshop?.date).toLocaleTimeString('fr')}</p>
                {workshop?.speaker_name ? <p>Organisateur : {workshop?.speaker_name}</p> : ''}
                <p>Durée : {workshop?.duration} minutes</p>
                {workshop?.description 
                    ? <p className="line-clamp-3 text-ellipsis flex-1 h-full font-normal my-3">{workshop?.description}</p>
                    : ''
                }
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

