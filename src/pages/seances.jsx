import Layout from "@/components/layout/layout";
import Image from "next/image";
import { CustomHead } from "@/components/customHead";
import Link from 'next/link'
import Picture from '../../public/assets/services/bg-perso.webp'
import { Newletter, Title} from "@/components/homepage/homepage";
import Vector from '../../public/assets/about/vector.svg'
import { seance } from "../../public/assets/seances";
import Butterfly2 from '../../public/assets/main/butterfly2.svg'

export default function Seances() {
  return (
    <>
      <CustomHead pageName='Séances individuelles' metaResume="Retrouvez l'ensemble de nos séances individuelles"/>
        <Layout>
          <main className="pt-[1.5vh] flex flex-col">

            <section className="h-home w-[98vw] items-start ml-[1vw] gap-16 bg-no-repeat bg-cover bg-bottom flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5 hlg:h-auto hlg:py-10" style={{backgroundImage:`url(${Picture.src})`}}>
              <div className=" w-[500px] ml-20 md:ml-0 sm:max-w-[500px] sm:w-[90%]">
                <div  className="backdrop-blur-sm rounded-3xl pt-4 pb-5 bg-[#582D3E80]">
                  <div className="flex flex-col gap-5 px-7 w-full items-center md:gap-5">
                  <h1 className="text-white leading-[70px] font-Quesha text-8xl md:text-6xl md:leading-[40px]">Nos séances individuelles</h1>
                    <div className="h-[2px] bg-white place-self-start w-full"></div>
                    <p className="font-medium text-lg md:text-base sm:text-sm">Nous vous invitons à explorer une expérience unique et personnalisée conçue pour vous guider vers une meilleure compréhension de vous-même et votre épanouissement.</p>
                    {/* <p className="font-medium text-lg md:text-base sm:text-sm">Êtes-vous prêt pour ce merveilleux voyage en notre compagnie ?</p> */}
                    <p className="font-bold text-lg md:text-base sm:text-sm">Êtes-vous prêt à entamer la quête vers la nouvelle version de vous-même ?</p>
                  </div>
                </div>
                <div className="flex gap-5 w-full mt-2">
                  <Link href='/services' className="w-1/2 flex justify-center border-2 border-primary text-sm font-black bg-background text-primary place-self-end rounded-2xl py-3 md:font-extrabold">
                    SERVICES
                  </Link>
                  <Link href='/categories' className="w-1/2 flex justify-center text-sm border-2 border-secondary font-black bg-background text-secondary place-self-end rounded-2xl py-3 px-10 md:px-5 md:font-extrabold">
                    BOUTIQUE
                  </Link>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-14 items-center place-self-center justify-center relative my-20 sm:my-10 sm:gap-8 sm:px-0 mx-5 max-w-[1280px]">
                <div className="flex flex-col gap-5 mt-5 text-secondary text-xl lg:text-lg font-medium sm:text-sm">
                  <Title title='Qu’avons-nous à vous proposer?' />
                    <p>Chez Merveilles de Morphose, nous vous accompagnons quel que soit votre quête : la splendide aventure de la (re)découverte de vous-même, l’ouverture des champs des possibles, l’accueil du changement… </p>
                    <p>Besoin <b>d’éclaircir ou de débloquer</b> une situation, besoin de clés pour <b>faire vos propres choix</b> ou juste par <b>curiosité </b>? <b> En Visio, dans nos locaux</b> au 28 rue du commerce à Cournon-d’Auvergne (63) ou <b>par retour mail</b>, vous trouverez surement l’approche qui vous correspond.</p>
                    <p className="text-base font-normal sm:text-sm">Petit mot : merci de bien vouloir faire preuve de discernement, quoiqu’il puisse vous être conseillé, vous êtes et resterez le/la seul(e) décisionnaire de votre vie.</p>
                </div>
                <div className="flex flex-col gap-5 mt-5 text-secondary text-xl w-full lg:text-lg font-medium sm:text-sm">
                    <h3 className="text-primary mb-5 font-semibold text-2xl lg:text-xl md:text-lg">Nous proposons une variété de séances adaptées à vos besoins</h3>
                    <p>Chaque session est une opportunité de croissance, d’évolution et de réflexion. <b>Faites le premier pas vers un changement positif.</b></p>
                </div>
                {seance?.length === 0 || !seance
                ? <p className='font-medium place-self-center text-secondary text-center sm:text-sm'>Aucun évènement de disponible pour le moment, revenez plus tard.</p>
                : <div className="gap-8 grid grid-cols-2 mt-5 w-full justify-items-center lg:flex lg:flex-col lg:items-center">
                    { seance?.map((seance, index) => <SeancesIndividual key={index} seance={seance} index={index} />)}
                    {/* <div className="w-[480px] rounded-3xl flex flex-col text-white gap-5 items-center justify-center bg-no-repeat bg-center text-center sm:w-[97vw] lg:hidden" style={{backgroundImage:`url(${Picture2.src})`}}>
                      <h1 className="font-Quesha text-6xl bg-primary/30 flex items-center justify-center h-full w-full rounded-3xl leading-[40px] md:text-6xl">Bienveillance et respect sont nos mantras</h1>
                    </div> */}
                </div>
                }
                <p className="font-bold text-2xl lg:text-xl sm:text-base pt-10 text-center sm:pt-5 text-secondary">Réservez votre séance individuelle dès aujourd’hui et commencez le magnifique voyage vers votre transformation personnelle et spirituelle.</p>
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
              {
                seance?.seances?.length > 0 
                  ? seance?.seances?.map((s, index) => 
                    <Link key={index} href={s?.link ? `${s?.link}` : "/seances"} target="_blank" className="py-2 w-full bg-mainGradient rounded-[50px] text-white font-medium text-lg relative md:text-sm">
                      <Image src={Butterfly2} alt='butterfly icon' className="absolute h-auto w-12 -right-[25px] -top-[23px]" priority />
                        <p>{s?.title}</p>
                        <p className="text-base">{s?.price}€</p>
                    </Link>
                  )
                  : <p>Aucune séance pour le moment.</p>
              }
            </div>
            {seance?.help
                ? <p className="text-base">{seance?.help}</p>
                : ''
              }
        </div>
    )
  }

