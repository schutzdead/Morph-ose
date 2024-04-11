import { useContext } from "react";
import { CartContext } from "@/utils/cartProvider";
import { removeCart } from "@/utils/cartReducer";

export function UpdateButton ({quantityValue, setQuantityValue, updateFct, article}) {
    const { dispatch } = useContext(CartContext);

    const updateQuantity = (orientation) => {
        if(quantityValue === 1 && orientation === -1) return setQuantityValue(quantityValue);
        if(quantityValue === 20 && orientation === 1) return setQuantityValue(quantityValue);
        setQuantityValue(quantityValue + orientation);
    }

    const updateCommand = (article, orientation) => {
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
        <div className="z-[20] flex items-center gap-0.5 rounded-full bg-[#F5F5F5] px-2 py-2 select-none">
            <div className="cursor-pointer pl-1 pr-2" onClick={() => {updateQuantity(-1), updateCommand(article, -1)}}>-</div>
            <div className="text-center font-semibold">{quantityValue}</div>
            <div className="cursor-pointer pr-1 pl-2" onClick={() => {updateQuantity(1), updateCommand(article, +1)}}>+</div>
        </div>
    )
}