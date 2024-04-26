import Layout from "@/components/layout/layout";
import Image from "next/image";
import { CustomHead } from "@/components/customHead";
import Link from 'next/link'
import Picture from '../../public/assets/services/main.webp'
import Butterfly from '../../public/assets/main/butterfly.svg'
import { CustomButton, Newletter} from "@/components/homepage/homepage";
import Vector from '../../public/assets/about/vector.svg'
import seances from '../../public/assets/seances.json'

export default function Seances() {
  return (
    <>
      <CustomHead pageName='Séance personnalisées' metaResume="Retrouvez l'ensemble de nos séances personnalisées"/>
        <Layout>
          <main className="pt-[1.5vh]">
            <section className="h-home w-[98vw] ml-[1vw] gap-16 pt-5 bg-no-repeat bg-cover bg-center flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5">
                <div className="h-full w-full place-self-center relative flex rounded-3xl" style={{background:'linear-gradient(82.92deg, #DE5B30 0%, #FFF7F1 98%)'}}>
                    <Image src={Picture} alt='Picture categories' className="w-[50%] rounded-3xl object-cover md:hidden" priority/>
                    <div className="flex justify-center items-center w-full px-4 relative">
                        <Image src={Butterfly} alt='butterfly icon' className="absolute h-auto w-16 left-3/4 top-10" priority />
                        <div className="w-fit mx-4 relative">
                            <div className="flex flex-col gap-3 items-center text-start">
                                <h1 className="gradient-text2 leading-[70px] font-Quesha text-8xl lg:text-7xl lg:leading-[50px] md:text-6xl md:leading-[40px] mb-5">Une séance personnalisée ?</h1>
                                <p className="text-secondary font-medium text-lg sm:text-base">{`Découvrez le chemin vers votre bien-être intérieur avec nos séances personnalisées de guidance, cartomancie, poème d'âme, chant d'âme et message d'âme, disponibles dès maintenant à la réservation`}</p>
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
                <div className="flex flex-col gap-5 mt-5 text-secondary text-lg font-medium sm:text-sm max-w-[1500px] sm:place-self-center sm:text-center">
                    <h3 className="text-5xl font-semibold lg:text-4xl sm:text-2xl text-primary mb-5">Un peu perdu en ce moment?</h3>
                    <p>Chez Merveilles de {`Morph'ose,`} nous vous invitons <span className="font-semibold">à explorer une expérience unique et personnalisée</span> conçue pour vous guider vers une meilleure compréhension de soi et un épanouissement spirituel.</p>
                    <p>Que vous choisissiez de travailler avec moi ou avec Audrey, notre experte en cartomancie, nous sommes là pour vous accompagner sur votre chemin de découverte intérieure.</p>
                </div>
                <div className="flex flex-col gap-5 mt-5 text-secondary text-lg font-medium sm:text-sm max-w-[1500px] sm:place-self-center sm:text-center">
                    <h3 className="text-5xl font-semibold lg:text-4xl sm:text-2xl text-primary mb-5">Nous proposons une variété de séances adaptées à vos besoins individuels :</h3>
                    <p>Chaque session est une opportunité de croissance, de guérison et de réflexion. </p>
                    <p className="font-semibold">Faites le premier pas vers un changement positif.</p>
                </div>
                {seances?.length === 0 || !seances
                ? <p className='font-medium place-self-center text-secondary text-center sm:text-sm'>Aucun évènement de disponible pour le moment, revenez plus tard.</p>
                : <div className="gap-8 grid grid-cols-2 mt-5 w-full max-w-[1200px] justify-items-center lg:flex lg:flex-col lg:items-center">
                    { seances?.seance?.map((seance, index) => <SeancesIndividual key={seance.id} seance={seance} index={index} />)}
                </div>
                }
                <p className="font-bold text-2xl lg:text-xl sm:text-base pt-10 text-center sm:pt-5 text-secondary">Réservez votre séance personnalisée dès {`aujourd'hui`} et commencez votre voyage vers la transformation personnelle.</p>
                <section className="flex mt-20 md:mt-10 items-center w-full gap-10 relative sm:gap-8">
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


export function SeancesIndividual ({seance, index}) {
    console.log(seance);
    return(
        <div className="p-5 w-[460px] rounded-3xl flex flex-col gap-5 items-center text-center sm:w-[97vw]" style={index%2 === 0 ? {backgroundColor:'#E25E3E', color:'white'} : {backgroundColor:"#582D3E", color:'white'}}>
            <h2 className="underline underline-offset-8 decoration-white font-semibold text-2xl lg:text-xl sm:text-base">{seance.description}</h2>
            <p className="text-lg sm:text-base">{seance.content}</p>
            <div className="flex flex-col font-bold text-xl lg:text-lg sm:text-base text-[]" style={index%2 === 0 ? {color:'#642365'} : {color:'#E25E3E'}}>
                <p>{seance.price1}</p>
                <p>{seance?.price2 ? seance?.price2 : ''}</p>
            </div>
            <CustomButton butterfly={true} text="Réserver ma séance" />
        </div>
    )
  }

