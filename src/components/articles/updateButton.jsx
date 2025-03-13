import { useEffect, useState } from "react";

export function UpdateButton ({quantityValue, setQuantityValue, stock}) {
    const [logErr, setlogErr] = useState(false)

    const updateQuantity = (orientation) => {
        setlogErr(false)
        //STOCK
        if(quantityValue === stock && orientation === 1) return setlogErr(true)
        //LIMIT
        if(quantityValue === 1 && orientation === -1) return setQuantityValue(quantityValue);
        if(quantityValue === stock && orientation === 1) return setQuantityValue(quantityValue);
        setQuantityValue(quantityValue + orientation);
    }

    useEffect(() => {
        setlogErr(false)
    }, [stock])

    return (
        <div className="flex flex-col items-start">
            {logErr ? <div className="text-sm text-[#d32f2f] font-medium text-center">Stock atteint.</div> : ''}
            <div className="z-10 flex items-center gap-0.5 rounded-full bg-primary/20 px-1 py-1 select-none">
                <div className="cursor-pointer px-3 font-medium text-2xl" onClick={() => {updateQuantity(-1)}}>-</div>
                <div className="text-center font-semibold text-lg font-Roboto">{quantityValue}</div>
                <div className="cursor-pointer px-3 font-medium text-2xl" onClick={() => {updateQuantity(1)}}>+</div>
            </div>
        </div>
    )
}