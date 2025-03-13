import Link from 'next/link'
import Image from 'next/image'

import Logo from '../../../public/assets/header/logo1.svg'
import Bag from '../../../public/assets/header/icon2.svg'
import User from '../../../public/assets/header/icon1.svg'
import Close from '../../../public/assets/header/close.svg'
import Close_brown from '../../../public/assets/essentials-icons/close_brown.svg'
import { useState, useContext, useEffect } from 'react'
import { Hamburger } from './hamburger'
import { CartContext, OpenCartContext } from '@/utils/cartProvider'
import Menu from './menu'
import Cart from './cart'
import { CircularProgress, Skeleton } from '@mui/material'
import { GETRequest } from '@/utils/requestHeader'


const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Header () {
  const { cart } = useContext(CartContext);
  const { bag, setBag } = useContext(OpenCartContext);
  const [menu, setMenu] = useState(false)
  const [hamburger, setHamburger] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [isPub, setIsPub] = useState(true)

  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [load, setLoad] = useState(false)
  const [freeAmount, setFreeAmount] = useState()

  function handleChangeSearch (e) {
    setSearch(e.target.value);
    if(e.target.value === '') {setSearchResult(null); setLoad(false); return}
    setLoad(true)
    {load ? ''
      : setTimeout(async function searchLoad () {
    try {
      const response = await fetch('/api/proxy/search/products', {
          method: "POST",
          credentials: 'include',    
          mode: "cors",
          headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ search:e.target.value })
      })
      const result = await response.json();
      if(result.message) return setSearchResult(null)
      setSearchResult(result)
      setLoad(false)
    } catch (err) {
      console.error('Request failed:' + err)
    }
    }, 500)}
  } 

  useEffect(() => {
    setCartCount(cart.length)
    return () => {
      setCartCount(0)
    }
  },[cart])

  async function freeShip () {
    const free = await fetch(`${API_URL}/settings/value/free_shipping`, GETRequest).then(r => r.json())
    setFreeAmount(free.value)
  }

  useEffect(() => {
    freeShip()
  }, [])

  const [body, setBody] = useState()
  useEffect(() => {
      setBody(document?.querySelector('body'))
  },[])

  return (
    <>
      <Menu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
      <Cart bag={bag} setBag={setBag} />
      <div className='bg-mainGradient text-white justify-center items-center font-medium text-sm flex relative transition-all duration-500 sm:text-xs sm:justify-start' style={isPub ? {height:'35px', opacity:1} : {height:'0px', opacity:0}}>
        {freeAmount 
          ? <p className='sm:max-w-[80%] sm:ml-2 sm:text-center sm:truncate'>{`Livraison offerte dans toute la France à partir de ${freeAmount}€ d'achat !`}</p>
          : <div className='max-w-[700px] w-[90vw]'>
            <Skeleton />
          </div>
        }
        
        <Image src={Close} onClick={() => setIsPub(false)} className='w-5 h-auto absolute right-5' alt='Account pictogram' />
      </div>
      <header className="z-30 h-28 flex justify-between bg-background px-10 items-center font-medium sticky top-0 lg:px-5 text-primary">
        <nav className='flex gap-8 md:hidden'>
          <div onClick={() => setMenu(!menu)} className='flex items-center'>
            <Hamburger hamburger={hamburger} setHamburger={setHamburger}/>
          </div>
          <div className='flex flex-col gap-4 relative'>
            <div className='group w-[250px] relative overflow-hidden flex flex-col'>
              <input type="text" placeholder="Rechercher un article..." autoComplete='off' spellCheck="false"
                      value={search} onChange={handleChangeSearch} className='pb-1 w-[65%] flex items-center bg-transparent focus:outline-none placeholder:text-primary'
                      >
              </input>
              {load ?
              <div className='absolute w-full h-[25px] top-0 right-0 bg-gray-300/50 rounded-md flex items-center'>
                <CircularProgress size="1rem"/>
              </div>
              : ''}
              {
                searchResult === null || searchResult.length === 0 || search === ''
                  ? ""
                  : <div onClick={() => {setSearchResult(null); setSearch(""); setLoad(false)}} className='absolute h-[25px] top-0 right-0 cursor-pointer rounded-md flex items-center'>
                      <Image src={Close_brown} alt="Annuler la recherche" />
                    </div>
              }
              <UnderlineHover />
            </div>
            {
              searchResult === null || searchResult.length === 0 || search === ''
              ? ''
              : <div className='absolute mt-10 max-h-[80vh] overflow-y-auto flex flex-col bg-white border rounded-lg border-primary py-2 '>
                  {searchResult ?
                  searchResult.map((s, index) =>
                    <Link key={s.id} href={{pathname:`/categories/recherche/${s.slug}`, query:{art:s.id}}} className='cursor-pointer hover:bg-primary/10 duration-500 transition-all px-4'>
                      <p className='py-2 text-secondary pr-3' style={searchResult?.length !== index+1 ? {borderBottom:'1px solid rgb(229,231,235)'} : {}}>{s.title}</p>
                    </Link>
                  )
                  : ''
                  }
                </div>
            }
          </div>
        </nav>
        <Link href='/' className='flex flex-col justify-center gap-2 h-full font-bold absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0'>
          <Image src={Logo} className='h-[75%] w-auto cursor-pointer relative sm:h-[55%]' alt='Logo' priority={true}/>
        </Link>
        <nav className='flex items-center'>
          <ul className='flex gap-8 items-center h-[30px] whitespace-nowrap lg:gap-5 md:hidden'>
            <li className='cursor-pointer relative overflow-hidden group sm:hidden h-full'>
              <Link href='/client' className='flex gap-2'>
                <Image src={User} className='pb-[2px] w-6 h-auto mt-1' alt='Account pictogram' />
              </Link>
            </li>
            <li className='cursor-pointer flex items-center gap-2 relative sm:hidden overflow-hidden h-full group' onClick={() => {setBag(!bag)}}>
              <Image src={Bag} className='pb-[2px] w-5 h-auto' alt='Account pictogram' />
              <span>
              {` (${cartCount})`}
              </span>
            </li>
            <li>
              <Link href="/contact">
                <button className='px-4 bg-primary/80 hover:bg-primary transition-all duration-500 w-full flex rounded-xl justify-center text-base text-white py-2'>
                    <p className='font-medium text-center'>Contact</p>
                </button>
              </Link>
            </li>
          </ul>
          {/* RESPONSIVE */}
          <ul className='hidden gap-10 items-center md:flex md:gap-4'>
            <div className='flex items-center cursor-pointer gap-1'>
              <Image src={Bag} className='w-5 h-auto' alt='Cart pictogram' onClick={() => setBag(!bag)} />
              <span>
              {` (${cartCount})`}
              </span>
            </div>            
            <div onClick={() => setMenu(!menu)}>
              <Hamburger hamburger={hamburger} setHamburger={setHamburger}/>
            </div>
          </ul>
           {/* RESPONSIVE */}
        </nav>
      </header>
    </>
  )
}

export function UnderlineHover () {
  return(
    <div className="w-full bg-primary bottom-0 h-[1px] absolute -left-[100%] transition-all duration-500 group-hover:left-0"></div>
  )
}

export function UnderlineHoverSearch () {
  return(
    <div className='w-[65%] bg-primary h-[1px] relative left-[100%] transition-all duration-500 group-focus:left-[35%] group-hover:left-[35%] lg:w-[40%] group-hover:lg:left-[60%]'></div>
  )
}