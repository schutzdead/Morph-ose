import { useEffect, useRef, useState } from "react"
import Plus from '../../../public/assets/header/plus.svg'
import Image from "next/image"
import Link from "next/link"
import { unlock } from "@/utils/lockScreen"
import { GETRequest } from "@/utils/requestHeader"
import Close from '../../../public/assets/close.svg'
import { Skeleton } from "@mui/material"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Menu ({menu, setMenu , setHamburger}) {

    const [data, setData] = useState()
    async function fetchCategories() {
		try {
            const getCategories =  await fetch(`${API_URL}/categories`, GETRequest).then(r => r.json())
            setData(getCategories)
		} catch (err) {
			console.error('Request failed:' + err)
		}
	}

    useEffect(() => {
        fetchCategories()
    }, [])
    return (
        <>
                <div className="fixed w-full h-full left-0 top-0 z-40 bg-black/60 cursor-pointer"
                style={menu ? {opacity:1, transition:'opacity 1s'} : {opacity:0, zIndex:-10}} onClick={() => {setMenu(false);unlock();setHamburger(false)}}></div>
                <menu className="fixed pl-10 pr-10 h-full top-0 bg-white z-50 py-16 flex-col items-center sm:w-full sm:pr-10 md:py-10" style={menu ? {left:"0%", transition:'left 400ms ease-out'} : {left:"-100%"}}>
                <Image src={Close} onClick={() => {setMenu(false);unlock();setHamburger(false)}} alt="Close pictogram" className='w-8 cursor-pointer self-start'/>
                <div className="overflow-y-auto overflow-x-hidden px-5 pt-10 md:pt-5">
                    <ul className="flex flex-col min-w-[250px] overflow-y-auto overflow-x-hidden scrollbar-thumb-gray-300 scrollbar-thin scrollbar-w-2 max-h-[65vh] tracking-wide w-full pt-10 pr-5 font-semibold sm:text-sm md:pt-5">
                        <Link href='/categories' onClick={() => {setHamburger(false);setMenu(false);unlock()}}>
                            <Tab level1='BOUTIQUE'/>
                        </Link>
                        <Link href='/services' onClick={() => {setHamburger(false);setMenu(false);unlock()}}>
                            <Tab level1='NOS SERVICES'/>
                        </Link>
                        <Link href='/seances' onClick={() => {setHamburger(false);setMenu(false);unlock()}}>
                            <Tab level1='SEANCES PERSONNALISEES'/>
                        </Link>
                        <Link href='/rent' onClick={() => {setHamburger(false);setMenu(false);unlock()}}>
                            <Tab level1='LOCATIONS PROFESSIONNELLES'/>
                        </Link>
                        <Link href='/about' onClick={() => {setHamburger(false);setMenu(false);unlock()}}>
                            <Tab level1='A PROPOS'/>
                        </Link>
                        <Link href='/client' onClick={() => {setHamburger(false);setMenu(false);unlock()}}>
                            <Tab level1='COMPTE CLIENT'/>
                        </Link>
                        <Link href='/contact' onClick={() => {setHamburger(false);setMenu(false);unlock()}}>
                            <Tab level1='CONTACT'/>
                        </Link>
                    </ul>
                </div>
            </menu>
        </>
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
    const closeBurger = () => {setHamburger(false);setMenu(false);unlock()}
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
                <li className="" onClick={(e) => {e.stopPropagation();unlock();closeBurger()}}>
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