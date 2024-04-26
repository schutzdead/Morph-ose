import Image from 'next/image'
import workshop_icon from '../../../../public/assets/dashboard/workshop.svg'
import add from '../../../../public/assets/dashboard/add.svg'
import edit2 from '../../../../public/assets/dashboard/edit2.svg'
import { Menu } from '@/components/menus/menu'
import Link from 'next/link'
import { GETRequest } from "@/utils/requestHeader"
import {  useRef, useState } from 'react'
import { PictoButton } from '@/components/littleComponents'
import { Loading } from '@/utils/loader'
import { NoIndexHead } from '@/utils/customHead'

import BurgerMenu from '@/components/menus/burgerMenu'
import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle } from '@/components/littleComponents'

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

  const result = await fetch(`${API_URL}/workshops`, GETRequest).then(r => r.json())
  return {
      props: {
          all_workshops:result
      }
  }
}

export default function Workshops({all_workshops}) {
  const [workshops, setWorkshops] = useState(all_workshops)
  const [loading, setLoading] = useState(false)
  const [productSearch, setProductSearch] = useState([])
  const filterBox = useRef(null)

  const [menu, setMenu] = useState(false)
  const [hamburger, setHamburger] = useState(false)
  return (
    <>
    <NoIndexHead />
    <main className='w-[100vw] bg-cover bg-center flex'
          onClick={(e) => { if (filterBox.current && !filterBox.current.contains(e.target)) {setProductSearch([])} }} >
        <Menu />
        <BurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
        <section className='w-full min-h-[100vh] px-5 py-28 ml-[320px] lg:ml-0 lg:px-2 lg:py-20'>
          <DashboardTitle text='Evènements' image={workshop_icon}/>
          <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
              <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
          </div>
          <div className='flex flex-col bg-white shadow-dashboard w-full rounded-xl py-10 px-5 xl:py-5 lg:px-2 lg:py-2 sm:shadow-none'>
            <div className='flex gap-3 mb-5 items-center justify-end w-full'>
              {/* <div ref={filterBox} className='w-full'>
                <Search result={productSearch} setResult={setProductSearch} apiPath='workshop' />
              </div> */}
              <PictoButton image={add} linkTo="/admin/workshops/new" />
            </div>
            {loading ? <Loading />
            : <>
                <div className='grid text-secondary grid-cols-[repeat(4,2fr)_1fr] py-5 font-bold text-base items-center justify-items-center text-center rounded-xl overflow-hidden xl:text-sm sm:grid-cols-[repeat(3,2fr)_1fr] sm:text-xs'>
                    <p className='place-self-start'>Titre</p>
                    <p>Dates</p>
                    <p>Places réservées</p>
                    <p className='sm:hidden'>Prix</p>
                </div>
                {
                  workshops?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((workshop) =>
                    <div key={workshop.id} className='grid grid-cols-[repeat(4,2fr)_1fr] py-3 rounded-lg text-secondary/90 justify-items-center items-center sm:grid-cols-[repeat(3,2fr)_1fr] sm:text-sm' style={workshops?.indexOf(workshop)%2 === 0 ? {backgroundColor:'#F5F5F5'} : {backgroundColor:"white"}}>
                      <p className='font-semibold justify-self-start pl-2'>{`${workshop.title}`}</p>
                      <div className='flex flex-col items-center sm:text-xs'>
                        <p>{new Date(workshop.date).toLocaleDateString('fr')}</p>
                        <p>{new Date(workshop.date).toLocaleTimeString('fr')}</p>
                      </div>
                      <p>{`${workshop.entries_reserved}`}</p>
                      <p className='max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis hover:max-w-none sm:hidden'>{workshop.price}€</p>
                      <Link href={`/admin/workshops/${workshop.id}`}>
                        <button className='group flex gap-1 w-[40px] items-center text-white py-1 justify-center'>
                          <Image src={edit2} alt="details icon" className="group-hover:scale-[1.18] transition-all duration-300 w-6 h-auto mb-[1px]" priority />
                        </button>
                      </Link>
                    </div>
                  )
                }
                {/* <div className='mt-14 mb-4 w-full flex gap-3 justify-center'>
                  <Pagination count={pagination.length} page={currentPage} onChange={(event, value) => {updatePagination(value);setCurrentPage(value)}} />
                </div> */}
              </>
            }
          </div>
        </section>
    </main>
    </>
  )
}
