import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router";
import { CartContext } from "@/utils/cartProvider";
import { Loading } from "@/utils/loader";
import { Article } from "../layout/cart";

export function ShoppingCart () {
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
        <h1 className="text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center font-Quesha gradient-text lg:hidden">Votre panier</h1>
        {!command
            ? <Loading />
            : 
            <>
                <div className="flex flex-col gap-8 w-full items-center px-5 py-10 sm:pt-0">
                    <div className="gap-1 w-[400px] flex flex-col items-center xl:w-[300px] lg:w-[330px]">
                        <div className="flex w-full justify-between font-semibold text-2xl lg:text-xl sm:text-lg">
                            <p>Sous-total : </p>
                            <p>{subTotal(command)}€</p>
                        </div>
                        <div className="flex w-full justify-between font-medium text-xl lg:text-lg sm:text-base">
                            <p>Frais de livraison : </p>
                            <p>{shipping}€</p>
                        </div>
                        <div className="h-[1px] bg-homeGradient3 w-full my-2"></div>
                        <div className="flex w-full justify-between font-medium text-xl lg:text-lg sm:text-base">
                            <p>Total : </p>
                            <p>{subTotal(command) + shipping}€</p>
                        </div>
                    </div>
                </div>
                <div className="w-[400px] overflow-y-auto scrollbar-thumb-gray-300 scrollbar scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded mb-10 self-center flex flex-col xl:w-[300px] lg:w-[500px] lg:mt-5 lg:mb-5 sm:w-[330px]">
                    {command.map(article => <Article key={uuidv4()} data={article}/>)}
                </div>
            </>
        }
        </>
    )
}