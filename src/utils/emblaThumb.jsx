import Image from "next/image"
import Services from '../../public/assets/main/services.webp'

export function Thumb (props) {
  const { selected, index, onClick } = props


  return (
    <div className="flex-[0_0_25%] min-w-0 sm:flex-[0_0_15%]">
      <button onClick={onClick} className="embla-thumbs__slide__number">
        <Image src={Services} width={0} height={0} className="w-full rounded-2xl h-auto" alt='Article picture'/>
      </button>
    </div>
  )
}
