import Image from 'next/image'
import category_icon from '../../../../public/assets/dashboard/categories.svg'
import add from '../../../../public/assets/dashboard/add.svg'
import edit from '../../../../public/assets/dashboard/edit.svg'
import edit2 from '../../../../public/assets/dashboard/edit2.svg'
import { Menu } from '@/components/menus/menu'
import Link from 'next/link'
import { GETRequest } from "@/utils/requestHeader"
import { useEffect, useRef, useState } from 'react'
import { Pagination } from '@mui/material'
import { PictoButton } from '@/components/littleComponents'
import { CircularLoading } from '@/utils/loader'
import Search from '@/components/admin/search'
import { NoIndexHead } from '@/utils/customHead'
import { InterfaceTextInput } from '@/components/forms/interface_input'

import BurgerMenu from '@/components/menus/burgerMenu'
import { BlackHamburger } from '@/components/menus/burgerMenu'
import { lock, unlock } from '@/utils/lockScreen'
import { DashboardTitle } from '@/components/littleComponents'
import { object, string } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

const API_URL = process.env.NEXT_PUBLIC_API_URL

const schema = object({
  subCat:string().required("Requis."),
}).required();

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
  
  if(response.status !== 200) {
    return { 
      redirect: {
        destination: '/admin',
        permanent: false,
      },
  }}

  const result = await fetch(`${API_URL}/categories`, GETRequest).then(r => r.json())
  return {
      props: {
          all_cat:result
      }
  }
}

export default function Categories({all_cat}) {
  const [products, setProducts] = useState(all_cat)
  // const [pagination, setPagination] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState()
  const [productSearch, setProductSearch] = useState([])
  const filterBox = useRef(null)

  const [logErr, setlogErr] = useState(false)

  const [menu, setMenu] = useState(false)
  const [hamburger, setHamburger] = useState(false)

  const [allCategories, setAllCategories] = useState()
  const [categroyId, setCategoryId] = useState(null)

  useEffect(() => {
    setAllCategories(all_cat)
  }, [])

  console.log(all_cat);
  const  {reset, handleSubmit, register, formState: {errors}} = useForm ({ resolver:  yupResolver(schema)})
  
  async function onSubmit(data) {
    setLoading(true)
    setlogErr(false)
    const { subCat } = data
    if(categroyId === null) {
      setLoading(false)
      setlogErr(true)
    }
    try {
      
        const response = await fetch(`/api/proxy/auth/admin/categories`, {
            method: "POST",    
            mode: "cors",
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title:subCat })
        })
        const category_created = response.json()
        const addToAnother = await fetch(`/api/proxy/auth/admin/categories/${categroyId}`, {
          method: "POST",    
          mode: "cors",
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ childs:[category_created.id] })
      })
      console.log(addToAnother);
        if(addToAnother.status === 200){
            const result = await fetch(`${API_URL}/categories`, GETRequest).then(r => r.json())
            setAllCategories(result)
            setLoading(false)
            return
        }
        setLoading(false)
        setlogErr(true)
        reset()
    } catch (err) {
    console.error('Request failed:' + err)
          setLoading(false)
          setlogErr(true)
    }
    }

  return (
    <>
    <NoIndexHead />
    <main className='w-[100vw] bg-cover bg-center flex'
          onClick={(e) => { if (filterBox.current && !filterBox.current.contains(e.target)) {setProductSearch([])} }} >
        <Menu />
        <BurgerMenu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
        <section className='w-full min-h-[100vh] px-5 py-28 ml-[320px] lg:ml-0 lg:px-2 lg:py-20'>
          <DashboardTitle text='Catégories' image={category_icon}/>
          <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='hidden z-40 absolute top-7 left-8 lg:block'>
              <BlackHamburger hamburger={hamburger} setHamburger={setHamburger}/>
          </div>
          {all_cat?.map(cat => 
          <div key={cat.id} className='bg-secondary/60 shadow-2xl text-white rounded-xl p-5 flex flex-col gap-3'>
            <p className='text-xl font-bold'>{cat.title}</p>
            <div className='ml-3 flex flex-col gap-1'>
              {loading ? <CircularLoading />
              :
              <>
                {cat?.childs?.map(sub_cat =>
                  <p key={sub_cat.id} className='font-medium bg-secondary/70 p-3 rounded-lg'>{sub_cat.title}</p>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 relative justify-center">
                  <div className="flex flex-col tracking-[0.2px] gap-2">
                  {errors.subCat && (<p className={`text-sm text-red-500 w-fit rounded ${style}`}>{errors.subCat?.message}</p>)}
                    <input type='text' spellCheck='false' autoComplete='off' name="subCat" id="subCat" placeholder="Ajouter un catégorie" className="text-black bg-white rounded-lg h-12 px-4 focus-visible:outline-none md:p-2 md:text-sm" {...register("subCat")}/>
                  </div>
                  <button type='submit' onClick={() => {setCategoryId(cat.id)}} className='px-4 mb-4 flex gap-3 rounded-xl py-1.5 bg-secondary place-self-end'>
                      <p className='font-bold text-white'>Ajouter</p>
                  </button>
                </form>
              </>
              }
            </div>
          </div>
          )}
        </section>
    </main>
    </>
  )
}
