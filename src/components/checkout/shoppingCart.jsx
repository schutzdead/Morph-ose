import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router";
import { CartContext } from "@/utils/cartProvider";
import { Loading } from "../loader";
import { Article } from "../layout/cart";
import { useTranslation } from 'next-i18next'

export function ShoppingCart () {
    const { t } = useTranslation()   
    const { v4: uuidv4 } = require('uuid');
    const { cart } = useContext(CartContext);
    const [command, setCommand] = useState()
    const [shipping, setShopping] = useState(4)
    const router = useRouter()

    function subTotal (command) {
        return command.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0)
    }

    useEffect(() => {
        if(cart.length === 0) {
            router.push('/')
            return
        }
        if(cart === undefined) return
        setCommand(cart)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    return (
        <>
        <h1 className="text-base mt-10 lg:hidden">{t('checkout.shopping')}</h1>
        {!command
            ? <Loading />
            : 
            <>
                <div className="flex flex-col gap-8 w-full items-center px-5 pt-10 pb-10">
                    <div className="gap-1 w-[400px] flex flex-col items-center xl:w-[300px] lg:w-[330px]">
                        <div className="flex w-full justify-between">
                            <p>{t('checkout.subtotal')} : </p>
                            <p>{subTotal(command)}€</p>
                        </div>
                        <div className="flex w-full justify-between">
                            <p>{t('checkout.shippingCost')} : </p>
                            <p>{shipping}€</p>
                        </div>
                        <div className="h-[1px] bg-secondaryLight w-full my-1"></div>
                        <div className="flex w-full justify-between">
                            <p>{t('checkout.total')} : </p>
                            <p>{subTotal(command) + shipping}€</p>
                        </div>
                    </div>
                </div>
                <div className="w-[400px] overflow-y-scroll scrollbar-thumb-gray-300 scrollbar-thin scrollbar-w-2 mb-10 self-center flex flex-col gap-10 xl:w-[300px] lg:w-[500px] lg:mt-10 lg:mb-5 sm:w-[330px]">
                    {command.map(article => <Article key={uuidv4()} data={article}/>)}
                </div>
            </>
        }
        </>
    )
}