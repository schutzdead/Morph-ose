import Layout from "@/components/layout/layout";
import Image from "next/image";
import { CustomHead } from "@/components/customHead";
import Link from 'next/link'
import Picture from '../../public/assets/services/main.webp'
import Butterfly from '../../public/assets/main/butterfly.svg'
import { Newletter, Title} from "@/components/homepage/homepage";
import { GETRequest } from "@/utils/requestHeader";

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
                        <Image src={Butterfly} alt='butterfly icon' className="absolute h-auto w-16 left-1/2 top-40" priority />
                        <div className="w-fit mx-4 relative">
                            <div className="flex flex-col gap-3 items-center text-center">
                                <h1 className="gradient-text2  font-Quesha text-7xl lg:text-6xl md:text-5xl sm:text-4xl">On Vous Accompagne</h1>
                                <p className="text-primary font-medium text-lg sm:text-base md:text-white">Vous accompagner tout au long de votre cheminement intérieur en vous proposant des services variés qui amorceront votre des changement dans votre vie !</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 absolute bottom-3 right-3">
                        <Link href='/categories' className="text-sm font-black bg-background text-[#A37C99] place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:text-xs md:font-extrabold">
                        BOUTIQUE
                        </Link>
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center gap-14 mx-10 justify-center relative my-20 sm:my-10 sm:gap-8 sm:px-0 md:mx-5">
                <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[70%] top-[15%] w-full"></div>
                <Title title='Nos évènements et ateliers' butterfly={true} />
                <div className="text-3xl flex flex-col gap-5 font-bold lg:text-2xl sm:text-lg text-center text-primary">
                    <p className="max-w-[1000px]">Une collection de produits ésotériques et de bien être variée qui vous aidera à vous métamorphoser. Osez découvrir de nouvelles facettes de votre personnalité.</p>
                </div>
                {workshops?.length === 0 || !workshops
                ? <p className='font-medium place-self-center text-secondary text-center sm:text-sm'>Aucun évènement de disponible pour le moment, revenez plus tard.</p>
                : <div className="gap-8 grid grid-cols-2 mt-10 md:mt-5 w-full max-w-[1000px] justify-self-center lg:flex lg:flex-col lg:items-center">
                    { workshops.map(workshop => <Individual key={workshop.id} workshop={workshop} description="Participez à nos ateliers et évènements  en vous inscrivant !" />)}
                </div>
                }
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

