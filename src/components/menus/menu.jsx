import Link from 'next/link'
import { MenuButton } from '../littleComponents'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Product from '../../../public/assets/dashboard/product.svg'
import Category from '../../../public/assets/dashboard/categories.svg'
import logout from '../../../public/assets/dashboard/logout.svg'
import Image from 'next/image'

export function Menu () {
    const [active, setActive] = useState("")
    const router = useRouter()
    useEffect(() => {
        if(active === '') setActive(router.asPath.split("/admin/")[1])
    },[active, router.asPath])

    return (
        <menu className='h-[100vh] bg-secondary/70 min-w-[320px] shadow-2xl overflow-hidden py-[5vh] flex flex-col px-[20px] fixed top-0 lg:hidden'>
            <div className='mb-10 text-white place-self-center flex flex-col items-center gap-2'>
                <Link href='/admin'>
                    <h1 className='font-bold text-4xl'>ADMIN</h1>
                </Link>
                <h2 className='text-xl text-white font-light'>{`Morph'ose`}</h2>
            </div>
            <div className='flex flex-col gap-2 max-h-[540px] overflow-y-auto'>
                <MenuButton setActive={setActive} active={active} slug='products' text="Produits" image={Product} link='/admin/products'/>
                <MenuButton setActive={setActive} active={active} slug='categories' text="Catégories" image={Category} link='/admin/categories'/>
                <Link href='/logout' className="rounded-lg py-3 cursor-pointer text-white flex items-center px-4 gap-7 transition-[backgroundColor] duration-300 hover:bg-secondary">
                      <div className='p-2 bg-white rounded-lg'>
                          <Image src={logout} alt='Log out pictogram' className="w-5 h-auto" priority/>
                      </div>
                      <p className='text-lg'>Déconnexion</p>
                </Link>
            </div>
        </menu>
    )
}