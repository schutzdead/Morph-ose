import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";

import { CircularLoading } from "@/utils/loader";

import Image from "next/image";
import Check from '../../../public/assets/check.svg'
import { InterfaceTextArea, InterfaceTextInput } from "./interface_input";
import {  MenuItem, Select, FormControl, ThemeProvider } from "@mui/material";
import { colorTheme } from "../styles/mui";

const schema = object({
    lastname:string().required("Requis.").min(3, "3 à 16 caractères.").max(16, "3 à 16 caractères.").trim().uppercase(),
    email:string().required("Requis.").email("Email invalide.").trim().lowercase(),
    phone:string().required("Requis.").matches(/^[0-9]*$/, 'Téléphone invalide.'),
    comment:string().required("Requis.").min(10, "Message trop court"),
}).required();

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function ContactForm () {
    const thematics = [{title:"Thématique 1", id:1}, {title:"Thématique 2", id:2}, {title:"Thématique 3", id:3}]
    const [dataCategory, setDataCategory] = useState("")
    const handleChangeCat = (event) => {
        setDataCategory(event.target.value);
    };

    const  {reset, register, handleSubmit, formState: {errors}} = useForm ({ resolver:  yupResolver(schema)})
    const [loading, setLoading] = useState(false)
    const [logErr, setlogErr] = useState(false)
    const [mailSend, setMailSend] = useState(false)

    async function onSubmit(data) {
        const { lastname, email, comment, phone } = data
        setLoading(true)
        setlogErr(false)
        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: "POST",    
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name:lastname, 
                    email:email, 
                    message:comment, 
                    phone:phone,
                    thematic:dataCategory
                })
            })
            if(response.status === 200) {
                reset()
                setLoading(false)
                setMailSend(true)
                return
            }
            setLoading(false)
            setlogErr(true)
        } catch (err) {
            setLoading(false)
            console.error('Request failed:' + err.message)
        }
    }

    return (
        <>
        {logErr ? <div className="text-sm text-[#d32f2f] text-center mb-5 scroll-mt-28" id="errorContact">Une erreur est survenue, réessayez plus tard.</div> : ''}
        {loading 
            ? <div className="flex justify-center py-20 w-full">
                <CircularLoading />
            </div>
            : mailSend  
                ? <div className="flex flex-col w-[400px] bg-background text-secondary p-6 rounded-xl place-self-center relative sm:w-[90%]">
                    <>
                        <div className="mt-3 mb-7 h-9 w-9 self-center flex items-center justify-center border-2 border-primary-color animate-[2s_forwards_rotation]">
                            <Image src={Check} alt="Validate pictogram" />
                        </div>
                        <div className="text-center flex flex-col font-medium mb-5 items-center gap-1">
                            <p>Votre demande a bien été envoyée.</p>
                            <p>Nous vous répondrons dès que possible.</p>
                        </div>
                    </>
                </div> 
                : <form onSubmit={handleSubmit(onSubmit)} className='w-full grid grid-cols-2 gap-5 place-self-center sm:grid-cols-1' id="contact">
                        <InterfaceTextInput label='Nom *' placeholder='Dupont' name="lastname" options={{...register("lastname")}} commonError={errors.lastname} commonErrorMessage={errors.lastname?.message} labelStyle="text-secondary"/>
                        <InterfaceTextInput label='Email *' placeholder='Entrez votre email' name="email" options={{...register("email")}} commonError={errors.email} commonErrorMessage={errors.email?.message} labelStyle="text-secondary"/>
                        <InterfaceTextInput label='Téléphone *' placeholder='0606060606' name="phone" options={{...register("phone")}} commonError={errors.phone} commonErrorMessage={errors.phone?.message} labelStyle="text-secondary"/>
                        <div className="flex flex-col tracking-[0.2px] gap-2 h-full text-secondary col-span-2 sm:col-span-1">
                            <label className="text-lg gap-2 font-medium lg:text-base sm:text-sm">Thématique *</label>
                            <ThemeProvider theme={colorTheme}>
                                <FormControl variant="filled">
                                    <Select label="Thématique" defaultValue="" required
                                            value={dataCategory} onChange={handleChangeCat}
                                    >
                                    {thematics.map((name) => (<MenuItem key={name.id} value={name.id}>{name.title}</MenuItem>))}
                                    </Select>
                                </FormControl>
                            </ThemeProvider>
                        </div>
                        <InterfaceTextArea label='Commentaire *' placeholder="Détaillez nous votre problème" name="comment" height={3}  options={{...register("comment")}} commonError={errors.comment} commonErrorMessage={errors.comment?.message} labelStyle="text-secondary" style="sm:col-span-1"/>
                        <p className='text-xs font-light col-span-2 sm:col-span-1'>En envoyant ce mail, vous agréez à la <span className='font-bold'>politiques de la protection des données*</span>.</p>
                        <button type='submit' className='w-fit px-10 col-span-2 place-self-center gap-3 rounded-md justify-center text-base bg-mainGradient transition-all duration-300 text-white py-3 mt-10 sm:my-5 sm:col-span-1'>
                                <p className='font-medium text-center'>Envoyer</p>
                        </button>
                </form>
            }
        </>
    )
}
