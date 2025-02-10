import Image from "next/image";
import logo from '../../../public/assets/header/logo_no_text.webp'
import load from '../../../public/assets/loading2.svg'

export function Loader ({size="120px"}) {
    return(
        <Image src={logo} className="h-auto animate-spin" style={{width:size}} alt="Loading" priority />
    )
}

export function CircleLoader ({size="20px"}) {
    return(
        <Image src={load} className="h-auto" style={{width:size}} alt="Loading" priority />
    )
}