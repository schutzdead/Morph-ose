import Image from "next/image"
import Link from "next/link"

import { CartContext } from "@/utils/cartProvider";
// import { UpdateButton } from '@/components/articles/updateButton';
import { removeCart } from "@/utils/cartReducer";

import { useContext, useEffect, useState } from "react"

import Trash from '../../../public/assets/articles/trash.svg'
import SideModal from "../modal";
import { DialogTitle } from "@headlessui/react";
import { formatPrice } from "@/utils/helpFunction";
import add from '../../../public/assets/essentials-icons/add.svg'
import less from '../../../public/assets/essentials-icons/less.svg'

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
    const { cart } = useContext(CartContext);
    return(
        <li className='flex py-6 gap-3'>
            <div className="flex flex-col gap-2">
                <div className="flex-shrink-0 overflow-hidden rounded-md w-24 h-24 min-h-24 min-w-24 relative md:w-20 md:h-20 md:min-h-20 md:min-w-20">
                {data?.data?.picture
                    ? <Image src={data.data.picture.url} width={100} height={100} className='h-full w-full object-cover' alt='Image produit' />
                    : ""
                }
                </div>
            </div>
            <div className='ml-4 flex flex-1 flex-col'>
                <div className="flex-1 flex">
                    <div className="flex-1 text-sm text-gray-500">
                        <h3 className=" text-base font-medium text-gray-900">
                            <Link href="/" className=" line-clamp-2 overflow-ellipsis">{data?.data?.title}</Link>
                        </h3>
                        <div className="flex flex-col text-sm">
                            <p>Référence : {data?.data?.reference ? data?.data?.reference : 0}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end h-24 pl-3 sm:h-20 justify-between">
                        <div className="flex items-center gap-2 text-primary">
                            <p className="font-medium text-lg sm:text-base">{data?.data?.promo_price ? data?.data?.promo_price : data?.data?.price}€</p>
                            { data?.data?.promo_price 
                                ? <p className="text-[#A57A95] font-medium line-through sm:text-sm">{data?.data?.price}€</p>
                                : ''
                            }
                            
                        </div>
                        <UpdateButton product={data.data} cart={cart} />
                    </div>
                </div>
            </div>
        </li>
    )
}

export function UpdateButton ({product, cart}) {
    const { dispatch } = useContext(CartContext);

    const [stockErr, setStockErr] = useState(false)
    const [buttonQuantity, setButtonQuantity] = useState(0)
    const [cartArticle, setCartArticle] = useState([])
    const [stockFromCart, setStockFromCart] = useState(0)

    useEffect(() => {
        const currentProductFromCart = cart?.filter(cartArt => cartArt.id === product.id)
        if(currentProductFromCart?.length > 0) {
            setStockFromCart(product?.stock - currentProductFromCart?.map(art => art.quantity).reduce((acc, current) => acc + current, 0))
        }
    }, [cart, product])    

    useEffect(() => {
        setCartArticle(cart?.filter(art => art?.id === product?.id))
    }, [cart, product])

    useEffect(() => {
        if(cartArticle && cartArticle?.length > 0) {
            setButtonQuantity(cartArticle?.reduce((accumulator, currentValue) => accumulator + (currentValue.quantity), 0))
        } else {
            setButtonQuantity(0)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartArticle])

    const updateCommand = (article, orientation) => {
        setStockErr(false)
        //STOCK
        if(stockFromCart === 0 && orientation === 1) return setStockErr(true)
        //LIMIT
        if(buttonQuantity === 0 && orientation === -1) return setButtonQuantity(buttonQuantity);
        if(buttonQuantity === 1 && orientation === -1) {
            dispatch(removeCart(article))
            return
        }
        dispatch({ 
            type:'UPDATE_CART', 
            id:article.id, 
            price:article?.price,
            quantity:buttonQuantity+orientation,
            custom:article?.custom ? article?.custom : [{key:""}]
        })
    }

    return (
        <CartButton quantity={buttonQuantity} product={product} updateCommand={updateCommand} stockErr={stockErr} />
    )
}

function CartButton ({quantity, product, updateCommand, stockErr}) {
    return (
        <div className="flex flex-col">
            <div className="z-10 flex justify-evenly items-center rounded-lg text-white select-none">
                <button type="button" className="w-[26px] h-[26px] bg-primary/20 rounded-md flex items-center justify-center cursor-pointer" onClick={() => {updateCommand(product, -1)}}>
                    <Image src={less} alt="Less icon" className="mb-[2px] w-2 cursor-pointer flex items-center justify-center" />
                </button>
                <div className="font-Roboto px-2 flex items-center justify-center text-base font-medium md:text-sm text-black/90">{quantity}</div>
                <button type="button" disabled={stockErr} className="w-[26px] h-[26px] bg-primary/20 rounded-md flex items-center justify-center cursor-pointer disabled:bg-gray-200 disabled:text-black/90" onClick={() => {updateCommand(product, +1)}}>
                    <Image src={add} alt="More icon" className="w-3 cursor-pointer" />
                </button>
            </div>
        </div>
    )
}