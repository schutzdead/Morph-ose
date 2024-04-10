import Link from 'next/link'
import Image from 'next/image'

import Logo from '../../../public/assets/header/logo1.svg'
import Bag from '../../../public/assets/header/icon2.svg'
import User from '../../../public/assets/header/icon1.svg'
import Close from '../../../public/assets/header/close.svg'
import { useState, useContext, useEffect } from 'react'
import { Hamburger } from './hamburger'
import { LanguageMenu } from './languageMenu'
import { CartContext, OpenCartContext } from '@/utils/cartProvider'
import Menu from './menu'
import { lock, unlock } from '@/utils/lockScreen'
import Cart from './cart'
import { CircularProgress } from '@mui/material'

import { useRouter } from 'next/router'

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
      console.log(result);
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

  return (
    <>
      <Menu menu={menu} setMenu={setMenu} setHamburger={setHamburger}/>
      <Cart bag={bag} setBag={setBag} />
      <div className='bg-mainGradient text-white justify-center items-center font-medium text-sm flex relative transition-all duration-500 sm:text-xs sm:justify-start' style={isPub ? {height:'35px', opacity:1} : {height:'0px', opacity:0}}>
        <p className='sm:max-w-[80%] sm:ml-2 sm:text-center sm:truncate'>{`Livraison offerte dans toute la France à partir de 59€ d'achat !`}</p>
        <Image src={Close} onClick={() => setIsPub(false)} className='w-5 h-auto absolute right-5' alt='Account pictogram' />
      </div>
      <header className="z-20 h-28 flex justify-between px-10 items-center font-medium sticky top-0 bg-transparent lg:px-5 text-primary">
        <nav className='flex gap-8 md:hidden'>
          <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}} className='flex items-center'>
            <Hamburger hamburger={hamburger} setHamburger={setHamburger}/>
          </div>
          <div className='group w-[250px] relative flex flex-col overflow-hidden'>
              <input type="text" placeholder="Rechercher" autoComplete='off' spellCheck="false"
                     value={search} onChange={handleChangeSearch} className='pb-1 w-[65%] flex items-center bg-transparent focus:outline-none placeholder:text-primary'
                     >
              </input>
              {load ? 
              <div className='absolute w-full h-[25px] top-0 right-0 bg-gray-300/90 flex items-center'>
                <CircularProgress size="1rem"/> 
              </div>
              : ''}
              <UnderlineHover />
              {
                searchResult === null || searchResult.length === 0
                ? ''
                : <div className='relative flex flex-col text-right mt-3 bg-white border border-gray-400 p-2'>
                    {searchResult ? 
                    searchResult.map(s => 
                      <Link key={s.id} href="/[sections]/[categories]/[subCategories]/[articles]" as={`${s.breadcrumb[2].slug}/${s.breadcrumb[1].slug}/${s.breadcrumb[0].slug}/${s.slug}`} className='cursor-pointer'>
                        <p className='py-2 border-b border-gray-300 pr-3 '>{s.title}</p>
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
          <ul className='flex gap-10 items-center h-[30px] whitespace-nowrap lg:gap-5 md:hidden'>
            <li className='cursor-pointer relative overflow-hidden group sm:hidden h-full'>
              <Link href='/account/' className='flex gap-2'>
                <Image src={User} className='pb-[2px] w-6 h-auto' alt='Account pictogram' />
                <p>Client</p>
                <UnderlineHover />
              </Link>
            </li>
            <li className='cursor-pointer relative overflow-hidden group sm:hidden h-full'>
              <Link href='/account/' className='flex gap-2'>
                <Image src={User} className='pb-[2px] w-6 h-auto' alt='Account pictogram' />
                <p>Pro</p>
                <UnderlineHover />
              </Link>
            </li>
            <li className='cursor-pointer flex items-center gap-2 relative sm:hidden overflow-hidden h-full group' onClick={() => {setBag(!bag); bag ? unlock() : lock()}}>
              <Image src={Bag} className='pb-[2px] w-5 h-auto' alt='Account pictogram' />
              <p>Panier</p>
              <UnderlineHover />
            </li>
          </ul>
          {/* RESPONSIVE */}
          <ul className='hidden gap-10 items-center md:flex md:gap-4'>
            <div className='flex items-center cursor-pointer gap-1'>
              <Image src={Bag} className='w-5 h-auto' alt='Cart pictogram' onClick={() => {setBag(!bag); bag ? unlock() : lock()}} />
              <span>
              {` (${cartCount})`}
              </span>
            </div>            
            <div onClick={() => {setMenu(!menu); menu ? unlock() : lock()}}>
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