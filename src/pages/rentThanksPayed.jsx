import Image from "next/image"
import Main_picture from "../../public/assets/thanks/thanksPro.webp"
import Link from "next/link"
import Logo from "../../public/assets/header/logo1.svg"

import { useContext } from "react"
import { CartContext } from "@/utils/cartProvider"

import Facebook from '../../public/assets/footer/facebook.svg'
import Instagram from '../../public/assets/footer/instagram_white.svg'
import Tiktok from '../../public/assets/footer/tiktok.svg'
import Yt from '../../public/assets/footer/yt.svg'

export default function RentThanks () {
    const { dispatch } = useContext(CartContext);
    const clearCart = () => {
        dispatch({
            type: 'CLEAR_CART',
        })
    }

    return(
    <>
        <div className="w-[100vw] flex flex-col items-center mb-20">
            <header className="py-5">
                <Link href='/' className='flex flex-col justify-center gap-2 font-bold text-center font-Heise' onClick={clearCart}>
                    <Image src={Logo} className='h-20 w-auto cursor-pointer relative' alt='Logo' priority={true}/>
                </Link>
            </header>
            <div className="w-full">
                <Image src={Main_picture} className='object-cover h-[40vh] w-full' alt='Logo' priority={true}/>
            </div>
            <div className="pt-10 pb-5 flex flex-col items-center">
                <div className="flex flex-col text-secondary w-[90vw] p-6 rounded-xl place-self-center text-center relative sm:w-[95vw]">
                    <h1 className="font-Quesha text-7xl xl:text-6xl md:text-5xl">Merci de votre confiance !</h1>
                    <p className="text-xl flex flex-col pb-10 gap-5 lg:pb-0 lg:text-lg sm:text-base ">Votre paiement a bien été validé !</p>
                </div> 
            </div>
            <div className="max-w-[1000px] w-[90%] mb-10 text-center flex flex-col items-center gap-5 bg-secondary text-white relative rounded-3xl justify-center pt-10 px-28 lg:px-10 sm:px-5">
                <p className="text-xl lg:text-lg md:text-base">Nous nous occupons actuellement de créer votre évènement ou atelier en fonction des renseignements que vous nous avez transmis. Il sera publié sur notre site.</p>
                <p className="text-xl lg:text-lg md:text-base">Vous retrouverez les détails de votre réservation sur votre espace client, rubrique Location.</p>
                <div className="flex gap-5 -mb-[25px] mt-5 text-white font-medium text-lg lg:text-base md:text-sm md:-mb-[20px]">
                    <Link href='/client' className="px-10 h-[50px] md:h-[40px] md:px-5 w-fit bg-primary rounded-[50px] flex items-center justify-center" onClick={clearCart}>Espace client</Link>
                </div>
            </div>
            <div className="flex flex-col text-secondary w-[90vw] p-6 rounded-xl place-self-center text-center relative sm:w-[95vw]">
                <h1 className="font-Quesha text-6xl xl:text-5xl md:text-4xl">A bientôt</h1>
                <p className="text-lg font-semibold flex flex-col gap-5 lg:text-base sm:text-sm">L’équipe Merveilles de Morph’ose</p>
            </div> 
            <div className="flex flex-col gap-3 items-center mt-5">
                <p className="font-semibold underline underline-offset-2">Nos réseaux sociaux</p>
                <div className="flex gap-3">
                    <SocialNetworkIcon icon={Facebook} link="/" />
                    <SocialNetworkIcon icon={Instagram} link="/" />
                    <SocialNetworkIcon icon={Yt} link="https://www.youtube.com/@MorphoseEvolution" />
                    <SocialNetworkIcon icon={Tiktok} link="https://www.tiktok.com/@morphose.evolution?_t=8mOQ1Vab2yO&_r=1" />
                </div>
            </div>
        </div>
    </>
    )
}

function SocialNetworkIcon ({icon, link}) {
    return(
        <Link href={link} target="_blank" className="w-[40px] h-[40px] bg-primary rounded-full flex items-center justify-center">
            <Image src={icon} alt='network icon' className="w-4 h-auto" priority />
        </Link>
    )
}