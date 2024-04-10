import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import { colorTheme } from "@/components/styles/mui";
import { Loading } from "@/components/loader";
import { PasswordInput, TextInput } from "../forms/textInput";

import { useState } from "react";

import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next'

const schema = object({
  email:string().required("Required.").email("Invalid email.").trim().lowercase(),
  password:string().required("Required.").min(8, "min. 8 characters").trim(),
}).required();

export default function MailForm () {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    const {reset, control, handleSubmit, formState: {errors}} = useForm ({resolver: yupResolver(schema)})

    async function onSubmit(data) {
      const { email, password } = data
      setLoading(true)
      try {
          const response = await fetch('/api/proxy/auth/users/current', {
              method: "POST",    
              mode: "cors",
              headers: {
                  "Accept": "application/json",
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                  email:email,
                  current_password:password
              })
          })
          const register = await response.json()
          setLoading(false)
          reset()
      } catch (err) {
          setLoading(false)
          console.error('Request failed:' + err.message)
      }
  }

    return(
      <>
        {loading 
            ? <Loading />
            : 
            <form onSubmit={handleSubmit(onSubmit)} className='w-full grid grid-cols-1 gap-5'>
                <ThemeProvider theme={colorTheme}>
                    <h1 className=" -mb-2 mt-8 font-bold text-[13px] text-gray-600 md:mt-4">{t('mail.title')}</h1>
                    <Controller name="email" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='email' label={t('mail.mail')} placeholder={t('mail.plMail')} errors={errors?.email} /> 
                                )}
                    />
                    <Controller name="password" control={control} defaultValue=""
                                render={({field}) => (
                                    <PasswordInput field={field} name='password' label={t('mail.password')} placeholder={t('mail.plPassword')}errors={errors?.password} /> 
                                )}
                    />
                   
                    <div className="w-[200px] place-self-center">
                        <Button type="submit" variant="contained" sx={{borderRadius:0, mt:4}} className="bg-black w-full">{t('mail.button')}</Button>
                    </div>
                </ThemeProvider>
            </form>
        }
      </>
    )
}