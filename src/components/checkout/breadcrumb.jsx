import Image from "next/image"
import { useTranslation } from 'next-i18next'
import RightArrow from "../../../public/assets/articles/rightSide.svg"

export function FakeBreadCrumb ({current}) {
   const { t } = useTranslation()
    return (
        <div className="flex items-center sticky top-28 py-5 bg-white z-20 w-full justify-center text-center px-2">
                <p className="text-xs text-secondaryDark" 
                   style={current === 1 ? {color:'black'} : {} }>{t('checkout.breadcrumb1')}</p>
                <Image src={RightArrow} alt="Right arrow pictogram" className='w-6 h-auto mx-10 sm:mx-3' />
                <p className="text-xs text-secondaryDark" 
                   style={current === 2 ? {color:'black'} : {} }>{t('checkout.breadcrumb2')}</p>
                <Image src={RightArrow} alt="Right arrow pictogram" className='w-6 h-auto mx-10 sm:mx-3' />
                <p className="text-xs text-secondaryDark" 
                   style={current === 3 ? {color:'black'} : {} }>{t('checkout.breadcrumb3')}</p>
        </div>
    )
}