import Image from "next/image"
import Check from "../../public/assets/thanks/check.svg"
import Logo from "../../public/assets/header/logo1.svg"
import LeftSide from "../../public/assets/thanks/leftSide.svg"
import Link from "next/link"

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
        <div className="w-[100vw] h-[100vh] flex flex-col items-center ">
            <header className="p-10">
                <Link href='/' className='flex flex-col justify-center gap-2 font-bold text-center font-Heise' onClick={clearCart}>
                    <Image src={Logo} className='h-16 w-auto cursor-pointer relative' alt='Logo' priority={true}/>
                    <h1>GHETTO BIZARRE</h1> 
                </Link>
            </header>
            <main className="border border-secondaryLight rounded-xl pt-10 pb-5 flex flex-col items-center relative mt-32 md:mt-10">
                <Link href='/' className="flex items-center absolute top-3 left-3" onClick={clearCart}>
                    <Image src={LeftSide} href='/' className='w-4 h-auto cursor-pointer relative' alt='Logo' priority={true}/>
                    <p className="text-xs font-bold">T</p>
                </Link>
                <div className="mb-7 h-10 w-10 self-center flex bg-[#0cccac] items-center justify-center rounded-full">
                    <Image src={Check} alt="Validate pictogram" />
                </div>
                <p className="text-2xl text-[#0cccac] font-bold">t</p>
                <div className="border border-secondaryLight border-dashed my-5 w-4/5"></div>
                <div className="text-secondaryDark flex flex-col items-center gap-1 p-3 max-w-[400px] sm:max-w-[340px]">
                    <p>t</p>
                    <p className="text-center">t</p>
                </div>
            </main>
        </div>
    )
}