import Link from 'next/link'
import Image from 'next/image'
import Facebook from '../../../public/assets/footer/facebook.svg'
import Instagram from '../../../public/assets/footer/instagram.svg'

export default function Footer () {
    return (
        <footer className="bg-footer pt-20 pb-14 flex flex-col gap-10 px-5 lg:px-8 md:pt-10 md:pb-6 sm:pt-14 sm:gap-8">
            <div className='grid-cols-[2fr_repeat(5,1fr)] grid gap-10 justify-items-center lg:grid-cols-3 sm:grid-cols-1 lg:gap-y-10 sm:gap-8'>
                <div className="text-gray flex flex-col place-self-center sm:items-center sm:text-center">
                    <h2 className='text-4xl text-white font-Quesha mb-1 xl:text-3xl lg:text-2xl sm:text-xl'>Merveilles de Morph’ose</h2>
                    <p className='max-w-[400px] text-[#9F324799] text-lg lg:text-base sm:text-sm'>Osez l’art de la transformation</p>
                    <div className='flex gap-3 mt-5 lg:mt-3'>
                        <Link href="" target='_blank' className='w-7 h-7 flex items-center justify-center rounded-full bg-[#BF6869]'><Image src={Facebook} alt="Facebook" className='h-3/4' /></Link>
                        <Link href="" target='_blank' className='w-7 h-7 flex items-center justify-center rounded-full bg-white'><Image src={Instagram} alt="Instagram" className='h-[60%]' /></Link>
                    </div>
                </div>
                <div className='text-secondary font-medium flex flex-col'>
                    <h3 className='font-semibold mb-2.5 text-primary lg:text-center sm:text-base'>ACCUEIL</h3>
                    <div className='flex flex-col gap-2 lg:text-center lg:text-sm sm:flex-row sm:gap-5 sm:flex-wrap sm:justify-center'>
                        <Link href='/'>Nos collections phares</Link>
                        <Link href='/services/'>Nos services</Link>
                        <Link href='/who/'>Pour les pros</Link>
                        <Link href='/contact/'>{`Billets d'humeur`}</Link>
                    </div>
                </div>
                <div className='text-secondary font-medium flex flex-col'>
                    <h3 className='font-semibold mb-2.5 text-primary lg:text-center sm:text-base'>BOUTIQUE</h3>
                    <div className='flex flex-col gap-2 lg:text-center lg:text-sm sm:flex-row sm:gap-5 sm:flex-wrap sm:justify-center'>
                        <Link href='/services/'>Bien-être et méditation</Link>
                        <Link href='/'>Bijoux</Link>
                        <Link href='/who/'>Bougies</Link>
                        <Link href='/who/'>Encens</Link>
                        <Link href='/who/'>Cartomancie</Link>
                        <Link href='/contact/'>Livres</Link>
                    </div>
                </div>
                <div className='text-secondary font-medium flex flex-col'>
                    <h3 className='font-semibold mb-2.5 text-primary lg:text-center sm:text-base'>SERVICES</h3>
                    <div className='flex flex-col gap-2 lg:text-center lg:text-sm sm:flex-row sm:gap-5 sm:flex-wrap sm:justify-center'>
                        <Link href='/'>Evènements & Ateliers</Link>
                        <Link href='/services/'>Proposer vos services</Link>
                    </div>
                </div>
                <div className='text-secondary font-medium flex flex-col'>
                    <h3 className='font-semibold mb-2.5 text-primary lg:text-center sm:text-base'>QUI SOMMES NOUS ?</h3>
                    <div className='flex flex-col gap-2 lg:text-center lg:text-sm sm:flex-row sm:gap-5 sm:flex-wrap sm:justify-center'>
                        <Link href='/who/'>Fondatrice</Link>
                        <Link href='/who/'>{`L'équipe`}</Link>
                        <Link href='/who/'>Nos valeurs</Link>
                        <Link href='/who/'>Nos objectifs</Link>
                    </div>
                </div>
                <div className='text-secondary font-medium flex flex-col'>
                    <h3 className='font-semibold mb-2.5 text-primary lg:text-center sm:text-base'>INFORMATIONS</h3>
                    <div className='flex flex-col gap-2 lg:text-center lg:text-sm sm:flex-row sm:gap-5'>
                        <Link href='/politics'>Politique de confidentialité</Link>
                        <Link href='/mentions'>Mentions légales</Link>
                        <Link href='/'>Un problème?</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
