import Image from "next/image"
import Link from "next/link"

import { CartContext } from "@/utils/cartProvider";
import { UpdateButton } from '@/components/articles/updateButton';
import { removeCart } from "@/utils/cartReducer";

import { useContext, useEffect, useState } from "react"

import Trash from '../../../public/assets/articles/trash.svg'
import SideModal from "../modal";
import { DialogTitle } from "@headlessui/react";
import { formatPrice } from "@/utils/helpFunction";


export default function Card ({bag, setBag}) {
    const { cart } = useContext(CartContext);
    const [command, setCommand] = useState()    
    useEffect(() => {
        if(cart === undefined) return
        setCommand(cart)
    }, [bag, cart])
    

    return(
        <SideModal open={bag} setOpen={setBag}>
        <div className="flex h-full flex-col overflow-y-auto bg-white px-4 py-6 sm:px-6 shadow-xl">
            <div className="flex items-start justify-between">
                <DialogTitle className="text-lg font-medium text-typo">Votre panier</DialogTitle>
                <div className="ml-3 flex h-7 items-center">
                <button type="button" className="relative -m-2 p-2 text-typo" 
                        onClick={() => setBag(false)}>
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
            </div>

            <div className="mt-14 flex-1">
            {!command || command?.length === 0
                ? <p className="text-gray-400">Aucun article.</p>
                : 
                <ul role="list" className="-my-6 divide-y divide-gray-200 great-scrollbar-y">
                    {command?.map((article, index) => <Article key={index} data={article}/>)}
                </ul>
            }
            </div>
            
            {!command || command?.length === 0
                ? ''
                : 
                <div className="border-t border-gray-200 px-4 pt-6 pb-2 mt-6 sm:px-6">
                    <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Sous-total</p>
                            <p className="font-Roboto">{formatPrice(command?.reduce((accumulator, currentValue) =>
                            accumulator + ((currentValue.promo_price ? Number(currentValue.promo_price) : Number(currentValue.price)*Number(currentValue.quantity))), 0
                            ))}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Prix ​​TTC, hors frais de livraison</p>
                        <div className="mt-6">
                            <Link href='/checkout' onClick={() => setBag(false)} className="flex items-center w-full justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm">Continuer</Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                            ou{' '}
                            <Link href="/categories" className="font-medium text-tertiary hover:text-primary" onClick={() => setBag(false)}> Continuer vos achats</Link>
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    </SideModal>
    )
}

export function Article (data) {
    const { dispatch } = useContext(CartContext);
    const [quantityValue, setQuantityValue] = useState(data.data.quantity)
    return(
        <div className="flex flex-col gap-10 w-full md:gap-7">
            <div className='text-xs flex gap-5 items-center w-full'>
                <section className="w-28 h-28 min-h-28 min-w-28 relative md:w-20 md:h-20 md:min-h-20 md:min-w-20">
                   { data.data.picture.url ? 
                   <Image
                        src={data.data.picture.url}
                        alt="Article picture"
                        fill
                        className="rounded-2xl object-cover"
                        />
                    : ''}
                </section>
                <section className='flex flex-col h-full justify-between w-full flex-1 text-secondary md:h-20'>
                        <div className="flex flex-col gap-1 w-full">
                            <h3 className="text-base font-medium text-gray-900 line-clamp-2 overflow-ellipsis">{data?.data?.title}</h3>
                            <h3 className="whitespace-nowrap sm:text-sm ">Référence : {data?.data?.reference ? data?.data?.reference : 0}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                            <p className="font-medium text-lg sm:text-base">{data?.data?.promo_price ? data?.data?.promo_price : data?.data?.price}€</p>
                            { data?.data?.promo_price 
                                ? <p className="text-[#A57A95] font-medium line-through sm:text-sm">{data?.data?.price}€</p>
                                : ''
                            }
                            
                        </div>
                </section>
                <section className='flex flex-col items-end justify-between w-fit h-20 min-h-20'>
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