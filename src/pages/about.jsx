import Layout from "@/components/layout/layout";
import Image from "next/image";
import { CustomHead } from "@/components/customHead";
import Link from 'next/link'
import Picture from '../../public/assets/about/bg-who.webp'
import Test from '../../public/assets/about/test.webp'
import Butterfly from '../../public/assets/main/butterfly.svg'
import Vector from '../../public/assets/about/vector.svg'
import { Newletter, Title } from "@/components/homepage/homepage";

export default function About() {
  return (
    <>
      <CustomHead pageName='A propos' metaResume="Retrouvez ici l'ensemble des informations nous concernant, notre équipe, notre savoir-faire..."/>
        <Layout>
          <main className="pt-[1.5vh] flex flex-col items-center">
            <section className="h-home w-[98vw] ml-[1vw] items-end gap-16 pt-5 bg-no-repeat bg-cover bg-bottom flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5" style={{backgroundImage:`url(${Picture.src})`}}>
                <div className=" w-[500px] mr-20 md:mr-0 sm:max-w-[500px] sm:w-[90%]">
                    <div  className="backdrop-blur-sm rounded-3xl pt-4 pb-5 bg-[#582D3E80]">
                        <div className="flex flex-col gap-7 px-7 w-full items-center md:gap-5">
                        <h1 className="text-white leading-[60px] font-Quesha text-7xl md:text-5xl md:leading-[35px]">Qui sommes-nous?</h1>
                            <div className="h-[2px] bg-white place-self-start w-full"></div>
                            <p className="font-medium text-lg md:text-base sm:text-sm">{`Merveille de Morph’ose c’est une équipe réunie autour de passions communes : le bien - être, le développement personnel, le partage et l’ouverture d’esprit.`}</p>
                            <p className="font-bold text-lg md:text-base sm:text-sm">Pour en savoir plus sur nous, ça se passe juste en dessous ! </p>
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
            <section id="me" className="scroll-m-32 flex justify-center relative my-28 md:my-10 md:flex-col md:w-[95%] md:max-w-[600px] md:gap-5">
                <Image src={Picture} alt='Boss' className="relative z-0 w-1/2 rounded-3xl object-cover md:w-full" priority/>
                <div className="flex flex-col w-[40%] max-w-[700px] relative z-10 pb-10 md:w-full">
                    <Image src={Butterfly} alt='butterfly icon' className="place-self-center h-auto w-16 md:w-12" priority />
                    <h2 className="font-Quesha text-primary text-nowrap text-8xl ml-5 lg:text-7xl md:text-6xl sm:text-5xl">{`Moi c'est Mina`}</h2>
                    <div className="h-1 bg-primary w-full mt-5 mb-10"></div>
                    <div className="border-2 border-secondary p-3 -ml-[30%] rounded-3xl shadow-xl md:ml-0 md:border-primary md:shadow-none">
                        <div className="flex flex-col p-10 border-2 gap-5 bg-background border-primary rounded-2xl md:border-none md:p-3">
                            <div>
                                <h3 className="text-lg md:text-base text-primary font-semibold">Qui suis-je ?</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nam architecto rerum tempora delectus accusantium ipsum quas beatae sit? Asperiores.</p>
                            </div>
                            <div>
                                <h3 className="text-lg md:text-base text-primary font-semibold">Qui suis-je ?</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nam architecto rerum tempora delectus accusantium ipsum quas beatae sit? Asperiores.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="team" className="scroll-m-32 flex flex-col items-center gap-14 mx-10 justify-center relative sm:gap-8 sm:px-0 md:mx-5">
                <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[70%] top-[15%] w-full"></div>
                <Title title='Une équipe' butterfly={true} />
                <div className="text-2xl flex flex-col gap-10 font-medium lg:text-xl sm:text-base text-center text-secondary">
                    <p className="max-w-[1200px] border-2 border-[#ECA683] p-5 rounded-xl md:p-3">Une équipe soudée, passionnée par le bien-être, l’ésotérisme et le développement personnel </p>
                    <p className="max-w-[1000px] font-normal">Et oui, il a fallu constituer une équipe qui partage les mêmes passions et qui se complète pour qu’on puisse vous proposer des services variés et de qualité avec des experts qualifiés dans plusieurs domaines ésotériques </p>
                </div>
                <div className="grid grid-cols-3 my-10 md:my-5 gap-10 md:grid-cols-2 sm:grid-cols-1">
                    <CardTeam picture={Picture} text="Floyd Miles" status="Fondatrice" />
                    <CardTeam picture={Picture} text="Floyd Miles" status="Fondatrice" />
                    <CardTeam picture={Picture} text="Floyd Miles" status="Fondatrice" />
                </div>
            </section>
            <section className="flex mt-28 md:mt-10 items-center w-full gap-10 relative sm:gap-8">
                <Image src={Vector} alt='Vector icon' className="max-w-[35%] sm:hidden" priority/>
                <div className="w-full flex justify-center"><button type='submit' className='flex place-self-center items-center gap-3 text-white justify-center bg-homeGradient3 py-4 w-full px-5 max-w-[250px] text-xl font-semibold rounded-md lg:text-lg md:text-md sm:text-sm sm:font-medium cursor-pointer sm:w-fit sm:place-self-center'>Réserver une séance</button></div>
                <Image src={Vector} alt='Vector icon' className="max-w-[35%] rotate-180 sm:hidden" priority/>
            </section>
            <section id="values" className="scroll-m-32 flex flex-col  my-28 md:my-16 items-center gap-14 mx-10 justify-center relative sm:gap-8 sm:px-0 md:mx-5">
                <div className="absolute -z-10 bg-pictoGradient blur-[250px] h-[70%] top-[15%] w-full"></div>
                <Title title='Mais surtout des valeurs' butterfly={true} />
                <div className="flex gap-10 items-center md:flex-col-reverse sm:gap-10">
                    <div className="w-1/2 md:w-[90%] sm:w-[97%]">
                        <p className="max-w-[1000px] font-normal text-center text-lg md:text-base">Et oui, il a fallu constituer une équipe qui partage les mêmes passions et qui se complète pour qu’on puisse vous proposer des services variés et de qualité avec des experts qualifiés dans plusieurs domaines ésotériques</p>
                    </div>
                    <div className="w-1/2 grid-cols-2 grid gap-5 md:w-[90%] sm:w-[97%]">
                        <Value picture={Test} text="Confiance" />
                        <Value picture={Test} text="Confiance" />
                        <Value picture={Test} text="Confiance" />
                        <Value picture={Test} text="Confiance" />
                    </div>
                </div>
            </section>
            <section id="goal" className="scroll-m-32 flex justify-center flex-row-reverse relative md:flex-col-reverse md:w-[95%] md:max-w-[600px] md:gap-5">
                <Image src={Picture} alt='Boss' className="relative z-0 w-1/2 rounded-3xl object-cover md:w-full" priority/>
                <div className="flex flex-col w-[40%] max-w-[700px] relative z-10 pb-10 md:w-full">
                    <Image src={Butterfly} alt='butterfly icon' className="place-self-center h-auto w-16 md:w-12" priority />
                    <h2 className="font-Quesha text-primary text-nowrap text-8xl ml-5 lg:text-7xl md:text-6xl sm:text-5xl">Notre objectif</h2>
                    <div className="h-1 bg-primary w-full mt-5 mb-10"></div>
                    <div className="border-2 border-secondary p-3 -mr-[30%] rounded-3xl shadow-xl md:mr-0 md:border-primary md:shadow-none">
                        <div className="flex flex-col p-10 border-2 gap-5 bg-background border-primary rounded-2xl md:border-none md:p-3">
                            <div>
                                <h3 className="text-lg md:text-base text-primary font-semibold">Qui suis-je ?</h3>
                                <p>{`Propager cet état d'esprit positif au-delà des frontières de ma boutique virtuelle, pour rassembler une communauté vibrante et joyeuse pleine de bienveillance et d'harmonie.`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Newletter />
          </main>
        </Layout>
    </>
  )
}

function CardTeam ({picture, text, status}) {
    return(
        <div className=" flex flex-col gap-3">
            <div className="max-w-[240px] h-[360px] lg:w-[200px] lg:h-[300px] sm:w-full">
                <Image src={picture} alt='team picture' className="object-cover h-full w-full" priority />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-lg sm:text-base text-secondary">{text}</h3>
                <p className="sm:text-sm text-[#737373]">{status}</p>
            </div>
        </div>
    )
}

function Value ({picture, text}) {
    return(
        <div className=" flex flex-col gap-1">
            <div className="max-w-[280px] w-full h-auto">
                <Image src={picture} alt='team picture' className="object-cover h-full w-full" priority />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-lg sm:text-base text-secondary">{text}</h3>
            </div>
        </div>
    )
}