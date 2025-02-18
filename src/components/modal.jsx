import { Fragment, useEffect, useState, useCallback } from "react"
import { Dialog, DialogPanel, DialogTitle, Popover, PopoverButton, PopoverGroup, PopoverPanel, Transition, TransitionChild } from '@headlessui/react'
import Image from "next/image"

import arrow from "../../public/assets/essentials-icons/down_arrow_brown.svg"

import Link from "next/link"

export default function SideModal ({open, setOpen, children}) {
    return(
        <>
            <Transition show={open} as={Fragment}>
                {/* BACKGROUND */}
                <Dialog className="relative z-50" onClose={() => setOpen(false)}>
                    <TransitionChild as="div" enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0" >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 duration-100 transition-opacity" />
                    </TransitionChild>
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full great-scrollbar-y overflow-y-auto overflow-x-hidden">
                        <TransitionChild as={Fragment} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x-0" leaveTo="translate-x-full" >
                            {/* THE MODAL, CLICK OUT CLOSE MODAL */}
                            <DialogPanel className="pointer-events-auto relative w-screen max-w-[410px] overflow-y-auto great-scrollbar-y overflow-x-hidden">
                               {children}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export function CenterModal ({open, setOpen, children}) {
    return(
        <>
        <Transition show={open} as={Fragment}>
                {/* BACKGROUND */}
                <Dialog className="relative z-50" onClose={setOpen}>

                    <TransitionChild as="div" enter="ease-in-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-200" leaveFrom="opacity-100" leaveTo="opacity-0" >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 duration-100 transition-opacity" />
                    </TransitionChild>

                    <div className="pointer-events-none fixed inset-y-[2.5vh] flex max-w-full w-full h-full overflow-y-auto  2sm:inset-y-0">
                        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" >
                            {/* THE MODAL, CLICK OUT CLOSE MODAL */}
                            <DialogPanel className="pointer-events-auto left-1/2 -translate-x-1/2 rounded-xl relative max-w-3xl bg-white h-fit max-h-[95vh] overflow-y-auto scrollbar-thumb-primary/20 scrollbar-thin scrollbar-track-primary/20 2sm:rounded-none 2sm:max-h-full">
                               {children}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
            {/* <Transition show={open} as={Fragment}>
                <Dialog className="relative z-50" onClose={() => setOpen(false)}>

                    <TransitionChild as="div" enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0" >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 duration-100 transition-opacity" />
                    </TransitionChild>

                    <div className="pointer-events-none fixed inset-y-0 left-1/2 flex max-w-full -translate-x-1/2">
                        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" >
                            <DialogPanel className="pointer-events-auto relative">
                               {children}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition> */}
        </>
    )
}

export function WarningModal ({open, setOpen, title, message, svg, color100, color500, button}) {
    return(
        <Transition show={open} as={Fragment}>
            <Dialog className="relative z-50" onClose={() => setOpen(false)}>

                <TransitionChild as="div" enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="pointer-events-none fixed inset-0 w-screen overflow-y-auto flex min-h-full items-center justify-center text-center">
                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">

                        <DialogPanel className="pointer-events-auto relative transform overflow-y-auto overflow-x-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg mx-3">
                            <div className="bg-white p-4">
                                <div className="flex items-start">
                                    <div className={`flex flex-shrink-0 items-center justify-center rounded-full ${color100} mx-0 h-10 w-10`}>
                                        {svg}
                                    </div>
                                    <div className="ml-4 mt-0 text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">{title}</DialogTitle>
                                        <div className="mt-2">
                                            <div className="text-sm text-gray-500">{message}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {button}
                           
                        </DialogPanel>

                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}

export function NavModal () {

    const navigation = {
        categories:[
            {
                name:"Nos coffrets",
                // featured:[
                //     {name:"Textile"}
                // ], 
                sections:[
                    // { name:"Nos box naissance", 
                    //   items: collection?.filter(item => item.title !== "Fait main" && item.title !== "Couches" ),
                    //   ref:"products"
                    // },
                    { name:"Boxs grossesse", ref:"box/pregnancy" },
                    { name:"Boxs naissance", ref:"box/birth" },
                    { name:"Boxs personnalisable", ref:"custom-box" },
                ]
            }
        ], 
    }

    // const [currentChoice, setCurrentChoice] = useState(null)
    // useEffect(() => {
    //     if(collection[0]){
    //         setCurrentChoice(collection[0])
    //     }
    // }, [collection])

    return(
        <PopoverGroup className="block self-stretch">
            {navigation?.categories?.map((category) => (
                <Popover key={category.name} className="flex relative">
                        <PopoverButton className="font-medium flex w-full items-center hover:bg-typo/10 outline-none border-none shadow-none transition-all duration-500 rounded-lg p-1 data-[open]:bg-typo/10">
                            <p>{category.name}</p>
                            <Image src={arrow} alt='arrow icon' className='w-6 h-auto' />
                        </PopoverButton>

                        <PopoverPanel transition className="mt-3 rounded-xl overflow-hidden absolute w-[250px] inset-x-0 top-full transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in" >
                        {({ close }) => (
                            <>
                                <div className="relative bg-white">
                                    <div className="flex flex-col divide-y-2 divide-typo/20 border-2 border-typo/20 rounded-xl overflow-hidden w-full">
                                    {category?.sections?.map((section) => (
                                        <div key={section.name} className="w-full h-full flex hover:bg-typo/10">
                                            <Link href={`/${section.ref}`} onClick={close} className=" text-typo font-medium text-lg lg:text-base p-3 w-full h-full">{section.name}</Link>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </>
                        )}
                        </PopoverPanel>
                </Popover>
            ))}
        </PopoverGroup>
    )
}

export function CenterModal2 ({open, setOpen, children}) {
    
    return(
        <>
            <Transition show={open} as={Fragment}>
                {/* BACKGROUND */}
                <Dialog className="relative z-50" onClose={() => setOpen(false)}>

                    <TransitionChild as="div" enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0" >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 duration-100 transition-opacity" />
                    </TransitionChild>

                    <div className="pointer-events-none fixed inset-y-[2.5vh] flex max-w-full w-full h-full overflow-y-auto">
                        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" >
                            {/* THE MODAL, CLICK OUT CLOSE MODAL */}
                            <DialogPanel className="pointer-events-auto left-1/2 -translate-x-1/2 rounded-lg relative w-fit bg-white h-fit max-h-[95vh] overflow-y-auto sm:max-w-[95vw]">
                               {children}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}