import { useEffect, useState } from "react"
import Plus from '../../../public/assets/header/plus.svg'
import Image from "next/image"
import Link from "next/link"
import { unlock } from "@/utils/lockScreen"
import { GETRequest } from "@/utils/requestHeader"
import Close from '../../../public/assets/close.svg'
import { Skeleton } from "@mui/material"

export default function Menu ({menu, setMenu , setHamburger}) {

    const [data, setData] = useState()
    async function fetchImages() {
		try {
            const response = await fetch(`https://api.bat-n3.darianne.fr/categories`, GETRequest).then(t => t.json()) 
            setData(response)
		} catch (err) {
			console.error('Request failed:' + err)
		}
	}

    useEffect(() => {
        fetchImages()
    }, [])

    return (
        <>
            <div className="fixed w-full h-full hidden left-0 top-0 z-30 bg-black/80 cursor-pointer"
                    style={menu ? {opacity:1, transition:'opacity 1s'} : {opacity:0, zIndex:-10}} onClick={() => {setMenu(false);unlock();setHamburger(false)}}></div>

                <menu className="fixed hidden pl-10 pr-10 h-full top-0 bg-white z-40 py-16 flex-col items-center sm:w-full sm:pr-10 md:py-10"
                style={menu ? {left:0, transition:'left 400ms ease-out'} : {left:"-100%"}}>
                <Image src={Close} onClick={() => {setMenu(false);unlock();setHamburger(false)}} alt="Close pictogram" className='w-8 cursor-pointer self-start'/>
                <div className="overflow-y-auto overflow-x-hidden px-10 pt-10 md:pt-5">
                    <ul className="flex flex-col text-sm font-Helvetica font-extralight tracking-wide w-full pt-10 md:pt-5">
                        <MainCategory data={data} setHamburger={setHamburger} setMenu={setMenu}/>
                        <Link href='/account/' onClick={() => {setHamburger(false);setMenu(false);unlock()}}>
                            <Tab level1='COMPTE PRO'/>
                        </Link>
                        <Link href='/account/' onClick={() => {setHamburger(false);setMenu(false);unlock()}}>
                            <Tab level1='COMPTE CLIENT'/>
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
                <div className="w-full bg-secondaryDark/50 h-[1px] mt-5"></div>
            </div>
            :
            data?.map(d => 
                <NestedTab key={d.id} id={d.id} title={d} childs={d?.childs} setHamburger={setHamburger} setMenu={setMenu} setResetAll={setResetAll} resetAll={resetAll} />
            ) }
        </>
    )
}

function NestedTab ({id, setHamburger, setMenu, setResetAll, resetAll, title, childs}) {
    const [cross, setCross] = useState(true)
    const closeBurger = () => {setHamburger(false);setMenu(false);unlock()}
    const [open, setOpen] = useState(false)
    useEffect(() => {
        childs.length === 0 ? setCross(false) : ''
        id === resetAll ? setOpen(true) : setOpen(false)
    }, [childs.length, id, resetAll])

    return (
        <>
            <div className="flex justify-between items-center cursor-pointer pt-5 gap-5" onClick={() => {setOpen(!open), setResetAll(id)}}>
                <li className="font-Helvetica font-extralight" onClick={(e) => {e.stopPropagation();unlock();closeBurger()}}>
                    <Link href="/[sections]" as={`/${title?.slug}`}>{title?.title.toUpperCase()}</Link>
                </li>
                {cross ? 
                    <Image src={Plus} className="w-4 h-auto transition-all duration-300" style={open ? {transform:'rotate(45deg)'} : {transform:'rotate(0deg)'}} alt='Logo' />
                    : ''
                }
            </div>
            <ul className="ml-10 flex flex-col gap-3 overflow-hidden place-self-start h-auto w-auto mb-5"
                style={open ? {maxHeight:'400px', transition:'all 1.5s'} : { maxHeight:0}}
                >
                {childs.map(cat => 
                    <ul key={cat.id} className="cursor-pointer w-full flex flex-col gap-2 mt-5" onClick={closeBurger}>
                        <Link href="/[sections]/[categories]" as={`/${title?.slug}/${cat?.slug}`}>{cat.title.toUpperCase()}</Link>
                        {cat.childs.map(subCat =>
                            <li key={subCat.id} className="ml-10 flex flex-col gap-2 cursor-pointer h-full" onClick={closeBurger}>
                                <Link href="/[sections]/[categories]/[subCategories]" as={`/${title?.slug}/${cat?.slug}/${subCat.slug}`}>{subCat?.title.toUpperCase()}</Link>
                            </li>
                        )}
                    </ul>
                )}
            </ul>
            <div className="w-full bg-secondaryDark/50 h-[1px]"></div>
        </>
    )
}

function Tab ({level1}) {
    return(
        <>
            <div className="flex justify-between items-center cursor-pointer py-5 gap-5">
                <li className="font-Helvetica font-extralight">{level1}</li>
            </div>
            <div className="w-full bg-secondaryDark/50 h-[1px]"></div>
        </>
    )
}