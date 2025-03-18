import Image from 'next/image'
import product_icon from '../../../../public/assets/dashboard/product.svg'
import add from '../../../../public/assets/dashboard/add.svg'
import edit2 from '../../../../public/assets/dashboard/edit2.svg'
import { Menu } from '@/components/menus/menu'
import Link from 'next/link'
import { GETRequest } from "@/utils/requestHeader"
import {  useEffect, useRef, useState } from 'react'
import { Pagination } from '@mui/material'
import { PictoButton } from '@/components/littleComponents'
import { Loading } from '@/utils/loader'
import Search from '@/components/admin/search'
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

  const result = await fetch(`${API_URL}/products?pagination=80`, GETRequest).then(r => r.json())
  return {
      props: {
          all_products:result
      }
  }
}

export default function Products({all_products}) {
  const [products, setProducts] = useState(all_products)

  const [pagination, setPagination] = useState([])
  const [currentPage, setCurrentPage] = useState()

  const [loading, setLoading] = useState(false)
  const [productSearch, setProductSearch] = useState([])
  const filterBox = useRef(null)

  const [menu, setMenu] = useState(false)
  const [hamburger, setHamburger] = useState(false)

  useEffect(() => {
    setPagination([])
    for(let i = 1; i <= products.last_page; i++){
      setPagination((previous) => [...previous, i])
    }
  }, [products])

  async function updatePagination (number) {
    setLoading(true)
    const result = await fetch(`${API_URL}/products?pagination=80&page=${number}`, GETRequest).then(r => r.json())
    setProducts(result)
    setLoading(false)
  }

  return (
    <>
    <NoIndexHead />
    <main className='w-[100vw] bg-cover bg-center flex'
          onClick={(e) => { if (filterBox.current && !filterBox.current.contains(e.target)) {setProductSearch([])} }} >
        <Menu />
        <BurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
        <section className='w-full min-h-[100vh] px-5 py-28 ml-[320px] lg:ml-0 lg:px-2 lg:py-20'>
          <DashboardTitle text='Produits' image={product_icon}/>
          <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
              <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
          </div>
          <div className='flex flex-col bg-white shadow-dashboard w-full rounded-xl py-10 px-5 xl:py-5 lg:px-2 lg:py-2 sm:shadow-none'>
            <div className='flex gap-3 mb-5 items-center w-full'>
              <div ref={filterBox} className='w-full'>
                <Search result={productSearch} setResult={setProductSearch} apiPath='products' />
              </div>
              {/* <PictoButton image={add} linkTo="/admin/products/new" /> */}
            </div>
            {loading ? <Loading />
            : <>
                <div className='grid text-secondary grid-cols-[repeat(4,2fr)_1fr] py-5 font-bold text-base items-center justify-items-center text-center rounded-xl overflow-hidden xl:text-sm sm:grid-cols-[repeat(3,2fr)_1fr] sm:text-xs'>
                    <p className='place-self-start'>Titre</p>
                    <p>Catégorie</p>
                    <p className='sm:hidden'>Publié</p>
                    <p>Prix</p>
                </div>
                {
                  products?.data?.sort((a, b) => a.title.localeCompare(b.title)).map((product) =>
                    <div key={product.id} className='grid grid-cols-[repeat(4,2fr)_1fr] py-3 rounded-lg text-secondary/90 justify-items-center items-center sm:grid-cols-[repeat(3,2fr)_1fr] sm:text-sm' style={products?.data?.indexOf(product)%2 === 0 ? {backgroundColor:'#F5F5F5'} : {backgroundColor:"white"}}>
                      <p className='font-semibold place-self-start pl-2'>{`${product.title}`}</p>
                      <p className='px-4 text-center'>{product?.categories[0]?.title}</p>
                      <div className='w-2 h-2 rounded-full sm:hidden' style={product.is_published ? {backgroundColor:'rgb(34 197 94)'} : {backgroundColor:'rgb(239 68 68)'}}></div>
                      <p className='max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis hover:max-w-none'>{product.price}€</p>
                      <Link href={`/admin/products/${product.id}`}>
                        <button className='group flex gap-1 w-[40px] items-center text-white py-1 justify-center'>
                          <Image src={edit2} alt="details icon" className="group-hover:scale-[1.18] transition-all duration-300 w-6 h-auto mb-[1px]" priority />
                        </button>
                      </Link>
                    </div>
                  )
                }
                <div className='mt-14 mb-4 w-full flex gap-3 justify-center'>
                  <Pagination count={pagination.length} page={currentPage} onChange={(event, value) => {updatePagination(value);setCurrentPage(value)}} />
                </div>
              </>
            }
          </div>
        </section>
    </main>
    </>
  )
}
