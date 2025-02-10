import { useContext, useState } from "react";
import { CartContext } from "@/utils/cartProvider";
import { removeCart } from "@/utils/cartReducer";
import Image from "next/image";
import add from '../../../public/assets/essentials-icons/add.svg'
import less from '../../../public/assets/essentials-icons/less.svg'


export function UpdateButton ({quantityValue, setQuantityValue, updateFct, article, product}) {
    const { cart, dispatch } = useContext(CartContext);
    const [logErr, setlogErr] = useState(false)

    const updateQuantity = (orientation) => {
        setlogErr(false)
        //STOCK
        if(quantityValue === product?.stock && orientation === 1) return setlogErr(true)
        if(quantityValue === article?.stock && orientation === 1) return setlogErr(true)
        //LIMIT
        if(quantityValue === 1 && orientation === -1) return setQuantityValue(quantityValue);
        if(quantityValue === 20 && orientation === 1) return setQuantityValue(quantityValue);
        setQuantityValue(quantityValue + orientation);
    }

    const updateCommand = (article, orientation) => {
        setlogErr(false)
        if(quantityValue === product?.stock && orientation === 1) return setlogErr(true)
        if(quantityValue === article?.stock && orientation === 1) return setlogErr(true)
        if(!updateFct) return
        if(article.quantity === 1 && orientation === -1) return dispatch(removeCart(article))
        dispatch({
            type: 'UPDATE_CART',
            id:article.id,
            size:article.size,
            quantity:quantityValue+orientation
        })
    }

    return (
        <div className="flex flex-col items-center">
            <div className="z-10 flex justify-evenly items-center rounded-lg text-white select-none">
                <button type="button" className="w-[26px] h-[26px] bg-primary/50 rounded-md flex items-center justify-center cursor-pointer" onClick={() => {updateQuantity(-1), updateCommand(article, -1)}}>
                    <Image src={less} alt="Less icon" className="mb-[2px] w-2 cursor-pointer flex items-center justify-center" />
                </button>
                <div className="font-Roboto px-2 flex items-center justify-center text-base font-medium md:text-sm text-black/90">{quantityValue}</div>
                <button type="button" disabled={logErr} className="w-[26px] h-[26px] bg-primary/50 rounded-md flex items-center justify-center cursor-pointer disabled:bg-gray-200 disabled:text-black/90" onClick={() => {updateQuantity(1), updateCommand(article, +1)}}>
                    <Image src={add} alt="More icon" className="w-3 cursor-pointer" />
                </button>
            </div>
        </div>
    )
}