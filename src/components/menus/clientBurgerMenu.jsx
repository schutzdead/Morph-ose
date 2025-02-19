import Image from "next/image"
import Link from "next/link"
import { unlock } from "@/utils/lockScreen"
import Close from "../../../public/assets/close.svg"

export default function ClientBurgerMenu ({menu, setMenu , setHamburger}) {
    const closeBurger = () => {setHamburger(false);setMenu(false);unlock()}

    return (
        <>
            <div className="hidden fixed w-full h-full left-0 top-0 z-[90] bg-black/60 cursor-pointer lg:block"
                    style={menu ? {opacity:1, transition:'opacity 1s'} : {opacity:0, zIndex:-10}} onClick={() => {setMenu(false);unlock();setHamburger(false)}}></div>
                <menu className="hidden fixed pl-10 w-[60%] pr-10 h-full top-0 bg-white z-[100] py-16 flex-col items-center text-secondary lg:flex sm:w-full sm:pr-10 lg:py-10"
                style={menu ? {left:0, transition:'left 400ms ease-out'} : {left:"-100%"}}>
                <Image src={Close} onClick={() => {setMenu(false);unlock();setHamburger(false)}} alt="Close pictogram" className='w-8 cursor-pointer self-start'/>
                <div className="flex justify-center">
                    <ul className="relative flex flex-col items-center text-xl tracking-wide w-full gap-6 sm:text-lg">
                        <li className='cursor-pointer flex flex-col gap-6 items-center relative overflow-hidden mt-1.5 group' onClick={closeBurger}>
                            <Link href='/client/orders'>Commandes</Link>
                        </li>
                        <li className='cursor-pointer flex flex-col gap-6 items-center relative overflow-hidden mt-1.5 group' onClick={closeBurger}>
                            <Link href='/client/workshops'>Evènements</Link>
                        </li>
                        {/* <li className='cursor-pointer flex flex-col gap-6 items-center relative overflow-hidden mt-1.5 group' onClick={closeBurger}>
                            <Link href='/client/pro'>Location (pro)</Link>
                        </li> */}
                        <li className='cursor-pointer flex flex-col gap-6 items-center relative overflow-hidden mt-1.5 group' onClick={closeBurger}>
                            <Link href='/client/account'>Profil</Link>
                        </li>
                        <li onClick={closeBurger}>
                            <Link href='/' className="cursor-pointer relative overflow-hidden mt-1.5 group">
                                <p>Retour au site</p>
                            </Link>
                        </li>
                        <li onClick={closeBurger}>
                            <Link href='/logout' className="cursor-pointer relative overflow-hidden mt-1.5 group">
                                <p>Déconnexion</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </menu>
        </>
    )
}

export function BlackHamburger ({hamburger, setHamburger}) {
    return (
        <div className='flex flex-col justify-between h-4 w-5 relative cursor-pointer' style={hamburger ? {display:'none'} : {}} onClick={() => setHamburger(!hamburger)}>
            <BlackHamburgerLine animation={hamburger ? {transform:'rotate(45deg)', top:'7px'} : {transform:'rotate(0)', left:0, top:0}}/>
            <BlackHamburgerLine animation={hamburger ? {width:0} : {width:'100%'}} duration={'400ms'} />
            <BlackHamburgerLine animation={hamburger ? {transform:'rotate(-45deg)', top:'-7px'} : {transform:'rotate(0)', left:0, top:0}}/>
        </div>
    )
  }

function BlackHamburgerLine ({animation}) {
    return(
    <span className={`bg-secondary h-[2px] w-full relative transition-all`}
          style={animation}></span>
    )
}