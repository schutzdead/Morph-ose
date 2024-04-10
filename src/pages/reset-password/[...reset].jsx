import { CustomHead } from "@/components/customHead"

import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import { colorTheme } from "@/components/styles/mui";
import { Loading } from "@/components/loader";
import { PasswordInput,TextInput } from "@/components/forms/textInput";

import { useState } from "react";

import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const schema = object({
    email:string().required("Required.").email("Invalid email.").trim().lowercase(),
    new_password:string().required("Required.").min(8, "min. 8 characters").trim(),
    confirmPassword:string().required("Required.").oneOf([ref("new_password"), null], "Not identical.").trim()
}).required();

export async function getServerSideProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        }
    }
}  

export default function Reset() {
    const router = useRouter()
    const { t } = useTranslation()

    const [loading, setLoading] = useState(false)
    const [logErr, setlogErr] = useState(false)

    const {reset, control, handleSubmit, formState: {errors}} = useForm ({resolver: yupResolver(schema)})

    async function onSubmit(data) {
        const { email, new_password } = data
        setLoading(true)
        try {
            const response = await fetch('/api/proxy/guest/reset-password', {
                method: "POST",    
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token:router.query.token, 
                    email:email,
                    password:new_password,
                })
            })
            const register = await response.json()
            console.log(register.message);
            if(register.message === 'Votre mot de passe a été réinitialisé !') {
                router.push('/account')
                setLoading(false)
                return
            } else {
                setlogErr(true)
            }
            setLoading(false)
            reset()
        } catch (err) {
            setLoading(false)
            console.error('Request failed:' + err.message)
        }
    }

    return (
      <main>
        <CustomHead pageName='Reset password' metaResume='Reset password'/>
        <div className="w-[100vw] h-[100vh] bg-black/60 items-center justify-center overflow-hidden z-50 absolute top-0 left-0 flex">
            <div className="flex flex-col bg-white w-[400px] pt-2 pb-5 px-7 relative sm:w-[90%]">
            {logErr ? <div className="text-sm text-center text-[#d32f2f] mt-5">{t('resetPassword.error')}</div> : ''}
            {loading 
                ? <Loading />
                : 
            <form onSubmit={handleSubmit(onSubmit)} className='w-full grid grid-cols-1 gap-5'>
                <ThemeProvider theme={colorTheme}>
                    <h1 className="mt-5 font-bold text-[13px] text-center text-gray-600 md:mt-4">{t('resetPassword.title')}</h1>
                    <Controller name="email" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='email' label='Email' placeholder={t('resetPassword.plEmail')} errors={errors?.email} /> 
                                )}
                    />
                    <Controller name="new_password" control={control} defaultValue=""
                                render={({field}) => (
                                  <PasswordInput field={field} name='new_password' label={t('resetPassword.new')} placeholder={t('resetPassword.plNew')} errors={errors?.new_password} /> 
                                  )}
                    />
                    <Controller name="confirmPassword" control={control} defaultValue=""
                                render={({field}) => (
                                    <PasswordInput field={field} name='confirmPassword' label={t('resetPassword.confirm')} placeholder={t('resetPassword.plConfirm')} errors={errors?.confirmPassword} /> 
                                )}
                    />
                    <div className="flex place-self-center">
                        <Button type="submit" variant="contained" sx={{borderRadius:0, mt:4}} className="bg-black w-full">{t('resetPassword.button')}</Button>
                    </div>
                </ThemeProvider>
            </form>
            }
            </div>
        </div>
      </main>
    )
}