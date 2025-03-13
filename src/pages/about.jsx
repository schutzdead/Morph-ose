import Layout from "@/components/layout/layout";
import Image from "next/image";
import { CustomHead } from "@/components/customHead";
import Link from 'next/link'
import Mina from '../../public/assets/about/mina.webp'
import Picture from '../../public/assets/about/bg-who.webp'
import shop1 from '../../public/assets/about/shop1.webp'
import shop2 from '../../public/assets/about/shop2.webp'
import shop3 from '../../public/assets/about/shop3.webp'

import confiance from '../../public/assets/about/confiance.webp'
import bienveillance from '../../public/assets/about/bienveillance.webp'
import respect from '../../public/assets/about/respect.webp'
import partage from '../../public/assets/about/partage.webp'
import objectif from '../../public/assets/about/objectif.webp'

import Butterfly from '../../public/assets/main/butterfly.svg'
import Vector from '../../public/assets/about/vector.svg'
import { Newletter, Title } from "@/components/homepage/homepage";

export default function About() {
  return (
    <>
      <CustomHead pageName='A propos' metaResume="Retrouvez ici l'ensemble des informations nous concernant, notre équipe, notre savoir-faire..."/>
        <Layout>
          <main className="pt-[1.5vh] flex flex-col items-center text-secondary">
            <section className="h-home w-[98vw] ml-[1vw] items-end gap-16 pt-5 bg-no-repeat bg-cover bg-bottom flex flex-col relative rounded-3xl justify-center text-white lg:gap-10 md:items-center sm:gap-5 hlg:h-auto hlg:py-10" style={{backgroundImage:`url(${Picture.src})`}}>
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
            <section id="me" className="scroll-m-32 flex justify-center relative my-14 md:my-10 md:flex-col md:px-3 md:gap-5">
                <div className="flex flex-col items-center w-full px-10 max-w-[1280px] relative z-10 pb-10 md:w-full md:px-0">
                    <Image src={Butterfly} alt='butterfly icon' className="place-self-center h-auto w-16 md:w-12" priority />
                    <div className="mb-5">
                        <Title title='Bienvenue, je suis Mina !' />
                    </div>
                    <div className="border-2 border-secondary p-3 rounded-3xl shadow-xl md:ml-0 md:border-primary md:shadow-none">
                        <div className="p-10 border-2 gap-5 bg-background border-primary rounded-2xl md:border-none md:flex md:flex-col md:p-3">
                            <Image src={Mina} alt='Mina' className="w-[300px] lg:w-[250px] mr-10 mb-10 float-left rounded-3xl object-cover md:w-full md:max-w-[300px] md:mb-5 md:place-self-center md:float-none md:mr-0" priority/>
                            <p><b>Passionnée</b> des apprentis-sages que ce soit à travers la science, la philosophie, l’art, la spiritualité, l’ésotérisme, les médecines douces, le vivre bien…Entre autres ! Comme vous l’aurez compris, <b>mon approche du bien-être est holistique et très variée !</b></p>
                            <p>Pourtant, il y a quelques années mon ouverture d’esprit n’était pas aussi déployée. J’ai grandi de façon très terre à terre. Après des études en biologie, j’ai effectué presque 11 ans dans l’armée de terre, rien ne me destinée à première vue à créer un tel projet …</p>
                            <p><b>Chacun de nous peut observer que les challenges de la vie peuvent bouleverser, chambouler et initier de fabuleuses transformations. </b></p>
                            <p>De mon côté, deux grands événements principaux en plus du reste m’ont mené à poser ces mots sur cette page :</p>
                            <p>Le premier est <b>le décès de mon petit frère</b>. En 2018 à l’âge de 18 ans, son cœur s’est arrêté, comme ça, sans aucun signe avant-coureur. Il était là et l’instant d’après ce fut fini. C’est à partir de ce moment-là que j’ai commencé à ne plus pouvoir fermer les yeux sur certaines subtilités qui m’entouraient et sur ces facultés qui se dévoilaient en moi. Celles-ci commencées à s’imposées à moi comme <b>une évidence</b>. J’ai commencé à m’ouvrir à l’ésotérisme, à la médiumnité, aux approches énergétiques… <b>Je me suis beaucoup formée pour comprendre ce qui se passait et expandre mon potentiel.</b></p>
                            <p><b>J’ai appris petit à petit que la complémentarité du « terre à terre » et du « subtile », de l’« énergétique » était un magnifique cadeau et mené à l’unification de mon ÊTRE, à mon harmonie intérieur et donc extérieure…</b> </p>
                            <p>Le deuxième évènement fut la flamme qui a initiée cette création. En effet, en janvier 2023, je découvrais que j’avais une masse au niveau du sein droit ... Il n’a fallu que quelques jours pour que les termes de `cancer` et `agressif` me soient donnés. J’ai fait le choix d’un <b>parcours en santé intégrative</b> : complémentarité des soins conventionnels et de soins naturels, holistiques. Depuis décembre 2023, j’ai la joie d’être en rémission complète.</p>
                            <p>Le 18 juillet <b>2024</b>, je décide de ma lancer, <b>je crée ma société : Morph’ose Évolution</b>. Je ressens une <b>immense gratitude pour tout le soutien</b> que j’ai reçu et que je reçois encore de mon entourage : famille et amis. Car oui, je peux le dire, ce projet est une entreprise familiale : <b>famille de sang et famille de cœur</b>. C’est un <b>projet familial</b>, aussi bien par le soutien financier, que moral ou encore par leur participation régulière via des actions soutenantes et concrètes. <b>Alors un grand merci à vous, mon entourage, mes piliers. Vous contribuez chaque jour à sublimer ma force, mon courage.</b></p>
                            <p><b>Le 5 décembre 2024 fut le moment tant attendu, j’ai ouvert officiellement ce magnifique lieu, au 28 rue du commerce à Cournon-d’Auvergne (63).</b></p>
                            <p>Cette boutique est le <b>fruit de ma soif de vivre</b>. Durant tout mon parcours face à la « boule », comme je l’appelais, elle a pris vie, elle a pris forme. Cette boutique est le fruit de <b>mon envie de partager ce qui m’a permis en partie de rester debout jour après jour</b> : les outils, les produits, les séances et les ateliers, oui bien sûr, et à cela je souhaite y ajouter le partage, la bienveillance, le fait d’avoir était entouré, d’avoir pu échanger, extérioriser sans crainte. Car oui, je souhaite que dans cette boutique et ce site, dans cet écosystème bien-être il y est bien plus que simplement un aspect commercial... Je souhaite que ce soit des<b> lieux d’échange, de retrouvailles, des lieux où l’on se sent assez à l’aise pour être soi-même sans avoir peur d’être jugé. Des lieux cocooning où chaque avis, chaque perception nourrit le collectif.</b></p>
                            <p>Je souhaite pouvoir recréer en ligne une grande partie des sensations qui seront offertes en présentiel et ainsi rendre votre voyage à travers ces pages et les Visio le plus agréable et chaleureux possible.</p>
                            <p>Alors bon voyage et à très bientôt !</p>
                            <div className="w-full flex justify-center flex-col items-center mt-4 font-semibold">
                                <p>Mina PASQUIER-SAADOUNE</p>
                                <p>Fondatrice de la société Morph’ose Évolution et créatrice de la boutique Merveilles de Morph’ose.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 flex-wrap m-10 justify-center">
                        <Image src={shop1} alt='image de la boutique' className="w-[300px] object-cover rounded-xl" priority />
                        <Image src={shop2} alt='image de la boutique' className="w-[300px] object-cover rounded-xl" priority />
                        <Image src={shop3} alt='image de la boutique' className="w-[300px] object-cover rounded-xl" priority />
                    </div>
                </div>
            </section>
            <section id="team" className="scroll-m-32 flex flex-col max-w-[1280px] place-self-center gap-8 mx-10 justify-center relative sm:gap-8 sm:px-0 md:mx-5">
                <Title title='Une équipe' butterfly={true} />
                <div className="text-2xl flex flex-col gap-10 font-medium lg:text-xl sm:text-base text-secondary">
                    {/* <p className="max-w-[1200px] border-2 border-[#ECA683] p-5 rounded-xl md:p-3">Une équipe soudée, passionnée par le bien-être, l’ésotérisme et le développement personnel </p> */}
                    <p className="font-normal">Je m’entoure d’une équipe de passionnée et professionnelle pour vous offrir une expérience
                    unique que ce soit en boutique ou sur ce magnifique site web !</p>
                </div>
                {/* <div className="grid grid-cols-3 my-10 md:my-5 gap-10 md:grid-cols-2 sm:grid-cols-1">
                    <CardTeam picture={Picture} text="Floyd Miles" status="Fondatrice" />
                    <CardTeam picture={Picture} text="Floyd Miles" status="Fondatrice" />
                    <CardTeam picture={Picture} text="Floyd Miles" status="Fondatrice" />
                </div> */}
            </section>
            <section className="flex mt-28 md:mt-10 items-center w-full gap-10 relative sm:gap-8">
                <Image src={Vector} alt='Vector icon' className="max-w-[35%] sm:hidden" priority/>
                <div className="w-full flex justify-center"><button type='submit' className='flex place-self-center items-center gap-3 text-white justify-center bg-homeGradient3 py-4 w-full px-5 max-w-[250px] text-xl font-semibold rounded-md lg:text-lg md:text-md sm:text-sm sm:font-medium cursor-pointer sm:w-fit sm:place-self-center'>Réserver une séance</button></div>
                <Image src={Vector} alt='Vector icon' className="max-w-[35%] rotate-180 sm:hidden" priority/>
            </section>
            <section id="values" className="scroll-m-32 flex flex-col  my-28 md:my-16 max-w-[1280px] gap-14 mx-10 justify-center relative sm:gap-8 sm:px-0 md:mx-5">
                <Title title='Et surtout des valeurs' butterfly={true} />
                <div className="flex gap-10 items-center flex-col sm:gap-10">
                    <div className=" flex flex-col gap-3 font-normal text-lg lg:text-base">
                        <p><b>La confiance, le partage, le respect, la bienveillance et la communication</b> sont entre autres des valeurs fortes que je souhaite entretenir dans chacun des espaces proposés par Merveilles de Morph’ose (boutique, site, ateliers, séances individuelles).</p>
                        <p>Des <b>espaces confidentiels</b> où vous pourrez être vous-même en toute <b>
                            sérénité, en toute
                            sécurité.
                        </b></p>
                        <p>Je souhaite créer des espaces où chaque personne pourra se sentir en confiance, des espaces <b>accueillants</b> où chaque sourire, chaque avancée vers le mieux-être, où chaque réponse trouvée seront des victoires.</p>
                        <p>J’aurai un immense plaisir à voir que chacune de ces personnes pourra rayonner ce mieux être même en dehors de ces espaces en prenant des décisions, en avançant sur un nouveau projet ou simplement en étant enfin elle-même et bien.</p>
                    </div>
                    <div className="flex flex-wrap gap-5 justify-center">
                        <Value picture={confiance} text="Confiance" />
                        <Value picture={bienveillance} text="Bienveillance" />
                        <Value picture={respect} text="Respect" />
                        <Value picture={partage} text="Partage" />
                    </div>
                </div>
            </section>
            <section id="goal" className="scroll-m-32 flex justify-center flex-row-reverse relative md:flex-col-reverse md:w-[95%] md:max-w-[600px] md:gap-5">
                <Image src={objectif} alt='Objetifs' className="relative z-0 w-1/2 rounded-3xl object-cover md:w-full" priority/>
                <div className="flex flex-col w-[40%] max-w-[700px] relative z-10 pb-10 md:w-full">
                    <Image src={Butterfly} alt='butterfly icon' className="place-self-center h-auto w-16 md:w-12" priority />
                    <Title title='Notre objectif'/>
                    <div className="border-2 mt-3 border-secondary p-3 -mr-[30%] rounded-3xl shadow-xl md:mr-0 md:border-primary md:shadow-none">
                        <div className="flex flex-col p-10 border-2 gap-5 bg-background border-primary rounded-2xl md:border-none md:p-3">
                            <p>A travers la société Morph’ose Évolution et donc à travers Merveilles de Morph’ose, je souhaite vous proposer des approches pour atteindre le <b>`vivre bien`, le `vivre mieux`</b>. Je souhaite <b>assouvir la curiosité</b> des plus chevronnés, offrir des espaces de <b>développement de la créativité</b>, permettre de <b>vivre de bons et chaleureux moments de partages, des expériences uniques</b> et bien plus encore !</p>
                            <p>Je suis tellement heureuse de <b>fédérée autant de joie et de personnes autour de ce projet</b>.</p>
                            <p>A mes yeux, c’est bien plus qu’un projet, bien plus qu’une société ; <b>c’est un état d’esprit que j’aspire à diffuser, à transmettre</b>.</p>
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

function Value ({picture, text}) {
    return(
        <div className=" flex flex-col gap-1">
            <div className="max-w-[250px] max-h-[170px]">
                <Image src={picture} alt='team picture' className="object-cover w-full h-full" />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-lg sm:text-base text-secondary">{text}</h3>
            </div>
        </div>
    )
}