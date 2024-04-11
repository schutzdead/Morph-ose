import { useCallback, useEffect, useState } from 'react'
import left from '../../public/assets/main/chevron-left.svg'
import right from '../../public/assets/main/chevron-right.svg'
import Image from "next/image";

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

export const PrevButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button {...restProps}>
      <div className='arrow w-8 h-8 min-h-8 min-w-8 flex items-center justify-center rounded-full bg-primary md:h-6'>
          <Image src={left} alt='left chevron' className='' priority />
      </div>
      {children}
    </button>
  )
}

export const NextButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button {...restProps}>
      <div className='arrow w-8 h-8 min-h-8 min-w-8 flex items-center justify-center rounded-full bg-primary md:h-6'>
          <Image src={right} alt='left chevron' className='' priority />
      </div>
          {children}
    </button>
  )
}
