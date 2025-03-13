import Link from 'next/link'
import { MenuButton } from '../littleComponents'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Product from '../../../public/assets/dashboard/product.svg'
import Orders from '../../../public/assets/dashboard/orders.svg'
import Category from '../../../public/assets/dashboard/categories.svg'
import Workshop from '../../../public/assets/dashboard/workshop.svg'
import Shipping from '../../../public/assets/dashboard/shipping.svg'
import First from '../../../public/assets/dashboard/first.svg'
import Rent from '../../../public/assets/dashboard/rent.svg'
import Pro from '../../../public/assets/dashboard/pro.svg'
import logout from '../../../public/assets/dashboard/logout.svg'
import Image from 'next/image'

export function Menu () {
    const [active, setActive] = useState("")
    const router = useRouter()
    useEffect(() => {
        if(active === '') setActive(router.asPath.split("/admin/orders")[1])
    },[active, router.asPath])

    return (
        <menu className='h-[100vh] bg-secondary/70 min-w-[320px] shadow-2xl overflow-hidden py-[5vh] flex flex-col px-[20px] fixed top-0 lg:hidden'>
            <div className='mb-10 text-white place-self-center flex flex-col items-center gap-2'>
                <Link href='/admin'>
                    <h1 className='font-bold text-4xl'>ADMIN</h1>
                </Link>
                <h2 className='text-xl text-white font-light'>{`Morph'ose`}</h2>
            </div>
            <div className='flex flex-col gap-2 max-h-[70vh] overflow-y-auto overflow-x-hidden pr-3 scrollbar-thumb-secondary scrollbar-track-secondary/50 scrollbar-thin'>
                <div className='flex flex-col gap-2 border-secondary py-1.5 px-2 border-2 rounded-2xl '>
                    <h2 className='font-semibold text-secondary px-3 -mb-2 text-lg'>Commandes</h2>
                    <MenuButton setActive={setActive} active={active} slug='orders' text="Boutique" image={Orders} link='/admin/orders'/>
                    <MenuButton setActive={setActive} active={active} slug='orders_event' text="Evènements" image={Orders} link='/admin/orders_event'/>
                    {/* <MenuButton setActive={setActive} active={active} slug='pro' text="Professionnelles" image={Pro} link='/admin/pro'/> */}
                </div>
                <div className='flex flex-col gap-2 border-secondary py-1.5 px-2 border-2 rounded-2xl'>
                    <h2 className='font-semibold text-secondary px-3 -mb-2 text-lg'>Créations</h2>
                    <MenuButton setActive={setActive} active={active} slug='categories' text="Catégories" image={Category} link='/admin/categories'/>
                    <MenuButton setActive={setActive} active={active} slug='products' text="Produits" image={Product} link='/admin/products'/>
                    <MenuButton setActive={setActive} active={active} slug='first' text="Produits phares" image={First} link='/admin/first'/>
                    <MenuButton setActive={setActive} active={active} slug='workshops' text="Evènements" image={Workshop} link='/admin/workshops'/>
                    {/* <MenuButton setActive={setActive} active={active} slug='rent' text="Locations" image={Rent} link='/admin/rent'/> */}
                </div>
                <MenuButton setActive={setActive} active={active} slug='shipping' text="Livraison" image={Shipping} link='/admin/shipping'/>
                <Link href='/logout' className="rounded-lg py-2 cursor-pointer text-white flex items-center px-3 gap-7 transition-[backgroundColor] duration-300 hover:bg-secondary">
                      <div className='p-2 bg-white rounded-xl'>
                          <Image src={logout} alt='Log out pictogram' className="w-5 h-auto" priority/>
                      </div>
                      <p className='text-lg'>Déconnexion</p>
                </Link>
            </div>
        </menu>
    )
}