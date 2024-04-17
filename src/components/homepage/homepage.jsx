import Image from "next/image";
import RightArrow from '../../../public/assets/main/right.svg'
import WRightArrow from '../../../public/assets/main/white_right.svg'
import Butterfly from '../../../public/assets/main/butterfly.svg'
import Butterfly2 from '../../../public/assets/main/butterfly2.svg'
import Plant1 from '../../../public/assets/main/plant1.svg'
import Services from '../../../public/assets/main/services.webp'

export function Newletter () {
    return(
      <section className="flex flex-col gap-10 mx-10 my-32 sm:my-20 md:mx-5">
        <div className="flex gap-20 bg-homeGradient3 rounded-3xl justify-center px-10 lg:gap-10 sm:gap-8 sm:px-3 ">
          <Image src={Plant1} alt='plant icon' className="self-end w-auto sm:hidden" priority />
          <div className="flex-col flex gap-10 text-white py-20 md:gap-5 sm:py-10 sm:items-center sm:text-center">
            <h1 className="font-Quesha w-fit text-9xl xl:text-6xl md:text-5xl">Gardez la pêche !</h1>
            <p className="font-bold text-2xl lg:text-xl md:text-base">Recevez régulièrement, gratuitement, votre billet de bonne humeur ! </p>
            <div className="bg-white rounded-xl w-fit p-1.5 gap-5 h-14 flex items-center">
              <input type="text" name="" id="" className="appearance-none h-full w-full px-5 text-black" placeholder="Entrez votre adresse email" />
              <button className="text-lg whitespace-nowrap font-semibold lg:text-base sm:text-sm px-4 h-full bg-primary text-white rounded-lg">{`Je m'inscris !`}</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-Quesha w-fit text-8xl xl:text-6xl md:text-4xl text-secondary 2sm:text-3xl">Ou Suivez Nous Sur Instagram...</h1>
          <div className="max-w-screen flex ml-20 gap-2 h-[200px] min-h-[200px] overflow-hidden lg:h-[150px] lg:min-h-[150px] sm:h-[100px] sm:min-h-[100px] lg:ml-0">
            <div className="flex-[0_0_25%] max-w-[200px] h-full lg:max-w-[150px] sm:max-w-[100px]">
              <Image src={Services} alt='plant icon' className="object-cover h-full" priority />
            </div>
            <div className="flex-[0_0_25%] max-w-[200px] h-full lg:max-w-[150px] sm:max-w-[100px]">
              <Image src={Services} alt='plant icon' className="object-cover h-full" priority />
            </div>
            <div className="flex-[0_0_25%] max-w-[200px] h-full lg:max-w-[150px] sm:max-w-[100px]">
              <Image src={Services} alt='plant icon' className="object-cover h-full" priority />
            </div>
            <div className="flex-[0_0_25%] max-w-[200px] h-full lg:max-w-[150px] sm:max-w-[100px]">
              <Image src={Services} alt='plant icon' className="object-cover h-full" priority />
            </div>
          </div>
        </div>
        </section>
    )
  }
  
  export function Title ({butterfly=false, title}) {
    return(
      <div className="relative font-Quesha w-fit text-9xl xl:text-6xl md:text-4xl 2sm:text-center">
        <div className="relative">
          <Image src={Butterfly} alt='butterfly icon' className="absolute h-auto w-16 -left-[53px] -top-[20px] xl:w-12 xl:-left-[41px] xl:-top-[23px] md:w-8 md:-left-[25px] md:-top-[16px]" style={butterfly ? {display:'block'} : {display:'none'}} priority />
          <h1 className="gradient-text2">{title}</h1>
        </div>
        <div className="h-[3px] w-full bg-mainGradient"></div>
      </div>
    )
  }
  
  export function Card ({image, title, description}) {
    return(
      <div className="flex flex-col group rounded-3xl h-full relative overflow-hidden cursor-pointer">
        <div className="rounded-3xl absolute bg-homeGradient1 w-full h-[35%] min-h-[170px] flex flex-col gap-3 items-center justify-center text-white opacity-0 -top-[100%] pb-5 group-hover:top-[0%] group-hover:opacity-100 transition-all ease-out duration-1000 sm:h-[100%] sm:min-h-0 sm:opacity-100 sm:top-0">
          <h2 className="text-3xl font-bold lg:text-2xl sm:text-lg text-center">{title.toUpperCase()}</h2>
          <p className="font-bold text-center px-2 sm:text-sm">{description}</p>
          <button className="bg-white px-3 py-1 rounded-3xl text-xs font-bold flex gap-1 items-center absolute right-5 bottom-3">
            <p className="gradient-text2">Voir plus</p>
            <Image src={RightArrow} alt='arrow icon' className="mt-[2px]" priority />
          </button>
        </div>
        <Image src={image} alt='categories picture' className="h-full object-cover" priority />
      </div>
    )
  }
  
  export function Picto ({image, text, title}) {
    return(
      <div className="flex flex-col items-center max-w-[300px] text-center lg:max-w-[250px]">
        <Image src={image} alt='pictogram description' className="mt-[2px] w-16 h-auto xl:w-12" priority />
        <h2 className="font-Quesha text-[#E25E3E] text-6xl xl:text-5xl lg:text-4xl text-center">{title}</h2>
        <p className="text-secondary font-medium lg:text-sm mt-2">{text}</p>
      </div>
    )
  }
  
  export function Service ({workshop, description}) {
    return(
      <div className="min-w-0 flex-[0_0_33.33%] pl-5 h-fit lg:flex-[0_0_50%] md:flex-[0_0_100%]">
        <div className="bg-white h-full p-2 flex flex-col relative rounded-3xl overflow-hidden">
          <div className="w-full h-0 pb-[60%] relative">
            <Image src={workshop?.image?.url} alt='service picture' fill className="rounded-2xl object-cover" priority />
          </div>
          <h2 className="text-3xl xl:text-2xl lg:text-xl sm:text-lg font-bold text-secondary mt-4">{workshop?.title}</h2>
          <p className="text-[#A37C99] sm:text-sm">{description}</p>
          <div className="bg-secondary cursor-pointer my-3 place-self-end rounded-full w-10 h-10 min-w-10 min-h-10 flex items-center justify-center mx-3">
            <Image src={WRightArrow} alt='arrow icon' className="" priority />
          </div>
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