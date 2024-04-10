import Image from "next/image"
import Close from '../../../public/assets/close.svg'
import RightArrow from '../../../public/assets/articles/rightSide.svg'
import Link from "next/link"

import { unlock } from "@/utils/lockScreen"
import { CartContext } from "@/utils/cartProvider";
import { UpdateButton } from '@/components/articles/updateButton';
import { removeCart } from "@/utils/cartReducer";

import { useContext, useEffect, useState } from "react"
import { ThemeProvider } from "@emotion/react"
import { colorTheme } from "../styles/mui"
import { Button } from "@mui/material"
import { useTranslation } from 'next-i18next'


export default function Card ({bag, setBag}) {
    const { t } = useTranslation()
    const { v4: uuidv4 } = require('uuid');
    const { cart } = useContext(CartContext);
    const [command, setCommand] = useState()    
    useEffect(() => {
        if(cart === undefined) return
        setCommand(cart)
    }, [bag, cart])

    return(
        <div className="w-full h-full top-0 left-0 absolute overflow-hidden">
            <div className="fixed w-full h-full left-0 top-0 z-30 bg-black/80 cursor-pointer"
                 style={bag ? {opacity:1, transition:'opacity 1s'} : {opacity:0, zIndex:-10}}
                 onClick={() => {setBag(false), unlock()}}></div>
            <menu className="fixed h-full z-40 bg-white text-black flex flex-col transition-all duration-700 py-10 md:py-5 sm:w-full"
                 style={bag ? {right:0, transition:'right 400ms ease-out'} : {right:'-100%'}}>
                    <div className="flex items-center text-xs self-end pr-3 cursor-pointer" onClick={() => {setBag(false);unlock()}}>
                        <p>{t('bag.continue')}</p>
                        <Image src={RightArrow} alt="Right arrow pictogram" className='w-5'/>
                    </div>
                    <div className="mt-5 mb-12 pl-10 md:mb-8">
                        <p className="font-Comorant text-4xl font-bold md:text-lg">{t('bag.your')}</p>
                        <p className="font-semibold text-6xl md:text-4xl">{t('bag.bag')}</p>
                    </div>
                    {!command || command.length === 0
                        ? <p className="w-[400px] h-full flex pt-40 justify-center sm:w-auto">{t('bag.empty')}</p>
                        : 
                        <div className="flex overflow-y-auto">
                            <div className="px-5 overflow-y-scroll scrollbar-thumb-gray-300 scrollbar-thin scrollbar-w-2 flex flex-col gap-10 w-[400px] sm:w-full">
                                {command.map(article => <Article key={uuidv4()} data={article}/>)}
                            </div>
                        </div>
                    }
                    {!command || command.length === 0
                        ? ''
                        : 
                    <div className="flex flex-col gap-8 w-full px-5 pt-6 bg-white md:gap-4 md:py-5">
                        <div className="gap-1">
                            <p className="">{t('bag.subtotal')} : {command.reduce((accumulator, currentValue) =>
                                accumulator + (currentValue.price * currentValue.quantity), 0
                            )}€</p>
                            <p className="text-[10px]">{t('bag.TVA')}</p>
                        </div>
                        <Link href='/checkout/' onClick={() => {setBag(false);unlock()}}>
                            <ThemeProvider theme={colorTheme}>
                                <Button variant="contained" sx={{borderRadius:0, fontSize:12}} className="bg-black w-full">{t('bag.button')}</Button>
                            </ThemeProvider>
                        </Link>
                    </div>
                    }
            </menu>
        </div>
    )
}

export function Article (data) {
    const { t } = useTranslation()
    const { dispatch } = useContext(CartContext);
    const [quantityValue, setQuantityValue] = useState(data.data.quantity)
    return(
        <div className="flex flex-col gap-10 w-full md:gap-7">
            <div className='text-xs flex gap-10 items-center w-full'>
                <Image 
                    src={data.data.picture.url} 
                    alt="Article picture" 
                    width={120}
                    height={160}
                    className="w-[80px] h-auto"
                    />
                <section className='flex flex-col h-full justify-between w-[130px]'>
                        <div className="flex flex-col gap-1">
                            <h3 className="whitespace-nowrap">{data.data.title}</h3>
                            <p>{t('bag.size')} : {data.data.size}</p>
                            <p>{Math.round((data.data.price*data.data.quantity) * 100) / 100} €</p>
                        </div>
                        <div className="place-self-start lg:mt-2">
                            <UpdateButton setQuantityValue={setQuantityValue} quantityValue={quantityValue} updateFct={true} article={data.data}/>
                        </div>
                </section>
                <div className='flex items-center w-full justify-end'>
                    <Image src={Close} onClick={() => dispatch(removeCart(data.data))} alt="Remove article pictogram" className='w-4 p-3 border border-transparent cursor-pointer box-content  hover:bg-secondaryLight hover:border-black'/>
                </div>
            </div>
            <div className="bg-secondaryLight h-[1px] w-full"></div>
        </div>
    )
}