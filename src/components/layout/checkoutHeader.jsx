import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import Logo from '../../../public/assets/header/logo1.svg'
import User from '../../../public/assets/header/user.svg'
import LeftArrow from '../../../public/assets/articles/leftSide.svg'

import { UnderlineHover } from './header'

export default function CheckoutHeader () {
  const { t } = useTranslation()   
  return (
    <>
      <header className="z-20 h-28 flex justify-between px-[3vw] items-start sticky top-0 bg-white">
        <div className='pt-5'>
          <Link href='/' className='flex items-center gap-3 cursor-pointer md:gap-1 2sm:max-w-[80px]'>
            <Image src={LeftArrow} className='w-4 h-auto' alt='Left chevron pictogram' />
            <p className='md:text-xs'>{t('headerBis.back')}</p>
          </Link>
        </div>
        <Link href='/' className='flex flex-col justify-center gap-2 h-full font-bold absolute left-1/2 -translate-x-1/2'>
          <Image src={Logo} className='h-1/2 w-auto cursor-pointer relative' alt='Logo' priority={true}/>
          <h1 className='text-center font-Heise'>GHETTO BIZARRE</h1> 
        </Link>
        <nav>
          <ul className='flex gap-10 pt-5 items-start md:gap-6 font-Helvetica'>
            <li className='cursor-pointer relative overflow-hidden group sm:hidden'>
              <Link href='/account/'>
                <p>{t('headerBis.account')}</p>
                <UnderlineHover />
              </Link>
            </li>
          </ul>
          <Link href='/account/' className='items-center cursor-pointer hidden gap-1 mr-3 sm:flex'>
              <Image src={User} className='pb-[2px] w-6 h-auto' alt='Account pictogram' />
          </Link>
        </nav>
      </header>
    </>
  )
}