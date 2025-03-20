import Image from "next/image";
import RightArrow from '../../../public/assets/main/right.svg'
import WRightArrow from '../../../public/assets/main/white_right.svg'
import Butterfly from '../../../public/assets/main/butterfly.svg'
import Butterfly2 from '../../../public/assets/main/butterfly2.svg'
import Plant1 from '../../../public/assets/main/plant1.svg'
import Services from '../../../public/assets/main/services.webp'
import Check from '../../../public/assets/main/checkColor.svg'

import Facebook from '../../../public/assets/footer/facebook.svg'
import Instagram from '../../../public/assets/footer/instagram_white.svg'
import Tiktok from '../../../public/assets/footer/tiktok.svg'
import Yt from '../../../public/assets/footer/yt.svg'

import Link from "next/link";
import { CircularLoading } from "@/utils/loader";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from "yup";

import { motion} from "framer-motion";

const schema1 = object({
  email:string().required("Requis.").email("Email invalide.").trim().lowercase(),
});

export function Newletter () {

    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [send, setSend] = useState(false)
    const {reset, handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(schema1)
    })

    // async function onSubmit(data) {
    //   setErr(false)
    //   setLoading(true)
    //   const { email } = data
    //   //check in the list if email is subcribe
    //   try {
    //       const checkList = await fetch('/api/profil', {
    //       method:'POST',
    //       headers: {
    //           "Accept": "application/json",
    //           'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ 
    //           emails:[email]
    //       })
    //   })
    //   const list = await checkList.json();
    //   if(list.length > 0) {
    //       setLoading(false)
    //       reset({email:email})
    //       setErr(true)
    //       return
    //   }

    //   //if email doesn't exist, subcribe to list
    //   const response = await fetch('/api', {
    //       method: "POST",  
    //       headers: {
    //           "Accept": "application/json",
    //           'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(
    //           { 
    //               profiles:[
    //                   {
    //                       email:email,
    //                   }
    //               ]
    //           }
    //       )
    //   })
    //   const auth = await response.json();
    //       if(auth.length>0 && auth[0].id){
    //           setErr(false)
    //           setSend(true);
    //       } else {
    //           setErr(true)
    //       }
    //       setLoading(false)
    //       reset({email:''})
    //   } catch (err) {
    //     console.error('Request failed:' + err)
    //     setLoading(false)
    //   }
    // }
    async function onSubmit(data) {
      setErr(false)
      setLoading(true)
      const { email } = data

      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (data.success) {
          setErr(false)
          setSend(true);
        } else {
          setErr(true)
        }
        setLoading(false)
        reset({email:''})
      } catch (error) {
        setErr(true)
        console.error('Request failed:' + err)
      }
    };
  

    return(
      <section id="newsletter" className="scroll-m-32 flex flex-col gap-10 mx-10 my-32 sm:my-20 md:mx-5">
        <div className="flex gap-20 bg-homeGradient3 rounded-3xl justify-center px-10 lg:gap-10 sm:gap-8 sm:px-0">
          <Image src={Plant1} alt='plant icon' className="self-end w-auto md:max-w-[150px] sm:hidden" priority />
          <div className="flex-col flex gap-10 text-white py-20 sm:py-10 sm:items-center sm:text-center sm:w-[95%]">
            <h1 className="font-Quesha w-fit text-9xl xl:text-6xl md:text-5xl">Gardez la pêche !</h1>
            <p className="font-bold text-xl lg:text-lg md:text-base">Inscrivez-vous à notre billet d’humeur et recevez notre programmation et un flux de pensées positives directement dans votre boîte mail.</p>
            {!send 
            ? <>
              {err ? <div className='text-red-500 text-sm font-semibold -mb-7 md:mb-0'>Une erreur est survenue.</div>: ''}
              {loading
                  ? <CircularLoading />
                  :
                  <>
                    {errors.email && (<p className="text-sm text-red-500 w-fit rounded">{errors.email?.message}</p>)}
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl w-fit p-1.5 gap-5 h-14 flex items-center">
                      <input type="text" name="email" id="email" className="appearance-none h-full w-full px-5 text-black" placeholder="Entrez votre adresse email" {...register("email")} />
                      <button type="submit" className="text-lg whitespace-nowrap font-semibold lg:text-base sm:text-sm px-4 h-full bg-primary text-white rounded-lg">{`Je m'inscris !`}</button>
                    </form>
                  </>
              }
            </>
            : <div className="flex flex-col text-secondary rounded-xl relative mt-5">
                <div>
                    <h1 className="font-Quesha text-7xl xl:text-6xl md:text-5xl">Merci de votre inscription !</h1>
                    <p className="text-xl flex flex-col pb-10 gap-5 lg:text-lg sm:text-base ">Vous recevrez  gratuitement toutes les semaines par mail, un petit message qui égaillera votre journée.</p>
                </div>
                <h1 className="font-Quesha text-6xl xl:text-5xl md:text-4xl">A bientôt !</h1>
            </div> 
            }           
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-Quesha w-fit text-8xl xl:text-6xl md:text-4xl text-secondary 2sm:text-3xl">Et suivez nous sur les réseaux sociaux... </h1>
          <div className="max-w-screen flex ml-10 gap-5 h-[100px] min-h-[100px] overflow-hidden sm:h-[60px] sm:min-h-[60px] lg:ml-0">
            <Link href="https://www.facebook.com/profile.php?id=61560375578587" target="_blank" className="flex-[0_0_25%] max-w-[100px] h-full sm:max-w-[60px] bg-primary items-center justify-center flex rounded-xl">
              <Image src={Facebook} alt='plant icon' className="h-2/3 w-auto" priority />
            </Link>
            <Link href="https://www.instagram.com/merveillesdemorph_ose?fbclid=IwY2xjawD7cjZleHRuA2FlbQIxMAABHdR-RC3lxstptIyiFNRkKrivrNLz-8Waskq1jPRHbVXi-xT1VbAQT7UfBg_aem_uuswALQFkuNHAADMezSzaw" target="_blank" className="flex-[0_0_25%] max-w-[100px] h-full sm:max-w-[60px] bg-[#A37C99] items-center justify-center flex rounded-xl">
              <Image src={Instagram} alt='plant icon' className="h-2/3 w-auto" priority />
            </Link>
            <Link href="https://www.youtube.com/@MorphoseEvolution" target="_blank" className="flex-[0_0_25%] max-w-[100px] h-full sm:max-w-[60px] bg-primary items-center justify-center flex rounded-xl">
              <Image src={Yt} alt='plant icon' className="h-[40%] w-auto" priority />
            </Link>
            <Link href="https://www.tiktok.com/@morphose.evolution?_t=8mOQ1Vab2yO&_r=1" target="_blank" className="flex-[0_0_25%] max-w-[100px] h-full sm:max-w-[60px] bg-[#A37C99] items-center justify-center flex rounded-xl">
              <Image src={Tiktok} alt='plant icon' className="h-2/3 w-auto" priority />
            </Link>
          </div>
        </div>
        </section>
    )
  }
  
  export function Title ({butterfly=false, title}) {
    return(
      <motion.div initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 150, damping: 25}} className="relative font-Quesha w-fit text-8xl xl:text-7xl md:text-6xl">
        <div className="relative">
          <Image src={Butterfly} alt='butterfly icon' className="absolute h-auto w-14 -left-[53px] -top-[20px] xl:w-12 xl:-left-[41px] xl:-top-[23px] md:w-8 md:-left-[25px] md:-top-[16px]" style={butterfly ? {display:'block'} : {display:'none'}} priority />
          <h1 className="gradient-categories">{title}</h1>
        </div>
        {/* <div className="h-[3px] w-full bg-mainGradient"></div> */}
      </motion.div>
    )
  }
  
  export function Card ({product}) {
    return(
      <Link href={product?.breadcrumb[0]?.slug ? {pathname: `/categories/${product?.breadcrumb[1]?.slug}`, query: { cat:product?.breadcrumb[1]?.id }} : {pathname: `/categories`}} className="flex flex-col group rounded-3xl h-full relative overflow-hidden cursor-pointer shadow-lg">
        <div className="rounded-t-3xl bg-homeGradient1 backdrop-blur-md absolute z-10 top-0 w-full h-[25%] min-h-[150px] flex flex-col gap-3 items-center justify-center text-white opacity-0 pb-5 group-hover:opacity-100 transition-all ease-out duration-300 sm:h-[100%] sm:min-h-0 sm:opacity-100 sm:top-0">
          <h2 className="text-3xl font-bold lg:text-2xl sm:text-lg text-center px-3">{product?.breadcrumb[1]?.title ? product?.breadcrumb[1]?.title.toUpperCase() : 'Nos catégories'}</h2>
          <div className="absolute right-5 bottom-3">
            <button className="bg-white px-3 py-1 rounded-3xl text-xs font-bold flex gap-1 items-center">
              <p className="gradient-text2">Voir plus</p>
              <Image src={RightArrow} alt='arrow icon' className="mt-[2px]" priority />
            </button>
          </div>
        </div>
        <div className="w-full h-full transition-all relative duration-1000 hover:scale-105">
          {product?.images[0]?.url
            ? <Image src={product?.images[0]?.url} alt='categories picture' fill className="object-cover" priority />
            : 
            <div className="mt-5 flex h-full w-full items-center justify-center bg-gray-100 rounded-lg px-6 py-10">
              <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                  </svg>
              </div>
            </div>
          }
        </div>
      </Link>
    )
  }
  
  export function Picto ({image, text, title}) {
    return(
      <div className="flex flex-col items-center max-w-[300px] text-center lg:max-w-[250px]">
        <Image src={image} alt='pictogram description' className="mt-[2px] w-16 h-auto xl:w-12" priority />
        <h2 className="font-Quesha text-[#E25E3E] text-6xl xl:text-5xl text-nowrap lg:text-4xl text-center">{title}</h2>
        <p className="text-secondary font-medium lg:text-sm mt-2">{text}</p>
      </div>
    )
  }
  
  export function Service ({workshop, description}) {

    useEffect(() => {
      const updateSlidesToShow = () => {
        if (window.matchMedia("(max-width: 640px)").matches) {
          setSlidesToShow(1);
        } else if (window.matchMedia("(max-width: 1024px)").matches) {
          setSlidesToShow(2);
        } else {
          setSlidesToShow(3);
        }
      };
  
      updateSlidesToShow();
      window.addEventListener("resize", updateSlidesToShow);
      return () => window.removeEventListener("resize", updateSlidesToShow);
    }, [])
  
    const [slidesToShow, setSlidesToShow] = useState(3);
    const gapSize = "24";
    const totalGap = (slidesToShow - 1)*gapSize;
    const slidePercent = `calc(${100 / slidesToShow}% - ${totalGap / slidesToShow}px)`

    const title = workshop?.title || 'Titre indisponible';
    const workshopDescription = workshop?.description || "";

    return(
      <div style={{ flex: `0 0 calc(${slidePercent})` }}>
        <div className="bg-white h-full p-2 flex flex-col relative rounded-3xl overflow-hidden">
          <div className="w-full h-0 pb-[60%] relative">
            {workshop?.image?.url
              ? <Image src={workshop?.image?.url} alt='service picture' fill className="rounded-2xl object-cover" priority />
              : <div className="flex h-0 pb-[60%] w-full items-center justify-center bg-gray-100 rounded-lg"></div>
            }
            
          </div>
          <div className="flex-1">
            <h2 className="text-2xl xl:text-xl lg:text-lg sm:text-base font-bold text-secondary mt-4">{title}</h2>
            <p className="text-[#A37C99] sm:text-sm text-ellipsis line-clamp-2">{workshopDescription}</p>
          </div>
          <Link href="/services" className="bg-secondary cursor-pointer my-3 place-self-end rounded-full w-10 h-10 min-w-10 min-h-10 flex items-center justify-center mx-3">
            <Image src={WRightArrow} alt='arrow icon' priority />
          </Link>
        </div>
      </div>
    )
  }
  
  export function CustomButton ({butterfly=false,text, style={width:'fit-content', height:'48px'}}) {
    return(
      <button className="px-10 bg-mainGradient rounded-[50px] text-white font-medium text-lg relative md:text-sm" style={style}>
        <Image src={Butterfly2} alt='butterfly icon' className="absolute h-auto w-12 -right-[25px] -top-[23px]" style={butterfly ? {display:'block'} : {display:'none'}} priority />
        {text}
      </button>
    )
  }

  export function ProSentence ({text}) {
    return(
      <div className="flex gap-2 items-center text-base lg:text-sm">
        <Image src={Check} alt='check icons' className="" /> 
        <p>{text}</p>
      </div>
    )
  }
  
  export function SeancesComp ({seance, index}) {
    return(
      <div className="min-w-0 flex-[0_0_33.33%] h-[150px] pl-10 lg:flex-[0_0_50%] md:flex-[0_0_100%]">
          <div className=" h-full p-2 flex flex-col justify-center items-center text-center gap-2 relative rounded-3xl overflow-hidden" style={index%2 === 0 ? {backgroundColor:'#E25E3E', color:'white'} : {backgroundColor:"#582D3E", color:'white'}}>
            <h1 className="text-2xl lg:text-xl sm:text-lg font-semibold">{seance?.title}</h1>
            <p className="sm:text-sm">{seance?.description}</p>
          </div>
      </div>
    )
  }
  