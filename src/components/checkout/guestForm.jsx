import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ThemeProvider, Checkbox } from "@mui/material";
import { useState, useContext, useEffect, useMemo } from "react";
import { CartContext } from "@/utils/cartProvider";
import { TextInput } from "../forms/textInput";
import { useTranslation } from 'next-i18next'

import { Loading } from "../../utils/loader";
import { colorTheme } from "../styles/mui";
import { useRouter } from "next/router";

const schema = object({
    email:string().required("Required.").email("Invalid email.").trim().lowercase(),
    country:string().required("Required.").uppercase().min(3, "Invalid country").max(30, "Invalid Country"),
    post_code:string().required("Required.").matches(/^[0-9]*/, 'Invalid ZIP code.'),
    city:string().required("Required.").min(3, "Invalid city").uppercase(),
    street:string().required("Required.").uppercase(),
    lastname:string().required("Required.").min(3, "3 to 16 characters.").max(16, "3 to 16 characters").trim().uppercase(),
    firstname:string().required("Required.").min(3, "3 to 16 characters.").max(16, "3 to 16 characters.").trim().uppercase(),
    phone:string().required("Required.").matches(/^[0-9]*$/, 'Invalid phone number.'),
    
    bill_name:string().trim().uppercase(),
    bill_country:string().uppercase(),
    bill_post_code:string().matches(/^[0-9]*/, 'Invalid ZIP code.'),
    bill_city:string().uppercase(),
    bill_street:string().uppercase(),
}).required();

export function GuestForm ({userData}) { 
    const { t } = useTranslation()   
    const {reset, control, handleSubmit, formState: {errors}} = useForm ({ 
        resolver:  yupResolver(schema),
        defaultValues: useMemo(() => {
            return userData
          }, [userData])
    })

    useEffect(() => {
        reset(userData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    const [loading, setLoading] = useState(false)
    const { cart } = useContext(CartContext)
    
    if(cart?.length > 0) console.log(cart[0]?.sizeId);

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    const router = useRouter()

    async function onSubmit(data) {
        const { email, lastname, firstname, phone, country, post_code, city, street, bill_city, bill_country, bill_name, bill_post_code, bill_street } = data
        setLoading(true)
        try {
            const response = await fetch('/api/proxy/orders', {
                method: "POST",    
                mode: "cors",
                headers: {
                    'Accept-Language': router.locale,
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    firstname:firstname,
                    lastname:lastname,
                    email:email,
                    phone:phone,
                    shipping_address:{
                        street: street,
                        post_code: post_code,
                        city: city,
                        country: country
                    },
                    billing_address:{
                        firstname: bill_name || lastname,
                        street: bill_street || street,
                        post_code: bill_post_code || post_code,
                        city: bill_city || city,
                        country: bill_country || country
                    },
                    products:
                        cart.map((product) => 
                            ({
                                id: product.id,
                                quantity: product.quantity,
                                variante_id: product.sizeId
                            })
                        ),
                })
            })
            const register = await response.json()
            const url = await register.stripe_session.url
            if(response.status === 200)  { 
                location.assign(url)
            }
            setLoading(false)
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
            <form onSubmit={handleSubmit(onSubmit)} id="guestForm" className='w-full grid grid-cols-2 gap-5 relative place-self-center'>
                <ThemeProvider theme={colorTheme}>
                    <Controller name="email" control={control} defaultValue=''
                                render={({field}) => (
                                        <TextInput field={field} name='email' label='Email' placeholder={t('checkout.plEmail')} errors={errors?.email} style="col-span-2"/>
                                )}
                    />
                    <h1 className="col-span-2 -mb-2 mt-8 font-bold text-[13px] text-gray-600 md:mt-4">{t('checkout.shipping')}</h1>
                    <Controller name="country" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='country' label={t('checkout.country')} placeholder={t('checkout.plCountry')} errors={errors?.country} /> 
                                )}
                    />
                    <Controller name="post_code" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='post_code' label={t('checkout.ZIP')} placeholder={t('checkout.plZIP')} errors={errors?.post_code} /> 
                                )}
                    />
                    <Controller name="city" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='city' label={t('checkout.city')} placeholder={t('checkout.plCity')} errors={errors?.city} /> 
                                )}
                    />
                    <Controller name="street" control={control} defaultValue=""
                                render={({field}) => (
                                        <TextInput field={field} name='street' label={t('checkout.address')} placeholder={t('checkout.plAddress')} errors={errors?.street} style="col-span-2" /> 
                                )}
                    />
                    <h1 className="col-span-2 -mb-2 mt-10 font-bold text-[13px] text-gray-600 md:mt-4">{t('checkout.personnal')}</h1>
                    <Controller name="firstname" control={control} defaultValue=""
                                render={({field}) => (
                                        <TextInput field={field} name='firstname' label={t('checkout.firstname')} placeholder={t('checkout.plFirstname')} errors={errors?.firstname} />
                                )}
                    />
                    <Controller name="lastname" control={control} defaultValue=""
                                render={({field}) => (
                                        <TextInput field={field} name='lastname' label={t('checkout.lastname')} placeholder={t('checkout.plLastname')} errors={errors?.lastname} />
                                )}
                    />
                    <Controller name="phone" control={control} defaultValue=""
                                render={({field}) => (
                                    <TextInput field={field} name='phone' label={t('checkout.phone')} placeholder={t('checkout.plPhone')} errors={errors?.phone} style="col-span-2" /> 
                                )}
                    />                    
                    <div className="text-xs flex items-center col-span-2">
                        <Checkbox size="small" checked={checked} onChange={handleChange} />
                        <p>{t('checkout.billing')}</p>
                    </div>
                    {checked ?
                    <> 
                        <h1 className="col-span-2 -mb-2 mt-5 font-bold text-[13px] text-gray-600 md:mt-4">{t('checkout.alternative')}</h1>
                        <Controller name="bill_name" control={control} defaultValue=""
                                    render={({field}) => (
                                            <TextInput field={field} name='bill_name' label={t('checkout.company')} placeholder={t('checkout.plCompany')} errors={errors?.bill_name} style="col-span-2" />
                                    )}
                        />
                        <Controller name="bill_country" control={control} defaultValue=""
                                    render={({field}) => (
                                        <TextInput field={field} name='bill_country' label={t('checkout.country')} placeholder={t('checkout.plCountry')} errors={errors?.bill_country} /> 
                                    )}
                        />
                        <Controller name="bill_post_code" control={control} defaultValue=""
                                    render={({field}) => (
                                        <TextInput field={field} name='bill_post_code' label={t('checkout.ZIP')} placeholder={t('checkout.plZIP')} errors={errors?.bill_post_code} /> 
                                    )}
                        />
                        <Controller name="bill_city" control={control} defaultValue=""
                                    render={({field}) => (
                                        <TextInput field={field} name='bill_city' label={t('checkout.city')} placeholder={t('checkout.plCity')} errors={errors?.bill_city} /> 
                                    )}
                        />
                        <Controller name="bill_street" control={control} defaultValue=""
                                    render={({field}) => (
                                            <TextInput field={field} name='bill_street' label={t('checkout.address')} placeholder={t('checkout.plAddress')} errors={errors?.bill_street} style="col-span-2" /> 
                                    )}
                        />
                    </>
                    : ''}
                    <div className="col-span-1 col-start-2 w-full lg:hidden">
                        <Button type="submit" variant="contained" sx={{borderRadius:0, mt:4}} className="bg-black w-full">{t('checkout.guestButton')}</Button>
                    </div>
                </ThemeProvider>
            </form>
        }
        </>
    )
}