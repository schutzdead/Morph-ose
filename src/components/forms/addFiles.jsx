import Image from "next/image";
import add from '../../../public/assets/dashboard/add.svg';
import deleteDoc from '../../../public/assets/dashboard/delete.svg'; 
import { CircularLoading } from "@/utils/loader";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function AddFiles ({docId, fileType, setDocId}) {
    // const [submitLoading, setSubmitLoading] = useState(false)
    
    // async function uploadFile(e){
    //     const formData = new FormData();
    //     if(e?.target?.files?.length > 0) {
    //         for (var x = 0; x < e?.target?.files?.length ; x++) {
    //             formData.append("images[]", e?.target?.files[x]);
    //         }
    //     } else {    
    //         return
    //     }
    //     setSubmitLoading(true)
        
    //     try {
    //         const form = await fetch(`/api/proxy/auth/admin/images/upload`, {
    //             method: "POST", 
    //             headers: {
    //                 "Accept": "application/json",
    //             },
    //             mode: "cors", 
    //             body: formData
    //         })
    //         const register = await form.json()
    //         setDocId([...docId, register.map(image => ({id:image.id, url:image.url}))].flat())
    //         setSubmitLoading(false)
    //     } catch (err) {
    //         setSubmitLoading(false)
    //         console.error('Request failed:' + err.message)
    //     }
    // }

    return(
        <div className='w-full flex flex-col gap-3 mb-10 sm:mb-5'>
            {/* {submitLoading ? <CircularLoading />
            : 
            <> */}
                {/* <input type="file" id={fileType} multiple hidden onChange={(e) => {uploadFile(e)}}/> */}
                {/* <label htmlFor={fileType} className='bg-secondary/70 hover:bg-secondary transition-all place-self-start duration-300 flex items-center text-white py-1.5 pl-2 pr-4 rounded cursor-pointer text-sm w-fit'>
                    <Image src={add} alt="add new document" className="w-7 h-auto" priority />
                    <p className="font-semibold text-white text-base mb-[2px] sm:text-sm">Ajouter des photos</p>
                </label> */}
                <div className="flex justify-start flex-wrap gap-10 mt-5">
                    {docId.length > 0
                    ? docId.map(precious => 
                        <div className="flex flex-col items-center gap-2 w-fit" key={precious.id}>
                            <div className="w-28 h-28 min-h-28 min-w-28 relative">
                                <Image src={precious.url} alt="Image downloaded" fill className="rounded-2xl object-cover" priority />
                            </div>
                            {/* <div onClick={() => {setDocId(docId.filter(doc => doc.id !== precious.id))}} className='rounded-lg flex items-center w-full justify-center cursor-pointer bg-red-700/80 py-1 gap-3 max-w-28'>
                                <Image src={deleteDoc} className='w-5 h-auto' alt='Edit profil pictogram' />
                            </div> */}
                        </div>
                    )
                    : 'Aucune photo'
                    }
                </div>
            {/* </>
            } */}
        </div>
    )
}

export function AddFile ({docId, fileType, setDocId}) {
    const [submitLoading, setSubmitLoading] = useState(false)
    async function uploadFile(e){
        const formData = new FormData();
        if(e?.target?.files?.length > 0) {
            formData.append("images", e?.target?.files[0]);
        } else {    
            return
        }
        setSubmitLoading(true)
        
        try {
            const form = await fetch(`${API_URL}/images/upload`, {
                method: "POST", 
                headers: {
                    "Accept": "application/json",
                },
                body: formData
            })
            
            const register = await form.json()
            
            setDocId(register.map(image => ({id:image.id, url:image.url})))
            setSubmitLoading(false)
        } catch (err) {
            setSubmitLoading(false)
            console.error('Request failed:' + err.message)
        }
    }

    return(
        <div className='w-full flex flex-col gap-3 mb-10 sm:mb-5'>
            {submitLoading ? <CircularLoading />
            : 
            <>
                <input type="file" id={fileType} hidden onChange={(e) => {uploadFile(e)}}/>
                <label htmlFor={fileType} className='bg-secondary/70 hover:bg-secondary transition-all place-self-start duration-300 flex items-center text-white py-1.5 pl-2 pr-4 rounded cursor-pointer text-sm w-fit'>
                    <Image src={add} alt="add new document" className="w-7 h-auto" priority />
                    <p className="font-semibold text-white text-base mb-[2px] sm:text-sm">Ajouter des photos</p>
                </label>
                <div className="flex justify-start flex-wrap gap-10 mt-5">
                    {docId.length > 0
                    ? docId.map(precious => 
                        <div className="flex flex-col items-center gap-2 w-fit" key={precious.id}>
                            <div className="w-28 h-28 min-h-28 min-w-28 relative">
                                <Image src={precious.url} alt="Image downloaded" fill className="rounded-2xl object-cover" priority />
                            </div>
                            <div onClick={() => {setDocId(docId.filter(doc => doc.id !== precious.id))}} className='rounded-lg flex items-center w-full justify-center cursor-pointer bg-red-700/80 py-1 gap-3 max-w-28'>
                                <Image src={deleteDoc} className='w-5 h-auto' alt='Edit profil pictogram' />
                            </div>
                        </div>
                    )
                    : ''
                    }
                </div>
            </>
            }
        </div>
    )
}

export function AddPDF ({docId, fileType, setDocId}) {
    const [submitLoading, setSubmitLoading] = useState(false)
    async function uploadFile(e){
        const formData = new FormData();
        if(e?.target?.files?.length > 0) {
            formData.append("file", e?.target?.files[0]);
        } else {    
            return
        }
        setSubmitLoading(true)
        
        try {
            const form = await fetch(`${API_URL}/files/upload`, {method: "POST", mode: "cors", body: formData})
            const register = await form.json()
            setDocId(register.map(files => ({id:files.id, url:files.download_url})))
            setSubmitLoading(false)
        } catch (err) {
            setSubmitLoading(false)
            console.error('Request failed:' + err.message)
        }
    }

    return(
        <div className='w-full flex flex-col items-center gap-3 my-4'>
            {submitLoading 
                ? <CircularLoading />
                : 
                <>
                <input type="file" id={fileType} hidden onChange={(e) => {uploadFile(e)}}/>
                <label htmlFor={fileType} className='bg-secondary/70 hover:bg-secondary transition-all place-self-start duration-300 flex items-center text-white py-1.5 pl-2 pr-4 rounded cursor-pointer text-sm w-fit'>
                <Image src={add} alt="add new document" className="w-7 h-auto" priority />
                        <p className="font-semibold text-white text-base mb-[2px] sm:text-sm">Ajouter votre RIB</p>
                </label>
                {docId.length > 0
                        ? docId.map(precious => <a key={precious.id} href={precious.url} download className='cursor-pointer py-1.5 place-self-start px-3 bg-secondary/10 rounded-lg w-fit overflow-hidden text-ellipsis whitespace-nowrap hover:bg-secondary/20 transition-all duration-300  hover:max-w-none'>RIB importé</a>
                    )
                    : ''
                }
            </>}
        </div>
    )
}