import { useContext, useState } from "react";
import { CartContext } from "@/utils/cartProvider";
import { removeCart } from "@/utils/cartReducer";

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
            {logErr ? <div className="text-sm text-[#d32f2f] text-center">Stock atteint.</div> : ''}
            <div className="z-10 flex items-center gap-0.5 rounded-full bg-[#F5F5F5] px-2 py-2 select-none">
                <div className="cursor-pointer pl-1 pr-2" onClick={() => {updateQuantity(-1), updateCommand(article, -1)}}>-</div>
                <div className="text-center font-semibold">{quantityValue}</div>
                <div className="cursor-pointer pr-1 pl-2" onClick={() => {updateQuantity(1), updateCommand(article, +1)}}>+</div>
            </div>
        </div>
    )
}