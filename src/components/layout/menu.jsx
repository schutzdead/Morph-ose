import { useEffect, useRef, useState } from "react"
import Plus from '../../../public/assets/header/plus.svg'
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@mui/material"
import { DialogTitle } from "@headlessui/react"
import SideModal from "../modal"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Menu ({menu, setMenu , setHamburger}) {
    return (
        <SideModal open={menu} setOpen={setMenu}>
            <div className="flex h-full flex-col overflow-y-auto great-scrollbar-y bg-white px-8 py-6 shadow-xl">
                <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-primary">Menu</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                    <button type="button" className="relative -m-2 p-2 text-primary" 
                            onClick={() => {setHamburger(false);setMenu(false)}}>
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    </div>
                </div>
                
                <nav className="pt-3">
                    <ul className="flex flex-col font-medium w-full divide-y text-lg sm:text-base">
                        <Link href='/categories' onClick={() => {setHamburger(false);setMenu(false)}}>
                            <Tab level1='BOUTIQUE'/>
                        </Link>
                        <Link href='/services' onClick={() => {setHamburger(false);setMenu(false)}}>
                            <Tab level1='NOS SERVICES'/>
                        </Link>
                        <Link href='/seances' onClick={() => {setHamburger(false);setMenu(false)}}>
                            <Tab level1='SEANCES INDIVIDUELLES'/>
                        </Link>
                        {/* <Link href='/rent' onClick={() => {setHamburger(false);setMenu(false)}}>
                            <Tab level1='LOCATIONS PROFESSIONNELLES'/>
                        </Link> */}
                        <Link href='/about' onClick={() => {setHamburger(false);setMenu(false)}}>
                            <Tab level1='A PROPOS'/>
                        </Link>
                        <Link href='/client' onClick={() => {setHamburger(false);setMenu(false)}}>
                            <Tab level1='COMPTE CLIENT'/>
                        </Link>
                        <Link href='/contact' onClick={() => {setHamburger(false);setMenu(false)}}>
                            <Tab level1='CONTACT'/>
                        </Link>
                    </ul>
                </nav>
                </div>
    </SideModal>
    )
}


function MainCategory ({data, setHamburger, setMenu}) {
    const [resetAll, setResetAll] = useState(null)
    return(
        <>
            { 
            !data ? 
            <div className="pt-5 flex flex-col gap-5">
                <Skeleton />
                <div className="ml-5">
                    <Skeleton variant="rectangular" width={250} height={60} />
                </div>
                <Skeleton />
                <div className="ml-5">
                    <Skeleton variant="rectangular" width={250} height={60} />
                </div>
                <div className="w-full bg-menuGradient h-[1px] mt-5"></div>
            </div>
            :
            data?.map(d => 
                <NestedTab key={d.id} each_data={d} id={d.id} childs={d?.childs} setHamburger={setHamburger} setMenu={setMenu} setResetAll={setResetAll} resetAll={resetAll} />
            ) }
        </>
    )
}

function NestedTab ({id, setHamburger, setMenu, setResetAll, resetAll, childs, each_data}) {
    const [cross, setCross] = useState(true)
    const closeBurger = () => {setHamburger(false);setMenu(false)}
    const [open, setOpen] = useState(false)
    const [heightDetails, setHeightDetails] = useState()
    const details = useRef(null)

    useEffect(() => {
        childs.length === 0 ? setCross(false) : ''
        id === resetAll ? setOpen(true) : setOpen(false)
    }, [childs.length, id, resetAll])

    return (
        <div className="flex w-full flex-col mt-5">
            <div className="flex justify-between items-center cursor-pointer gap-5" onClick={() => {setHeightDetails(details?.current?.offsetHeight); setOpen(!open); setResetAll(id)}}>
                <li className="" onClick={(e) => {e.stopPropagation();closeBurger()}}>
                    <Link href={{pathname: `/categories/${each_data?.slug}`, query: { cat:each_data?.id }}}>{each_data?.title.toUpperCase()}</Link>
                </li>
                {cross ? 
                    <Image src={Plus} className="w-4 h-auto transition-all duration-300" style={open ? {transform:'rotate(45deg)'} : {transform:'rotate(0deg)'}} alt='Logo' />
                    : ''
                }
            </div>
            <ul className="ml-10 flex flex-col gap-3 overflow-hidden place-self-start h-auto w-auto" style={open ? {maxHeight:`${heightDetails}px`, transition:'all 1s'} : { maxHeight:0, transition:'all 500ms'}}>
                <ul ref={details} className="w-full flex flex-col gap-1 py-5">
                    {childs.map(cat =>
                        <Link key={cat.id} href={{pathname: `/categories/${each_data?.slug}`, query: { cat:each_data?.id }}} onClick={closeBurger} className="cursor-pointer">
                            <li>{cat.title}</li>
                        </Link>
                    )}
                </ul>
            </ul>
            <div className="w-full bg-homeGradient3 h-[1px] mt-2"></div>
        </div>
    )
}

function Tab ({level1}) {
    return(
        <>
            <div className="flex justify-between items-center cursor-pointer mt-5">
                <li className="">{level1}</li>
            </div>
            <div className="w-full bg-homeGradient3 h-[1px] mt-2"></div>
        </>
    )
}