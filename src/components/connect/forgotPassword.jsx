import { useState } from "react";
import { Controller } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { Button, TextField, ThemeProvider} from "@mui/material";
import Image from "next/image";
import { useTranslation } from 'next-i18next'

import Close from "../../../public/assets/close.svg"
import Check from "../../../public/assets/check.svg"
import { colorTheme, nobgCompletion } from "../styles/mui";
import { Loading } from "../../utils/loader";
import { unlock } from "@/utils/lockScreen";
import { useRouter } from "next/router";

const schema = object({
    forgotEmail:string().required("Required.").email("Invalid email."),
}).required();

export function ForgotPassword ({forgotCard, setForgotCard}) {
    const { t } = useTranslation()
    const  {reset, control, handleSubmit, formState: {errors}} = useForm ({ resolver:  yupResolver(schema)})
    const [logErr, setlogErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [mailSend, setMailSend] = useState(false)

    async function onSubmit(data) {
        setLoading(true)
        const { forgotEmail } = data
		try {
            const response = await fetch(`https://api.bat-n3.darianne.fr/guest/forgot-password`, {
                method: "POST",    
                mode: "cors",
                headers: {
                    'Accept-Language': router.locale,
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: forgotEmail })
            })
            if(response.status === 200){
                setLoading(false)
                setMailSend(true)
                return
            }
            setLoading(false)
            setlogErr(true)
            reset()
		} catch (err) {
			console.error('Request failed:' + err)
            setLoading(false)
            setlogErr(true)
		}
	}

 
    return(
        <div className="w-[100vw] h-[100vh] bg-black/60 items-center justify-center overflow-hidden z-50 absolute top-0 left-0"
             style={forgotCard ? {display:"flex"} : {display:"none"}}>
            <div className="flex flex-col bg-white w-[400px] pt-2 pb-5 px-7 relative sm:w-[90%]">
                <Image src={Close} alt="Close pictogram" 
                       onClick={() => {setMailSend(false); setlogErr(false); setForgotCard(false); unlock()}} 
                       className='self-end -mr-5 h-7 w-auto cursor-pointer' />
                {mailSend
                ? 
                <>
                    <div className="mt-3 mb-7 h-9 w-9 self-center flex items-center justify-center border-2 border-primary-color animate-[2s_forwards_rotation]">
                        <Image src={Check} alt="Validate pictogram" />
                    </div>
                    <div className="text-center flex flex-col mb-5 items-center gap-1">
                        <p>{t('forgotPassword.send')}</p>
                        <p>{t('forgotPassword.mailbox')}</p>
                    </div>
                </>
                :
                <>
                    <h1 className="text-lg text-center py-5">{t('forgotPassword.title')}</h1>
                    {logErr ? <div className="text-sm text-[#d32f2f] text-center mb-5">{t('forgotPassword.error')}</div> : ''}
                    {loading
                    ? <Loading />
                    :
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 relative justify-center">
                        <ThemeProvider theme={colorTheme}>
                            <Controller name="forgotEmail" control={control} defaultValue=""
                                        render={
                                            ({field}) => (
                                                <TextField {...field}
                                                    inputProps= {{ style: nobgCompletion }}
                                                    id="forgotEmail" type="text"
                                                    variant="standard"
                                                    label="Email" placeholder={t('forgotPassword.plEmail')}
                                                    helperText= {errors?.forgotEmail ? errors?.forgotEmail?.message : ""}
                                                    error={errors?.forgotEmail ? Boolean(true) : Boolean(false)}
                                                />
                                            )}
                            />
                            <Button type='submit' variant="contained" sx={{borderRadius:0, mt:4}} className="bg-black">{t('forgotPassword.button')}</Button>
                        </ThemeProvider>
                    </form>
                }
                </>
                }
            </div>
        </div>
    )
}