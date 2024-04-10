import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Link from 'next/link';

export function LanguageMenu ({languageReveal, setLanguageReveal}) {
    const router = useRouter()
    const { i18n } = useTranslation()
    return (

        <ul className='bg-white flex-col w-20 border border-secondary'
             style={languageReveal ? {display:'flex'} : {display:'none'} }>
                {
                    router?.locales?.map(locale => 
                        <Link key={locale} href={router.asPath} locale={locale} onClick={() => setLanguageReveal(false)}>
                            <li  className={`p-2 pb-[7px] cursor-pointer hover:bg-secondaryLight/30`}
                                style={i18n.language === locale ? {backgroundColor:'#d1d5db'} : {backgroundColor:null}}>
                                    {locale.toUpperCase()}
                            </li>
                        </Link>
                    )
                }
        </ul>
    )
}