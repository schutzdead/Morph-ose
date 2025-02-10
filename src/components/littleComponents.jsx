import Image from 'next/image'
import Link from 'next/link'
import leftArrow from '../../public/assets/dashboard/left_arrow.svg'
import delete_icon from '../../public/assets/dashboard/delete.svg'
import { DeleteCard } from './deleteCard'
import { useState } from 'react'
import { lock } from '@/utils/lockScreen'

export function H2Title ({title}) {
    return (
        <h2 className="text-xl text-secondary font-bold mt-5 xl:text-lg sm:text-base col-span-4 place-self-start xl:col-span-3 sm:col-span-2 2sm:col-span-1">{title}</h2>
    )
}

export function PictoButton ({image, linkTo}) {
    return(
        <Link href={linkTo} className='rounded flex items-center justify-center cursor-pointer bg-secondary transition-all duration-300 h-10 w-10 min-w-10 min-h-10 sm:min-h-8 sm:h-8 sm:w-8 sm:min-w-8'>
            <Image src={image} className='w-6 h-auto sm:w-5' alt='Edit profil pictogram' />
        </Link>
    )
}

export function DashboardTitle ({text, image}) {
    return (
        <div className='py-3 text-secondary font-bold flex justify-start items-center px-4 absolute top-5 right-10 lg:py-0 lg:right-7'>
            <div className='p-2 bg-transparent rounded-[10px] lg:p-1'>
                <Image
                    src={image}
                    alt="category icon"
                    className="w-7 h-auto lg:w-6"
                    priority />
            </div>
            <p className='text-[26px] lg:text-lg'>{text}</p>
        </div>
    )
}

export function MenuButton ({text, image, active, slug, setActive, link}) {
    const escapeRegExpMatch = function(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };
    const isExactMatch = (str, match) => {
      return new RegExp(`\\b${escapeRegExpMatch(match)}\\b`).test(str)
    }
    
    return (
        <Link href={link} className='rounded-lg py-2 cursor-pointer text-white flex justify-start items-center px-3 gap-4 transition-[backgroundColor] duration-300 hover:bg-secondary'
                onClick={() => {setActive('');setActive(slug)}}
                style={isExactMatch(active, slug) ? {backgroundColor:'#582D3E' } : {}}>
            <div className='p-2 bg-white rounded-xl'>
                <Image
                    src={image}
                    alt="category icon"
                    className="w-5 h-auto"
                    priority />
            </div>
            <p className='text-lg'>{text}</p>
        </Link>
    )
}

export function DeleteButton ({api, id, setLoading, backLink, text=''}) {
    const [deleteCard, setDeleteCard] = useState(false)
    return(
        <>
            <DeleteCard deleteCard={deleteCard} setDeleteCard={setDeleteCard} api={api} id={id} setLoading={setLoading} backLink={backLink} />
            <button onClick={() => {window?.scrollTo({top:0}); setDeleteCard(true); lock()}} className='rounded flex items-center justify-center cursor-pointer bg-red-500 hover:bg-red-700 transition-all duration-300 h-10 w-10 min-w-10 min-h-10 sm:min-h-8 sm:h-8 sm:w-8 sm:min-w-8'>
                <Image src={delete_icon} className='w-6 h-auto' alt='Edit profil pictogram' />
            </button>
        </>
    )
}

export function Back ({title, linkTo}) {
    return(
        <Link href={linkTo} className='rounded flex items-center gap-1 place-self-start mb-5 cursor-pointer z-10 text-white pl-1 pr-3 py-2 text-sm bg-secondary  sm:py-1.5 sm:gap-0 sm:pl-0 sm:pr-2 sm:font-medium'>
            <Image src={leftArrow} className='w-6 h-auto sm:w-4' alt='Left chevron pictogram' />
            <p className='pb-[2px]'>{title}</p>
        </Link>
    )
}