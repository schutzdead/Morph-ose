import first_icon from '../../../public/assets/dashboard/first.svg'
import delete_icon from '../../../public/assets/dashboard/delete.svg'
import { Menu } from '@/components/menus/menu'
import { GETRequest, POSTRequest } from "@/utils/requestHeader"
import { useRef, useState } from 'react'
import { CircularLoading, Loading } from '@/utils/loader'
import { NoIndexHead } from '@/utils/customHead'

import BurgerMenu from '@/components/menus/burgerMenu'
import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle } from '@/components/littleComponents'
import Image from 'next/image'

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

  const first =  await fetch(`${API_URL}/catalog/homepage`, GETRequest).then(r => r.json())

  return {
      props: {
        first_product:first
      }
  }
}

export default function First({first_product}) {
  const [loading, setLoading] = useState(false)

  const [menu, setMenu] = useState(false)
  const [hamburger, setHamburger] = useState(false)

  const [productSearch, setProductSearch] = useState([])
  const filterBox = useRef(null)

  const [first, setFirst] = useState(first_product)
  async function deleteProduct (id) {
    setLoading(true)
    try {
      const response = await fetch(`/api/proxy/auth/admin/products/${id}/featured/remove`, {
          method: "DELETE",
          mode: "cors",
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
          },
      })
      if(response.status === 200){
        const reload =  await fetch(`${API_URL}/catalog/homepage`, GETRequest).then(r => r.json())
        setFirst(reload)
        setLoading(false)
        return
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
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
          <DashboardTitle text='Produits phare' image={first_icon}/>
          <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
              <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
          </div>
          <div className='flex flex-col bg-white shadow-dashboard w-full rounded-xl py-10 px-5 xl:py-5 lg:px-2 lg:py-2 sm:shadow-none'>
            <div className='flex gap-3 mb-5 items-center w-full'>
              <div ref={filterBox} className='w-full'>
                <SearchFirst result={productSearch} setResult={setProductSearch} setFirst={setFirst} apiPath='products' />
              </div>
            </div>
            {loading ? <Loading />
            : <>
                {
                  first?.sort((a, b) => a.title.localeCompare(b.title)).map((product) =>
                    <div key={product.id} className='flex px-5 justify-between items-center py-3 rounded-lg text-secondary/90 sm:text-sm' style={first?.indexOf(product)%2 === 0 ? {backgroundColor:'#F5F5F5'} : {backgroundColor:"white"}}>
                      <p className='font-semibold'>{`${product.title}`}</p>
                      <button onClick={() => {deleteProduct(product.id)}} className='rounded flex items-center justify-center cursor-pointer bg-red-500 hover:bg-red-700 transition-all duration-300 h-10 w-10 min-w-10 min-h-10 sm:min-h-8 sm:h-8 sm:w-8 sm:min-w-8'>
                          <Image src={delete_icon} className='w-6 h-auto' alt='Edit profil pictogram' />
                      </button>
                    </div>
                    
                  )
                }
              </>
            }
          </div>
        </section>
    </main>
    </>
  )
}


function SearchFirst ({result, setResult, apiPath, setFirst}) {
  const [search, setSearch] = useState('')
  const [load, setLoad] = useState(false)

  function handleChangeSearch (e) {
    setSearch(e.target.value);
    if(e.target.value === '') {setResult(null); setLoad(false); return}
    setLoad(true)
    {load ? ''
      : setTimeout(async function searchLoad () {
    try {
          const response = await fetch(`${API_URL}/search/${apiPath}`, POSTRequest({search:e.target.value}))
          const res = await response.json();
          setResult([])
          for(const props in res){
              setResult((previous => [...previous, {id:props, title:res[props]}]))
          }
          if(res.message) return setResult([])
          setLoad(false)
      } catch (err) {
          console.error('Request failed:' + err)
      }
    }, 500)}
  } 

  async function addProduct (id) {
    setLoad(true)
    try {
      const response = await fetch(`/api/proxy/auth/admin/products/${id}/featured`, {
          method: "POST",    
          mode: "cors",
          headers: {
              "Accept": "application/json",
          }
      })
      const productAdded = await response.json()
      if(response.status === 200){
        const reload =  await fetch(`${API_URL}/catalog/homepage`, GETRequest).then(r => r.json())
        setFirst(reload)
        setLoad(false)
        return
      }
      setLoad(false)
    } catch (err) {
      console.error('Request failed:' + err)
      setLoad(false)
    }
  }
  
  return(
      <div className='group relative flex flex-col w-full'>
              <input type='text' spellCheck='false' autoComplete='off' placeholder="Rechercher..." className="text-white w-full bg-secondary/70 rounded-[8px] h-10 sm:h-8 px-4 placeholder:text-white focus-visible:outline-none md:text-sm" value={search} onChange={handleChangeSearch}/>
              {load ?
              <div className='absolute w-[85%] h-3/5 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-end items-center'>
                  <CircularLoading />
              </div>
              : ''}
              {
                  result === null || result?.length === 0
                  ? ''
                  : <div className='flex flex-col min-w-[40%] absolute mt-[68px] bg-white border-2 rounded-[4px] z-20 border-tertiary max-h-[200px] overflow-y-auto'>
                      {result ?
                      result.map(s =>
                          <button key={s?.title?.id ? s?.title?.id : s?.id} className='hover:bg-gray-200 bg-white cursor-pointer transition-all duration-500 p-3.5 border-b border-[#c4c4c4]'
                          style={result.length === s.id ? {border:'none'} : {}}
                          onClick={() => {setSearch(''); setResult(''); addProduct(s?.title?.id)}}>{s?.title?.title ? s?.title?.title : 'No name'}</button>
                      )
                      : ''
                      }
                  </div>
              }
      </div>
  )
}