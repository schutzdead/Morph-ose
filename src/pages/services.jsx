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
            <section className="h-home -mt-[112px] w-[98vw] ml-[1vw] gap-16 pt-5 bg-no-repeat bg-cover bg-center flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5">
                <div className="h-full w-full place-self-center relative flex rounded-3xl" style={{background:'linear-gradient(82.92deg, #DE5B30 0%, #FFF7F1 98%)'}}>
                    <Image src={Picture} alt='Picture categories' className="w-[50%] rounded-3xl object-cover md:hidden" priority/>
                    <div className="flex justify-center items-center w-full px-4 relative">
                        <Image src={Butterfly} alt='butterfly icon' className="absolute h-auto w-16 left-1/2 top-40" priority />
                        <div className="w-fit mx-4 relative">
                            <div className="flex flex-col gap-3 items-center text-center">
                                <h1 className="gradient-text2  font-Quesha text-7xl lg:text-6xl md:text-5xl sm:text-4xl">On vous accompagne</h1>
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
                <div className="gap-8 grid grid-cols-3 mt-10 md:mt-5 lg:grid-cols-2 sm:grid-cols-1 w-full place-items-center max-w-[1500px] place-self-center">
                    { workshops.map(workshop => <Individual key={workshop.id} workshop={workshop} description="Participez à nos ateliers et évènements  en vous inscrivant !" />)}
                </div>
            </section>
            <Newletter />
          </main>
        </Layout>
    </>
  )
}


export function Individual ({workshop}) {
    return(
        <div className="bg-white p-2 w-full flex flex-col relative rounded-3xl overflow-hidden max-w-[450px]">
            <div className="w-full h-0 pb-[60%] relative">
                <Image src={workshop?.image?.url} alt='service picture' fill className="rounded-2xl object-cover" priority />
            </div>
            <div className="flex flex-col text-primary mt-5 mx-5 gap-1">
                <h2 className="text-xl lg:text-lg sm:text-base font-bold">{workshop?.title}</h2>
                <p className="text-sm">{workshop?.entries_available - workshop?.entries_reserved} places restantes</p>
                <p>Date : {new Date(workshop?.date).toLocaleDateString('fr')} {new Date(workshop?.date).toLocaleTimeString('fr')}</p>
                <p>Durée : {workshop?.duration} minutes</p>
                <p className="font-semibold mt-3 w-fit border border-primary rounded-md px-3 py-1">{workshop?.price}€ / personne</p>
                <Link href={{pathname:'/servicesCheckout', query:{id:workshop.id}}} className="place-self-center"><button className="w-fit  px-7 py-2 mb-3 mt-6 bg-mainGradient rounded-[50px] text-white font-medium text-base md:text-sm sm:mb-0 sm:mt-3">Réserver</button></Link>
            </div>
        </div>
    )
  }

