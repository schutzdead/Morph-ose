import Link from 'next/link'
import Image from 'next/image'
import Facebook from '../../../public/assets/footer/facebook.svg'
import Instagram from '../../../public/assets/footer/instagram.svg'
import { useEffect, useState } from 'react'
import { Skeleton } from '@mui/material'
import { GETRequest } from '@/utils/requestHeader'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Footer () {

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

    console.log(data);

    return (
        <footer className="bg-footer pt-20 pb-14 flex flex-col gap-10 px-5 lg:px-8 md:pt-10 md:pb-6 sm:pt-14 sm:gap-8">
            <div className='grid-cols-[2fr_repeat(5,1fr)] grid gap-10 justify-items-center lg:grid-cols-3 sm:grid-cols-1 lg:gap-y-10 sm:gap-8'>
                <div className="text-gray flex flex-col place-self-center sm:items-center sm:text-center">
                    <h2 className='text-4xl text-white font-Quesha mb-1 xl:text-3xl lg:text-2xl sm:text-xl'>Merveilles de Morph’ose</h2>
                    <p className='max-w-[400px] text-[#9F324799] text-lg lg:text-base sm:text-sm'>Osez l’art de la transformation</p>
                    <div className='flex gap-3 mt-5 lg:mt-3'>
                        <Link href="" target='_blank' className='w-7 h-7 flex items-center justify-center rounded-full bg-[#BF6869]'><Image src={Facebook} alt="Facebook" className='h-3/4' /></Link>
                        <Link href="" target='_blank' className='w-7 h-7 flex items-center justify-center rounded-full bg-white'><Image src={Instagram} alt="Instagram" className='h-[60%]' /></Link>
                    </div>
                </div>
                <div className='text-secondary font-medium flex flex-col'>
                    <h3 className='font-semibold mb-2.5 text-primary lg:text-center sm:text-base'>ACCUEIL</h3>
                    <div className='flex flex-col gap-2 lg:text-center lg:text-sm sm:flex-row sm:gap-5 sm:flex-wrap sm:justify-center'>
                        <Link href='/#headlight'>Nos collections phares</Link>
                        <Link href='/#service'>Nos services</Link>
                        <Link href='/#pro'>Pour les pros</Link>
                        <Link href='/#newsletter'>{`Billets d'humeur`}</Link>
                    </div>
                </div>
                <div className='text-secondary font-medium flex flex-col'>
                    <h3 className='font-semibold mb-2.5 text-primary lg:text-center sm:text-base'>BOUTIQUE</h3>
                    <div className='flex flex-col gap-2 lg:text-center lg:text-sm sm:flex-row sm:gap-5 sm:flex-wrap sm:justify-center'>
                    {data 
                        ? data?.slice(0,4).map(d => <Link key={d.id} href={{pathname: `/categories/${d?.slug}`, query: { cat:d?.id }}}>{d?.title}</Link>)
                        :             
                        <div className="flex flex-col gap-2">
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </div>
                    }
                    </div>
                </div>
                <div className='text-secondary font-medium flex flex-col'>
                    <h3 className='font-semibold mb-2.5 text-primary lg:text-center sm:text-base'>SERVICES</h3>
                    <div className='flex flex-col gap-2 lg:text-center lg:text-sm sm:flex-row sm:gap-5 sm:flex-wrap sm:justify-center'>
                        <Link href='/services'>Evènements & Ateliers</Link>
                        <Link href='/rent'>Proposer vos services</Link>
                    </div>
                </div>
                <div className='text-secondary font-medium flex flex-col'>
                    <h3 className='font-semibold mb-2.5 text-primary lg:text-center sm:text-base'>QUI SOMMES NOUS ?</h3>
                    <div className='flex flex-col gap-2 lg:text-center lg:text-sm sm:flex-row sm:gap-5 sm:flex-wrap sm:justify-center'>
                        <Link href='/about'>Fondatrice</Link>
                        <Link href='/about'>{`L'équipe`}</Link>
                        <Link href='/about'>Nos valeurs</Link>
                        <Link href='/about'>Nos objectifs</Link>
                    </div>
                </div>
                <div className='text-secondary font-medium flex flex-col'>
                    <h3 className='font-semibold mb-2.5 text-primary lg:text-center sm:text-base'>INFORMATIONS</h3>
                    <div className='flex flex-col gap-2 lg:text-center lg:text-sm sm:flex-row sm:gap-5'>
                        <Link href='/politics'>Politique de confidentialité</Link>
                        <Link href='/mentions'>Mentions légales</Link>
                        <Link href='/contact'>Un problème?</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
