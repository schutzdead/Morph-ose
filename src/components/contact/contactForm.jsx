import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

import { Loading } from "../../utils/loader";
import { colorTheme, nobgCompletion } from "../styles/mui";

import Image from "next/image";
import Close from '../../../public/assets/close.svg'
import Check from '../../../public/assets/check.svg'
import { lock, unlock } from "@/utils/lockScreen";
import { useTranslation } from 'next-i18next'

const schema = object({
    name:string().required("Required.").min(3, "3 to 16 characters.").max(16, "3 to 16 characters.").trim().uppercase(),
    email:string().required("Required.").email("Invalid email.").trim().lowercase(),
    message:string().required("Required.").min(10, "Message too short")
}).required();

export function ContactForm () {
    const { t } = useTranslation()
    const  {reset, control, handleSubmit, formState: {errors}} = useForm ({ resolver:  yupResolver(schema)})
    const [loading, setLoading] = useState(false)
    const [logErr, setlogErr] = useState(false)
    const [mailSend, setMailSend] = useState(false)

    async function onSubmit(data) {
        const { name, email, message } = data
        setLoading(true)
        try {
            const response = await fetch('/api/proxy/contact', {
                method: "POST",    
                credentials: 'include', 
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name:name, 
                    email:email, 
                    message:message, 
                })
            })
            if(response.status === 200) {
                reset()
                setLoading(false)
                setMailSend(true)
                window?.scrollTo({top: 0, left: 0});
                lock()
            } else {
                setLoading(false)
                setlogErr(true)
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.error('Request failed:' + err.message)
        }
    }

    return (
        <>
        {mailSend ? <MailSend setMailSend={setMailSend} setlogErr={setlogErr} /> : ''}
        {logErr ? <div className="text-sm text-[#d32f2f] text-center mb-5 scroll-mt-28" id="errorContact">{t('contact.error')}</div> : ''}
        {loading 
            ? <Loading />
            : <form onSubmit={handleSubmit(onSubmit)} className='w-full grid grid-cols-2 gap-10 relative place-self-center' id="contact">
                <ThemeProvider theme={colorTheme}>
                    <Controller name="name" control={control} defaultValue=""
                                render={
                                    ({field}) => (
                                        <TextField {...field}
                                            inputProps={{ style: nobgCompletion }}
                                            autoComplete="off"   
                                            id="name" type="text" 
                                            variant="standard" 
                                            label={t('contact.name')} placeholder={t('contact.plName')} 
                                            helperText= {errors?.name ? errors?.name?.message : ""}
                                            error={errors?.name ? Boolean(true) : Boolean(false)} 
                                        />
                                    )}
                    />
                    <Controller name="email" control={control} defaultValue=""
                                render={
                                    ({field}) => (
                                        <TextField {...field}
                                            inputProps={{ style: nobgCompletion }} 
                                            autoComplete="off" 
                                            id="email" type="text" 
                                            variant="standard" 
                                            label="Email" placeholder={t('contact.plEmail')} 
                                            helperText= {errors?.email ? errors?.email?.message : ""}
                                            error={errors?.email ? Boolean(true) : Boolean(false)}
                                            className="col-span-2"
                                        />
                                    )}
                    />
                    <Controller name="message" control={control} defaultValue=""
                                render={
                                    ({field}) => (
                                        <TextField {...field}
                                            inputProps={{ style: nobgCompletion }} 
                                            autoComplete="off" 
                                            id="message" type="text" 
                                            variant="standard" 
                                            multiline
                                            minRows={4}
                                            label={t('contact.comment')}placeholder={t('contact.plComment')} 
                                            helperText= {errors?.message ? errors?.message?.message : ""}
                                            error={errors?.message ? Boolean(true) : Boolean(false)}
                                            className="col-span-2 pl"
                                        />
                                    )}
                    />
                    <p className='text-xs font-light col-span-2'>{t('contact.agree1')} <span className='font-bold'>{t('contact.agree2')}*</span>.</p>
                    <Button type="submit" variant="contained" sx={{borderRadius:0}} className="bg-black col-span-2">{t('contact.button')}</Button>
                </ThemeProvider>
            </form>
        }
        </>
    )
}


function MailSend ({setMailSend, setlogErr}) {
    const { t } = useTranslation()
    return(
        <div className="w-[100vw] h-[100vh] flex bg-black/60 items-center justify-center overflow-hidden z-50 absolute top-0 left-0">
            <div className="flex flex-col bg-white w-[400px] pt-2 pb-5 px-7 relative sm:w-[90%]">
                <Image src={Close} alt="Close pictogram" 
                        onClick={() => {setMailSend(false); setlogErr(false); unlock()}} 
                        className='self-end -mr-5 h-7 w-auto cursor-pointer' />
                <>
                    <div className="mt-3 mb-7 h-9 w-9 self-center flex items-center justify-center border-2 border-primary-color animate-[2s_forwards_rotation]">
                        <Image src={Check} alt="Validate pictogram" />
                    </div>
                    <div className="text-center flex flex-col mb-5 items-center gap-1">
                        <p>{t('contact.send')}</p>
                        <p>{t('contact.process')}</p>
                    </div>
                </>
            </div>
        </div>
    )
}