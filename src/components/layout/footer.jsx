import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { useTranslation } from 'next-i18next'

export default function Footer () {
    const { t } = useTranslation()
    const [year, setYear] = useState(new Date())

    return (
        <footer className="h-24 flex flex-col items-center justify-end mb-2 gap-2 z-10">
                <ul className="flex gap-7 px-3 2sm:gap-5 2sm:w-full 2sm:justify-between 2sm:text-xs 2sm:text-center">
                    <li className=''><Link href='/'>{t('footer.terms')}</Link></li>
                    <li className=''><Link href='/'>{t('footer.policy')}</Link></li>
                    <li className=''><Link href='/'>{t('footer.return')}</Link></li>
                    <li className=''><Link href='/contact/'>{t('footer.contact')}</Link></li>
                </ul>
                <div className='font-Helvetica'>BAT.N3 ©<span>{year.getFullYear()}</span></div>
        </footer>
    )
}
