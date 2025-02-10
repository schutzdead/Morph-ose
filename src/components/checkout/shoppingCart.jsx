import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router";
import { CartContext } from "@/utils/cartProvider";
import { Loading } from "@/utils/loader";
import { Article } from "../layout/cart";

export function ShoppingCart ({shipping, free}) {
    const { v4: uuidv4 } = require('uuid');
    const { cart } = useContext(CartContext);
    const [command, setCommand] = useState()
    const [shippingFee, setShippingFee] = useState(shipping ? shipping : 0)
    const router = useRouter()

    function subTotal (command) {
        return command?.reduce((accumulator, currentValue) => accumulator + ((currentValue.promo_price ? currentValue.promo_price : currentValue.price) * currentValue.quantity), 0)
    }

    useEffect(() => {
        setShippingFee(shipping ? shipping : 0)
    }, [shipping])

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
        <h1 className="text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center font-Quesha gradient-text lg:hidden">Votre panier</h1>
        {!command
            ? <Loading />
            : 
            <>
                <div className="flex flex-col gap-8 w-full items-center px-5 py-10 sm:pt-0">
                    <div className="gap-1 w-[400px] flex flex-col items-center xl:w-[300px] lg:w-[330px]">
                        <div className="flex w-full justify-between font-semibold text-2xl lg:text-xl sm:text-lg">
                            <p>Sous-total : </p>
                            <p>{subTotal(command).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]}€ TTC</p>
                        </div>
                        <div className="flex w-full items-center justify-between font-medium text-xl lg:text-lg sm:text-base">
                            <p>Frais de livraison : </p>
                            { subTotal(command) > free.value
                            ? <p>Offert</p>
                            : typeof shippingFee === 'number'
                                ?<p>{shippingFee}€</p>
                                :<p className="text-base text-end max-w-[200px]">{shippingFee}</p>
                            }
                            
                        </div>
                        <div className="h-[1px] bg-homeGradient3 w-full my-2"></div>
                        <div className="flex w-full justify-between font-medium text-xl lg:text-lg sm:text-base">
                            <p>Total : </p>
                            <p>{(subTotal(command) + (subTotal(command) > free.value ? 0 : shippingFee)).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]}€ TTC</p>
                        </div>
                    </div>
                </div>
                <div className="w-[400px] overflow-y-auto overflow-x-hidden scrollbar-thumb-gray-300 scrollbar scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded mb-10 self-center flex flex-col xl:w-[350px] lg:w-[500px] lg:mt-5 lg:mb-5 sm:w-[330px]">
                    {command.map((article, index) => <Article key={index} data={article}/>)}
                </div>
            </>
        }
        </>
    )
}