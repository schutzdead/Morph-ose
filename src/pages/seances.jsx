import Layout from "@/components/layout/layout";
import Image from "next/image";
import { CustomHead } from "@/components/customHead";
import Link from 'next/link'
import Picture from '../../public/assets/services/bg-perso.webp'
import Picture2 from '../../public/assets/services/cardbg.webp'
import { Newletter} from "@/components/homepage/homepage";
import Vector from '../../public/assets/about/vector.svg'
import seances from '../../public/assets/seances.json'
import Butterfly2 from '../../public/assets/main/butterfly2.svg'

export default function Seances() {
  return (
    <>
      <CustomHead pageName='Séances individuelles' metaResume="Retrouvez l'ensemble de nos séances individuelles"/>
        <Layout>
          <main className="pt-[1.5vh]">
            <section className="h-home w-[98vw] ml-[1vw] gap-16 pt-5 bg-no-repeat bg-cover bg-bottom flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5" style={{backgroundImage:`url(${Picture.src})`}}>
                <div className="flex flex-col text-center justify-center items-center w-full px-4 gap-10 md:gap-0">
                    <h1 className="text-white leading-[100px] font-Quesha text-9xl lg:text-7xl lg:leading-[50px] md:text-6xl md:leading-[40px] mb-5">Une séance individuelle ?</h1>
                    <div className="flex flex-col gap-5 items-center text-center bg-black/50 rounded-3xl px-10 py-5 md:px-5 max-w-[800px]">
                        <p className="text-white font-medium text-xl lg:text-lg sm:text-base md:text-white">{`Nous vous invitons à explorer une expérience unique et personnalisée conçue pour vous guider vers une meilleure compréhension de vous-même et votre épanouissement.`}</p>
                        <p className="text-white font-semibold text-xl lg:text-lg sm:text-base md:text-white">Etes-vous prêt à entamer la quête vers la nouvelle version de vous-même ?</p>
                    </div>
                </div>
                <div className="flex gap-3 absolute bottom-3 right-3">
                    <Link href='/services' className="text-sm font-black bg-background text-primary place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:text-xs md:font-extrabold">
                        SERVICES
                    </Link>
                    <Link href='/categories' className="text-sm font-black bg-background text-secondary place-self-end rounded-2xl py-5 px-10 md:px-5 md:py-3 md:text-xs md:font-extrabold">
                        BOUTIQUE
                    </Link>
                </div>
            </section>
            <section className="flex flex-col items-center gap-14 mx-10 justify-center relative my-20 sm:my-10 sm:gap-8 sm:px-0 md:mx-5">
                <div className="absolute -z-10 bg-pictoGradient blur-[450px] h-[70%] top-[15%] w-full"></div>
                <div className="flex flex-col gap-5 mt-5 text-secondary text-xl lg:text-lg font-medium sm:text-sm max-w-[1500px] place-self-center text-center">
                  <h3 className="text-primary mb-5 leading-[80px] font-Quesha text-8xl lg:text-7xl lg:leading-[50px] md:text-6xl md:leading-[40px]">Qu’avons-nous à vous proposer?</h3>
                    <p className="font-bold">Chez Merveilles de Morph’ose nous vous accompagnons dans l’aventure de la découverte de vous-même.</p>
                    <p>Une interrogation ou simplement l’envie de mettre de la magie dans votre vie ? <br />Allons ensemble mettre en évidence la lumière qui est en vous grâce à nos séances en ligne ou dans nos locaux…</p>
                    <p className="text-base font-normal">Petit mot : merci de bien vouloir faire preuve de discernement quoiqu’il puisse vous être conseillé, vous êtes seul(e) décisionnaire de votre vie.</p>
                </div>
                <div className="flex flex-col gap-5 mt-5 text-secondary text-xl lg:text-lg font-medium sm:text-sm max-w-[1500px] place-self-center text-center">
                    <h3 className="text-primary mb-5 leading-[80px] font-Quesha text-8xl lg:text-7xl lg:leading-[50px] md:text-6xl md:leading-[40px]">Nous proposons une variété de séances adaptées à vos besoins </h3>
                    <p>Chaque session est une opportunité de croissance, d’évolution et de réflexion.</p>
                    <p className="font-semibold">Faites le premier pas vers un changement positif.</p>
                </div>
                {seances?.length === 0 || !seances
                ? <p className='font-medium place-self-center text-secondary text-center sm:text-sm'>Aucun évènement de disponible pour le moment, revenez plus tard.</p>
                : <div className="gap-8 grid grid-cols-2 mt-5 w-full max-w-[1050px] justify-items-center lg:flex lg:flex-col lg:items-center">
                    { seances?.seance?.map((seance, index) => <SeancesIndividual key={seance.id} seance={seance} index={index} />)}
                    <div className="w-[480px] rounded-3xl flex flex-col text-white gap-5 items-center justify-center bg-no-repeat bg-center text-center sm:w-[97vw] lg:hidden" style={{backgroundImage:`url(${Picture2.src})`}}>
                      <h1 className="font-Quesha text-6xl bg-primary/30 flex items-center justify-center h-full w-full rounded-3xl leading-[40px] md:text-6xl">Bienveillance et respect sont nos mantras</h1>
                    </div>
                </div>
                }
                <p className="font-bold text-2xl lg:text-xl sm:text-base pt-10 text-center sm:pt-5 text-secondary">Réservez votre séance individuelle dès {`aujourd'hui`} et commencez votre voyage vers la transformation personnelle.</p>
                <section className="flex mt-20 md:mt-10 items-center w-full gap-10 relative lg:gap-3">
                    <Image src={Vector} alt='Vector icon' className="max-w-[35%] md:hidden" priority/>
                    <div className="w-full flex justify-center"><Link href="/services" className='flex place-self-center items-center gap-3 text-white justify-center bg-homeGradient3 py-4 w-full px-4 text-2xl font-bold rounded-2xl text-center lg:text-lg md:text-md md:w-fit cursor-pointer sm:place-self-center'>Découvrez nos ateliers et évènements</Link></div>
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
    return(
        <div className="px-5 py-7 w-[480px] rounded-3xl flex flex-col gap-5 items-center text-center sm:w-[95vw]" style={index%2 === 0 ? {backgroundColor:'#E25E3E', color:'white'} : {backgroundColor:"#582D3E", color:'white'}}>
            <h1 className="font-Quesha text-6xl leading-[40px] md:text-6xl">{seance.title.toUpperCase()}</h1>
            <h2 className="font-semibold text-2xl lg:text-xl sm:text-base">{seance.description}</h2>
            <p className="text-lg sm:text-base">{seance.content}</p>
            <div className="flex flex-col w-[80%] gap-10 mt-5">
              <button className="py-2 w-full bg-mainGradient rounded-[50px] text-white font-medium text-lg relative md:text-sm">
                <Image src={Butterfly2} alt='butterfly icon' className="absolute h-auto w-12 -right-[25px] -top-[23px]" priority />
                  <p>{seance?.text1}</p>
                  <p className="text-sm">{seance?.price1}</p>
              </button>
              {seance?.price2
                ? <button className="py-2 w-full bg-mainGradient rounded-[50px] text-white font-medium text-lg relative md:text-sm">
                    <Image src={Butterfly2} alt='butterfly icon' className="absolute h-auto w-12 -right-[25px] -top-[23px]" priority />
                      <p>{seance?.text2}</p>
                      <p className="text-sm">{seance?.price2}</p>
                  </button>
                : ''
              }
            </div>
            {seance?.help
                ? <p className="text-base">{seance?.help}</p>
                : ''
              }
        </div>
    )
  }

