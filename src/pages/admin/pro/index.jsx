import Image from 'next/image'
import pro_icon from '../../../../public/assets/dashboard/pro.svg'
import edit2 from '../../../../public/assets/dashboard/details.svg'
import check from "../../../../public/assets/thanks/check.svg"
import close from "../../../../public/assets/header/close.svg"

import Link from 'next/link'
import { GETRequest, GETTokenRequest, POSTRequest } from "@/utils/requestHeader"
import {  useState } from 'react'
import { Loading } from '@/utils/loader'
import { NoIndexHead } from '@/utils/customHead'

import { BlackHamburger } from '@/components/menus/burgerMenu'
import BurgerMenu from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle } from '@/components/littleComponents'
import { Menu } from '@/components/menus/menu'
import { CircularLoading } from '@/utils/loader'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getServerSideProps({req, res}) {
  const Cookies = require('cookies')
  const cookies = new Cookies(req, res)
  const authToken = cookies.get('auth-token') || ''

  const response = await fetch(`${API_URL}/auth/users/current`, {
    method:'GET',
    mode: "cors",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }
  })
  const person = await response.json()
  if(response.status !== 200 || !person.is_admin) {
    return { 
      redirect: {
        destination: '/admin',
        permanent: false,
      },
  }}

  const result = await fetch(`${API_URL}/auth/admin/orders`, GETTokenRequest(authToken)).then(r => r.json())
  return {
      props: {
          all_orders:result?.filter(r => r.workshops?.length === 0).filter(r => r.items?.length === 0)
      }
  }
}

export default function ProOrders({all_orders}) {
  const [orders, setProducts] = useState(all_orders)
  const [menu, setMenu] = useState(false)
  const [hamburger, setHamburger] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function confirmation (choice, rendID) {
    setLoading(true);setError(false);
    try {
      const seance = await fetch(`/api/proxy/auth/admin/orders/${rendID}`, {
        method: "POST",    
        mode: "cors",
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          is_checked: choice
        })
    })
      if(seance.status === 200) {
        const result = await fetch(`/api/proxy/auth/admin/orders`, GETRequest).then(r => r.json())
        setProducts(result?.filter(r => r.workshops?.length === 0).filter(r => r.items?.length === 0))
        setLoading(false)
        return
      }
      setLoading(false);setError(true)
    } catch (err) {
      setLoading(false);setError(true);
      console.error('Request failed:' + err)
    }
  }
  return (
    <>
    <NoIndexHead />
    <main className='w-[100vw] bg-cover bg-center flex'>
        <Menu />
        <BurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
        <section className='w-full min-h-[100vh] px-5 py-28 ml-[320px] lg:ml-0 lg:px-2 lg:py-20'>
          <DashboardTitle text='Commandes Pro' image={pro_icon}/>
          <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
              <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
          </div>
          <div className='flex flex-col bg-white shadow-dashboard w-full rounded-xl py-10 px-5 xl:py-5 lg:px-2 lg:py-2 sm:shadow-none'>
            {orders?.length === 0 || !orders 
            ? <p className='font-medium place-self-center text-secondary text-center sm:text-sm'>Aucune commande</p>
            : <>
            {loading ? <Loading />
            : <>
                {error ? <div className='text-red-500 place-self-center'>{`Une erreur est survenue, ressayez plus tard.`}</div>: ''}
                <div className='grid text-secondary py-5 font-bold text-base items-center justify-items-center text-center rounded-xl overflow-hidden grid-cols-[repeat(4,2fr)_1fr] xl:text-sm sm:grid-cols-[repeat(3,2fr)_1fr] sm:text-xs'>
                    <p>Numéro</p>
                    <p className='sm:hidden'>Status</p>
                    <p>Date</p>
                    <p>Validation</p>
                </div>
                {
                  orders?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((order) =>
                    <div key={order.id} className='grid grid-cols-[repeat(4,2fr)_1fr] py-3 rounded-lg text-secondary/90 justify-items-center items-center sm:grid-cols-[repeat(3,2fr)_1fr] sm:text-sm' style={orders?.indexOf(order)%2 === 0 ? {backgroundColor:'#F5F5F5'} : {backgroundColor:"white"}}>
                      <p className='px-4 text-center'>{order?.room_rental_reservation?.id}</p>
                      <p className="text-center sm:hidden">{`${order?.status}`}</p>
                      <div className='flex flex-col items-center font-bold sm:text-xs'>
                        <p>{new Date(order.room_rental_reservation?.room_rental?.date).toLocaleDateString('fr')}</p>
                      </div>
                      { order?.is_checked !== null
                          ? order?.is_checked 
                            ? <div className='bg-green-500 w-7 h-7 rounded-full flex items-center justify-center'>
                                <Image src={check} alt="check icon" />
                              </div>
                            : <div className='bg-red-400 w-7 h-7 rounded-full flex items-center justify-center'>
                                <Image src={close} alt="close icon" />
                              </div>
                          : <div className='flex gap-4 sm:gap-2'>
                              <div className='bg-gray-400/70 w-7 h-7 rounded-md flex items-center justify-center hover:bg-green-500 transition-all duration-500 cursor-pointer' onClick={() => {confirmation(true, order?.id)}}>
                                <Image src={check} alt="check icon" priority />
                              </div>
                              <div className='bg-gray-400/70 w-7 h-7 rounded-md flex items-center justify-center hover:bg-red-400 transition-all duration-500 cursor-pointer' onClick={() => {confirmation(false, order?.id)}}>
                                <Image src={close} alt="close icon" priority />
                              </div>
                            </div>
                      }
                      <Link href={`/admin/pro/${order?.id}`}>
                        <button className='group flex gap-1 w-[40px] items-center text-white py-1 justify-center'>
                          <Image src={edit2} alt="details icon" className="group-hover:scale-[1.18] transition-all duration-300 w-6 h-auto mb-[1px]" priority />
                        </button>
                      </Link>
                    </div>
                  )
                }
              </>
            }
            </>
          }
          </div>
        </section>
    </main>
    </>
  )
}
