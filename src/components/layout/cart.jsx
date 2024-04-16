import Image from "next/image"
import RightArrow from '../../../public/assets/articles/rightSide.svg'
import Link from "next/link"

import { unlock } from "@/utils/lockScreen"
import { CartContext } from "@/utils/cartProvider";
import { UpdateButton } from '@/components/articles/updateButton';
import { removeCart } from "@/utils/cartReducer";

import { useContext, useEffect, useState } from "react"
import { CustomButton } from "../homepage/homepage"

import Trash from '../../../public/assets/articles/trash.svg'

export default function Card ({bag, setBag}) {
    const { v4: uuidv4 } = require('uuid');
    const { cart } = useContext(CartContext);
    const [command, setCommand] = useState()    
    useEffect(() => {
        if(cart === undefined) return
        setCommand(cart)
    }, [bag, cart])

    return(
        <>
            <div className="fixed w-full h-full left-0 top-0 z-[30] bg-black/60 cursor-pointer" style={bag ? {opacity:1, transition:'opacity 1s'} : {opacity:0, zIndex:-10}}  onClick={() => {setBag(false), unlock()}}></div>
            <menu className="fixed h-full z-40 bg-white text-black flex flex-col py-10 md:py-5 sm:w-full" style={bag ? {right:"0%", transition:'right 400ms ease-out'} : {right:'-100%'}}>
                    <div className="flex items-center text-xs self-end pr-3 cursor-pointer" onClick={() => {setBag(false);unlock()}}>
                        <p className="text-secondary mb-[3px] font-medium">Boutique</p>
                        <Image src={RightArrow} alt="Right arrow pictogram" className='w-5'/>
                    </div>
                    <div className="mt-5 mb-12 pl-10 gradient-text md:mb-8 sm:hidden">
                        <p className="font-Quesha text-8xl xl:text-6xl md:text-4xl 2sm:text-3xl">Votre</p>
                        <p className="font-semibold text-6xl md:text-4xl">Panier</p>
                    </div>
                    <div className="mt-2 mb-12 hidden pl-10 gradient-text md:mb-8 sm:flex">
                        <p className="font-Quesha text-8xl xl:text-6xl md:text-4xl">Votre Panier</p>
                    </div>
                    {!command || command.length === 0
                        ? <p className="w-[400px] h-full flex pt-40 justify-center sm:w-auto">Aucun article.</p>
                        : 
                        <div className="flex overflow-y-auto">
                            <div className="px-5 overflow-y-scroll scrollbar-thumb-gray-300 scrollbar-thin scrollbar-w-2 flex flex-col gap-10 w-[400px] sm:w-full sm:gap-0">
                                {command.map(article => <Article key={uuidv4()} data={article}/>)}
                            </div>
                        </div>
                    }
                    {!command || command.length === 0
                        ? ''
                        : 
                    <div className="flex flex-col gap-8 w-full px-5 pt-6 text-primary md:gap-4 md:py-5 sm:mb-14">
                        <div className="gap-1">
                            <p className="font-semibold text-lg sm:text-base">Sous-total : {command.reduce((accumulator, currentValue) =>
                                accumulator + (currentValue.price * currentValue.quantity), 0
                            ).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]}€</p>
                            <p className="text-[10px] text-gray-500">Prix ​​TTC, hors frais de livraison</p>
                        </div>
                        <Link href='/checkout/' onClick={() => {setBag(false);unlock()}} className="place-self-center">
                            <CustomButton butterfly={true} text="Continuer" style={{width:"250px", height:'40px'}} />
                        </Link>
                    </div>
                    }
            </menu>
        </>
    )
}

export function Article (data) {
    const { dispatch } = useContext(CartContext);
    const [quantityValue, setQuantityValue] = useState(data.data.quantity)
    return(
        <div className="flex flex-col gap-10 w-full md:gap-7">
            <div className='text-xs flex gap-5 items-center w-full'>
                <section className="w-28 h-28 min-h-28 min-w-28 relative md:w-20 md:h-20 md:min-h-20 md:min-w-20">
                    <Image
                        src={data.data.picture.url}
                        alt="Article picture"
                        fill
                        className="rounded-2xl object-cover"
                        />
                </section>
                <section className='flex flex-col h-full justify-between w-full flex-1 text-secondary md:h-20'>
                        <div className="flex flex-col gap-1 w-full">
                            <h3 className="font-bold text-lg lg:text-base leading-none sm:text-sm">{data?.data?.title}</h3>
                            <h3 className="whitespace-nowrap sm:text-sm ">Référence : {data?.data?.reference ? data?.data?.reference : 0}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                            <p className="font-medium text-lg sm:text-base">{data?.data?.promo_price ? data?.data?.promo_price : data?.data?.price}€</p>
                            <p className="text-[#A57A95] font-medium line-through sm:text-sm">{data?.data?.price}€</p>
                        </div>
                </section>
                <section className='flex flex-col items-end justify-between w-fit h-full md:h-20'>
                    <Image src={Trash} onClick={() => dispatch(removeCart(data.data))} alt="Remove article pictogram" className="w-5"/>
                    <div className="flex gap-5 items-center">
                        <UpdateButton quantityValue={quantityValue} setQuantityValue={setQuantityValue} updateFct={true} article={data.data} />
                    </div>
                </section>
            </div>
            <div className="bg-secondaryLight h-[1px] w-full"></div>
        </div>
    )
}