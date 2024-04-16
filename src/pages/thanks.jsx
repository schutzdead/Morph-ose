import Image from "next/image"
import Check from "../../public/assets/thanks/check.svg"
import Link from "next/link"
import Logo from "../../public/assets/header/logo1.svg"

import { useContext } from "react"
import { CartContext } from "@/utils/cartProvider"

export default function Thanks () {
    const { dispatch } = useContext(CartContext);
    const clearCart = () => {
        dispatch({
            type: 'CLEAR_CART',
        })
    }

    return(
    <div className="w-[100vw] flex flex-col items-center ">
        <header className="p-10">
            <Link href='/' className='flex flex-col justify-center gap-2 font-bold text-center font-Heise' onClick={clearCart}>
                <Image src={Logo} className='h-24 w-auto cursor-pointer relative' alt='Logo' priority={true}/>
            </Link>
        </header>
        <main className="pt-10 pb-5 flex flex-col items-center relative mt-10 sm:mt-0">
            <div className="w-fit flex flex-col rounded-xl justify-center items-center">
                <div className="mb-7 h-10 w-10 self-center flex bg-[#0cccac] items-center justify-center rounded-full">
                    <Image src={Check} alt="Validate pictogram" />
                </div>
                <p className="text-[#0cccac] font-Quesha text-6xl md:text-4xl 2sm:text-3xl">Paiement validé !</p>
                <div className="text-lg font-medium flex flex-col text-center items-center gap-3 border-t-2 border-gray-400 border-dashed py-10 mt-10 max-w-[600px] w-[90vw] sm:text-base">
                    <p>Nous vous invitons à consulter votre espace client et vos emails.</p>
                    <p className="text-center">Vous allez recevoir un email comprenant le détail de votre commande ainsi que le suivi de votre livraison.</p>
                </div>
                <div className="flex gap-5 pb-24">
                    <Link href="/client" onClick={clearCart}>
                        <button className='font-medium text-center px-[25px] w-fit mt-5 flex gap-3 rounded-md justify-center text-base bg-mainGradient text-white py-3'>Accéder à mon espace</button>
                    </Link>
                    <Link href="/" onClick={clearCart}>
                        <button className='font-medium text-center px-[25px] w-fit mt-5 flex gap-3 rounded-md justify-center text-base bg-mainGradient text-white py-3'>Boutique</button>
                    </Link>
                </div>
            </div>
        </main>
    </div>
    )
}