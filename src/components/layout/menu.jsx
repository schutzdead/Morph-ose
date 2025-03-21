import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@mui/material"
import { DialogTitle } from "@headlessui/react"
import SideModal from "../modal"
import { GETRequest } from "@/utils/requestHeader"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const capitalizeFirst = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();


export default function Menu ({menu, setMenu , setHamburger}) {
    const [data, setData] = useState()
    async function fetchCategories() {
        try {
            const getCategories =  await fetch(`${API_URL}/categories/not-full`, GETRequest).then(r => r.json())
            setData(getCategories)
        } catch (err) {
            console.error('Request failed:' + err)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])
    
    const details = useRef(null)
    const [heightDetails, setHeightDetails] = useState()
    const [openDetails, setOpenDetails] = useState(false)

    function close () {
        setHamburger(false);setMenu(false)
    }

    return (
        <SideModal open={menu} setOpen={close}>
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
                
                <nav className="pt-8">
                    <ul className="flex flex-col font-medium w-full divide-y divide-primary text-lg sm:text-base">

                            <div className="flex flex-col py-5">
                                <section className="flex justify-between text-start gap-3 items-center cursor-pointer w-full group" onClick={() => {setHeightDetails(details?.current?.offsetHeight); setOpenDetails(!openDetails)}}>
                                    <p>BOUTIQUE</p>
                                    <div className='flex flex-col justify-between h-4 w-4 min-h-4 min-w-4 relative cursor-pointer lg:w-3 lg:h-3 lg:min-w-3 lg:min-h-3'>
                                        <BlackHamburgerLine animation={openDetails ? {transform:'rotate(180deg)'} : {transform:'rotate(90deg)'}}/>
                                        <BlackHamburgerLine />
                                    </div>
                                </section>
                                <section className="flex justify-start text-start items-start w-full overflow-hidden pr-6 text-lg sm:text-base" style={openDetails ? {maxHeight:`${heightDetails}px`, transition:'all 500ms'} : { maxHeight:0, transition:'all 300ms'}}>
                                    <div ref={details} className="flex flex-col text-end divide-y divide-gray-200 w-full text-base font-normal">
                                        {data?.length > 0 
                                            ? data?.map((cat,index) => <Link key={index} onClick={() => {setHamburger(false);setOpenDetails(false);setMenu(false)}} href={{pathname: `/categories/${cat.slug}`, query: { cat:cat?.id }}} className="py-3">{capitalizeFirst(cat.title)}</Link>)
                                            : <Skeleton variant="rounded" height={100} sx={{ marginTop:"10px" }} />
                                        }
                                    </div>
                                </section>
                            </div>
                        <Link href='/services' onClick={() => {setHamburger(false);setMenu(false)}}>
                            <Tab level1='ATELIERS ET EVENEMENTS'/>
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


// function MainCategory ({data, setHamburger, setMenu}) {
//     const [resetAll, setResetAll] = useState(null)
//     return(
//         <>
//             { 
//             !data ? 
//             <div className="pt-5 flex flex-col gap-5">
//                 <Skeleton />
//                 <div className="ml-5">
//                     <Skeleton variant="rectangular" width={250} height={60} />
//                 </div>
//                 <Skeleton />
//                 <div className="ml-5">
//                     <Skeleton variant="rectangular" width={250} height={60} />
//                 </div>
//                 <div className="w-full bg-menuGradient h-[1px] mt-5"></div>
//             </div>
//             :
//             data?.map(d => 
//                 <NestedTab key={d.id} each_data={d} id={d.id} childs={d?.childs} setHamburger={setHamburger} setMenu={setMenu} setResetAll={setResetAll} resetAll={resetAll} />
//             ) }
//         </>
//     )
// }

// function NestedTab ({id, setHamburger, setMenu, setResetAll, resetAll, childs, each_data}) {
//     const [cross, setCross] = useState(true)
//     const closeBurger = () => {setHamburger(false);setMenu(false)}
//     const [open, setOpen] = useState(false)
//     const [heightDetails, setHeightDetails] = useState()
//     const details = useRef(null)

//     useEffect(() => {
//         childs.length === 0 ? setCross(false) : ''
//         id === resetAll ? setOpen(true) : setOpen(false)
//     }, [childs.length, id, resetAll])

//     return (
//         <div className="flex w-full flex-col mt-5">
//             <div className="flex justify-between items-center cursor-pointer gap-5" onClick={() => {setHeightDetails(details?.current?.offsetHeight); setOpen(!open); setResetAll(id)}}>
//                 <li className="" onClick={(e) => {e.stopPropagation();closeBurger()}}>
//                     <Link href={{pathname: `/categories/${each_data?.slug}`, query: { cat:each_data?.id }}}>{each_data?.title.toUpperCase()}</Link>
//                 </li>
//                 {cross ? 
//                     <Image src={Plus} className="w-4 h-auto transition-all duration-300" style={open ? {transform:'rotate(45deg)'} : {transform:'rotate(0deg)'}} alt='Logo' />
//                     : ''
//                 }
//             </div>
//             <ul className="ml-10 flex flex-col gap-3 overflow-hidden place-self-start h-auto w-auto" style={open ? {maxHeight:`${heightDetails}px`, transition:'all 1s'} : { maxHeight:0, transition:'all 500ms'}}>
//                 <ul ref={details} className="w-full flex flex-col gap-1 py-5">
//                     {childs.map(cat =>
//                         <Link key={cat.id} href={{pathname: `/categories/${each_data?.slug}`, query: { cat:each_data?.id }}} onClick={closeBurger} className="cursor-pointer">
//                             <li>{cat.title}</li>
//                         </Link>
//                     )}
//                 </ul>
//             </ul>
//             <div className="w-full bg-homeGradient3 h-[1px] mt-2"></div>
//         </div>
//     )
// }

function Tab ({level1}) {
    return(
            <div className="flex justify-between items-center cursor-pointer py-5">
                <li className="">{level1}</li>
            </div>
    )
}

export function BlackHamburgerLine ({animation}) {
    return(
    <span className={`bg-primary h-[2px] top-2 w-full absolute transition-all lg:top-[5px]`}
          style={animation}></span>
    )
  }