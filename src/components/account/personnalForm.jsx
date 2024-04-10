import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import { colorTheme } from "@/components/styles/mui";
import { Loading } from "@/components/loader";
import {TextInput} from "@/components/forms/textInput";

import { useEffect, useMemo, useState } from "react";

import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next'

const schema = object({
    country:string().required("Required.").uppercase().min(3, "Invalid country").max(30, "Invalid Country"),
    post_code:string().required("Required.").matches(/^[0-9]*/, 'Invalid ZIP code.'),
    city:string().required("Required.").min(3, "Invalid city").uppercase(),
    street:string().required("Required.").uppercase(),
    lastname:string().required("Required.").min(3, "3 to 16 characters.").max(16, "3 to 16 characters").trim().uppercase(),
    firstname:string().required("Required.").min(3, "3 to 16 characters.").max(16, "3 to 16 characters.").trim().uppercase(),
    phone:string().required("Required.").matches(/^[0-9]*$/, 'Invalid phone number.'),
}).required();

export default function PersonalForm ({userData}) {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const {reset, control, handleSubmit, formState: {errors}} = useForm ({ 
      resolver: yupResolver(schema),
      defaultValues: useMemo(() => {
        return userData
      }, [userData])
    })

    useEffect(() => {
        reset(userData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    async function onSubmit(data) {
      const { lastname, firstname, phone, country, post_code, city, street } = data
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
                  firstname:firstname,
                  lastname:lastname,
                  phone:phone,
                  address:{
                      street: street,
                      post_code: post_code,
                      city: city,
                      country: country
                  },
              })
          })
          const register = await response.json()
          const newUser = register.user
          for(const property in newUser) {
            if(data[property] === null) {
                data[property] = ''
              }
          }
          const normalizeUser = {...newUser.address, ...newUser}
          setLoading(false)
          reset(normalizeUser)
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
            <form onSubmit={handleSubmit(onSubmit)} className='w-full grid grid-cols-2 gap-5'>
                <ThemeProvider theme={colorTheme}>
                    <h1 className="col-span-2 -mb-2 mt-8 font-bold text-[13px] text-gray-600 md:mt-4">{t('personnal.shipping')}</h1>
                    <Controller name="country" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='country' label={t('personnal.country')} placeholder={t('personnal.plCountry')} errors={errors?.country} /> 
                                )}
                    />
                    <Controller name="post_code" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='post_code' label={t('personnal.ZIP')} placeholder={t('personnal.plZIP')} errors={errors?.post_code} /> 
                                )}
                    />
                    <Controller name="city" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='city' label={t('personnal.city')} placeholder={t('personnal.plCity')} errors={errors?.city} /> 
                                )}
                    />
                    <Controller name="street" control={control} defaultValue=""
                                render={({field}) => (
                                        <TextInput field={field} name='street' label={t('personnal.address')} placeholder={t('personnal.plAddress')} errors={errors?.street} style="col-span-2" /> 
                                )}
                    />
                    <h1 className="col-span-2 -mb-2 mt-10 font-bold text-[13px] text-gray-600 md:mt-4">{t('personnal.personnal')}</h1>
                    <Controller name="firstname" control={control} defaultValue=""
                                render={({field}) => (
                                        <TextInput field={field} name='firstname' label={t('personnal.firstname')} placeholder={t('personnal.plFirstname')} errors={errors?.firstname} />
                                )}
                    />
                    <Controller name="lastname" control={control} defaultValue=""
                                render={({field}) => (
                                        <TextInput field={field} name='lastname' label={t('personnal.lastname')} placeholder={t('personnal.plLastname')} errors={errors?.lastname} />
                                )}
                    />
                    <Controller name="phone" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='phone' label={t('personnal.phone')} placeholder={t('personnal.plPhone')} errors={errors?.phone} style="col-span-2" /> 
                                )}
                    />                    
                    <div className="col-span-1 col-start-2 w-full xl:col-span-2 xl:place-self-center xl:w-[200px]">
                        <Button type="submit" variant="contained" sx={{borderRadius:0, mt:4}} className="bg-black w-full">{t('personnal.button')}</Button>
                    </div>
                </ThemeProvider>
            </form>
        }
      </>
    )
}