// import Image from "next/image"
// import add from '../../../public/assets/interface/upload.svg';
// import download from '../../../public/assets/interface/download.svg';
// import downloadHot from '../../../public/assets/hotline/download.svg';
// import deleteDoc from '../../../public/assets/tuteur/deleteList.svg';
// import { ThemeProvider } from "@emotion/react";
// import { CircularProgress } from "@mui/material";
// import { colorTheme } from "../styles/mui";

export function ErrorInput ({error, style}) {
    return(
        <p className={`text-sm text-red-500 w-fit rounded ${style}`}>{error}</p>
    )
}

export function InterfaceTextInput ({name, label, placeholder, options, commonError, commonErrorMessage, type='text', style, labelStyle, defaultValue=""}) {
    return (
        <div className={`${style} flex flex-col tracking-[0.2px] gap-2`}>
            <label htmlFor={name} className={`${labelStyle} text-lg gap-2 font-medium whitespace-nowrap lg:text-base sm:text-sm`}>{label} {commonError && (<ErrorInput error={commonErrorMessage} />)}</label>
            <input type={type} defaultValue={defaultValue} name={name} spellCheck='false' id={name} autoComplete='off' placeholder={placeholder} className="text-black border border-secondary bg-white rounded-[10px] p-4 focus-visible:outline-none md:p-2 md:text-sm" {...options}/>
            
        </div>
    )
}

export function InterfaceTextArea ({ name, label, placeholder, options, commonError, commonErrorMessage , height, labelStyle, style}) {
    return(
        <div className={`${style} col-span-2 flex flex-col tracking-[0.2px] gap-3`}>
            <label htmlFor={name} className={`${labelStyle} text-lg gap-2 font-medium whitespace-nowrap lg:text-base sm:text-sm`}>{label} {commonError && (<ErrorInput error={commonErrorMessage} />)}</label>
            <textarea   className="text-typo border border-secondary rounded-[10px] bg-white p-4 focus-visible:outline-none md:p-2 md:text-sm" rows={height} placeholder={placeholder}
                        id={name} {...options}>
            </textarea>
        </div>
    )
}

// export function InterfaceFiles ({label, docId, setCurrentType, setTargetFile, fileType, setDocId, submitLoading}) {
//     return(
//         <div className='w-full flex flex-col relative gap-3'>
//             {submitLoading 
//                     ?<div className='flex absolute items-center justify-center w-full bg-[#409FC3] h-full'>
//                         <ThemeProvider theme={colorTheme}>
//                             <CircularProgress size="1.5rem" color='secondary'/>
//                         </ThemeProvider>
//                         </div>
//                     : ''
//             }
//             <label className="text-white text-lg lg:text-base sm:text-sm">{label}</label>
//             <input type="file" name={fileType} id={fileType} hidden onClick={(e) => {e.target.value = ''}} onChange={(e) => {setTargetFile(e); setCurrentType(fileType)}}/>
//             <label htmlFor={fileType} className='text-typo bg-white flex w-full gap-2 items-center justify-center p-4 rounded-[10px] cursor-pointer'>
//                 <p>{fileType}</p>
//                 <Image src={add} alt="add new document" className="w-7 h-auto" priority />
//             </label>
//         {docId.filter(doc => doc.title === fileType).length > 0
//         ?
//             <div className="flex items-center gap-3 w-full">
//                 <div onClick={() => {setDocId(docId.filter(doc => doc.title !== fileType))}} className='rounded-lg place-self-start flex items-center justify-center cursor-pointer bg-red-400 hover:bg-red-700 transition-all duration-300 py-1.5 gap-3 w-full max-w-[40px]'>
//                     <Image src={deleteDoc} className='w-6 h-auto' alt='Edit profil pictogram' />
//                 </div>
//                 { 
//                     docId.filter(doc => doc.title === fileType).map(precious => 
//                     <a href={precious.url} download target="_blank" key={precious.id}  className="py-1.5 px-3 bg-white/30 gap-3 rounded-lg w-fit max-w-[300px] overflow-hidden cursor-pointer over:bg-white/50 transition-all duration-300  hover:max-w-none flex justify-between">
//                         <p className='text-ellipsis whitespace-nowrap h'>{precious.title}</p>
//                         <Image src={download} className='w-6 h-auto' alt='download pictogram' />
//                     </a>
//                     )  
//                 }
//             </div>
//         : ""
//         }
//         </div>
//     )
// }


// export function HotlineTextInput ({name, label, placeholder, options, commonError, commonErrorMessage, type='text', style, labelStyle}) {
//     return (
//         <div className={`${style} flex flex-col tracking-[0.2px] gap-2`}>
//             {commonError && (<ErrorInput error={commonErrorMessage} />)}
//             <input type={type} name={name} id={name} placeholder={placeholder} className="text-typo text-sm bg-white border-b border-[#737B7D] p-2 rounded-none focus-visible:outline-none" {...options}/>
//         </div>
//     )
// }

// export function HotlineTextArea ({name, label, placeholder, options, commonError, commonErrorMessage , height, style}) {
//     return (
//         <div className={`${style} flex flex-col tracking-[0.2px] gap-2`}>
//             {commonError && (<ErrorInput error={commonErrorMessage} />)}
//             <textarea   className="text-typo text-sm bg-white border-b border-[#737B7D] p-2 rounded-none focus-visible:outline-none"  rows={height} placeholder={placeholder}
//             id={name} {...options}></textarea>
//         </div>
//     )
// }

// export function HotlineFiles ({label, docId, setCurrentType, setTargetFile, fileType, setDocId, submitLoading}) {
//     return(
//         <div className='w-full flex flex-col relative gap-3 col-span-2'>
//             {submitLoading 
//                     ?<div className='flex absolute items-center justify-center w-full bg-transparent h-full'>
//                         <ThemeProvider theme={colorTheme}>
//                             <CircularProgress size="1.5rem" color='secondary'/>
//                         </ThemeProvider>
//                         </div>
//                     : ''
//             }
//             <input type="file" name={fileType} id={fileType} hidden onClick={(e) => {e.target.value = ''}} onChange={(e) => {setTargetFile(e); setCurrentType(fileType)}} />
//             <label htmlFor={fileType} className='text-[#8E8E8E] border-dashed border mt-5 border-[#8E8E8E] flex w-full gap-2 items-center justify-center px-4 py-8 cursor-pointer'>
//                 <Image src={add} alt="add new document" className="w-5 h-auto" priority />
//                 <p className="text-sm">{fileType}</p>
//             </label>
//         {docId.filter(doc => doc.title === fileType).length > 0
//         ?
//             <div className="flex items-center w-full">
//                 <div onClick={() => {setDocId(docId.filter(doc => doc.title !== fileType))}} className='rounded-lg flex items-center justify-center cursor-pointer bg-red-400 hover:bg-red-700 transition-all duration-300 py-1.5 gap-3 w-8 h-8'>
//                     <Image src={deleteDoc} className='w-5 h-auto' alt='Edit profil pictogram' />
//                 </div>
//                 { 
//                     docId.filter(doc => doc.title === fileType).map(precious => 
//                     <a href={precious.url} download target="_blank" key={precious.id}  className="py-1.5 px-3 bg-white/30 gap-3 rounded-lg w-fit max-w-[300px] overflow-hidden cursor-pointer over:bg-white/50 transition-all duration-300  hover:max-w-none flex justify-between items-center">
//                         <p className='text-ellipsis text-sm text-typo whitespace-nowrap h'>Votre document</p>
//                     </a>
//                     )  
//                 }
//             </div>
//         : ""
//         }
//         </div>
//     )
// }