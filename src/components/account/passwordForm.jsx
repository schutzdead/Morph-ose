import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import { colorTheme } from "@/components/styles/mui";
import { Loading } from "@/utils/loader";
import { PasswordInput } from "../forms/textInput";
import { useTranslation } from 'next-i18next'
import { useState } from "react";

import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


const schema = object({
  current_password:string().required("Required.").min(8, "min. 8 characters").trim(),
  new_password:string().required("Required.").min(8, "min. 8 characters").trim(),
  confirmPassword:string().required("Required.").oneOf([ref("new_password"), null], "Not identical.").trim()
}).required();

export default function PasswordForm () {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    const {reset, control, handleSubmit, formState: {errors}} = useForm ({resolver: yupResolver(schema)})

    async function onSubmit(data) {
      const { current_password, new_password } = data
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
                  current_password:current_password,
                  password:new_password,
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
                    <h1 className=" -mb-2 mt-8 font-bold text-[13px] text-gray-600 md:mt-4">{t('password.title')}</h1>
                    <Controller name="current_password" control={control} defaultValue=""
                                render={({field}) => (
                                    <PasswordInput field={field} name='current_password' label={t('password.current')} placeholder={t('password.plCurrent')} errors={errors?.current_password} /> 
                                )}
                    />
                    <Controller name="new_password" control={control} defaultValue=""
                                render={({field}) => (
                                  <PasswordInput field={field} name='new_password' label={t('password.new')} placeholder={t('password.plNew')} errors={errors?.new_password} /> 
                                  )}
                    />
                    <Controller name="confirmPassword" control={control} defaultValue=""
                                render={({field}) => (
                                    <PasswordInput field={field} name='confirmPassword' label={t('password.confirm')} placeholder={t('password.plConfirm')} errors={errors?.confirmPassword} /> 
                                )}
                    />
                    <div className="w-[200px] place-self-center">
                        <Button type="submit" variant="contained" sx={{borderRadius:0, mt:4}} className="bg-black w-full">{t('password.button')}</Button>
                    </div>
                </ThemeProvider>
            </form>
        }
      </>
    )
}