import Image from "next/image"
import { memo } from "react"

export const Thumb = memo(function Thumb(props) {
  const { onClick, index } = props
  return (
    <div className="flex-[0_0_25%] min-w-0 h-full sm:flex-[0_0_15%]">
      <button onClick={onClick} className="embla-thumbs__slide__number w-full h-full relative">
        <Image src={index} fill className="object-cover rounded-2xl" alt='Article picture'/>
      </button>
    </div>
  )
})
