import Image from "next/image"
import Services from '../../public/assets/main/services.webp'
import { memo } from "react"

export const Thumb = memo(function Thumb(props) {
  const { onClick } = props
  return (
    <div className="flex-[0_0_25%] min-w-0 sm:flex-[0_0_15%]">
      <button onClick={onClick} className="embla-thumbs__slide__number">
        <Image src={Services} width={1000} height={667} className="w-full object-cover rounded-2xl" alt='Article picture'/>
      </button>
    </div>
  )
})


