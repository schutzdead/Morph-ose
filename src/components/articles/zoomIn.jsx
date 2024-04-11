import { useEffect, useRef } from "react";
import Image from "next/image";

import { register } from "swiper/element/bundle";
import { v4 as uuidv4 } from 'uuid';
register();

import Close from "../../../public/assets/close.svg"
import { Loading } from "../../utils/loader";
import { unlock } from "@/utils/lockScreen";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ZoomIn ({setZoom, zoom, product}) {
    const swiperRef = useRef(null);
    useEffect(() => {
        const swiperContainer = swiperRef.current;
        Object.assign(swiperContainer, swiperParams);
        swiperContainer.initialize();
    }, [])



    return(
        <div className="max-w-[100vw] max-h-[100vh] w-[100vw] h-[100vh] grid-cols-1 bg-white z-50 absolute top-0 left-0 bottom-0 right-0"
            style={zoom ? {display:"grid"} : {display:"none"}}>
            <swiper-container ref={swiperRef} class="max-h-[100vh] w-auto flex" init="false"> 
                {product?.images.map(item => 
                    <swiper-slide key={uuidv4()} class='flex justify-center items-center'>
                        <Image src={item.url} alt='Article picture' width={0} height={0} className="h-auto w-auto max-h-full place-self-center" priority/>
                    </swiper-slide>
                )}
            </swiper-container>       
            <Image src={Close} alt="Close pictogram" 
                    onClick={() => {setZoom(false); unlock()}} 
                    className='z-10 absolute top-5 right-10 h-7 w-auto cursor-pointer md:right-5 md:h-10' />
        </div>
    )
}

const swiperParams = {
    slidesPerView: 'auto',
    navigation: true,
    injectStyles: [
        `
        .swiper-button-next,
        .swiper-button-prev {
            color: black;
            width: 10px;
            height: auto;
        }
        .swiper-pagination-bullet{
            background-color: black;
        }
        .swiper-slide{
            width: fit-content;
        }
    `,
    ],
};