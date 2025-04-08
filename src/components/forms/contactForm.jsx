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
    const thematics = [{title:"Produits", id:2}, {title:"Séances individuelles", id:3}, {title:"Ateliers/évènements", id:4}, {title:"Je suis pro", id:5}]
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
                ? <div className="flex flex-col text-secondary w-[90vw] p-6 rounded-xl place-self-center text-center relative sm:w-[95vw]">
                    <div className="px-5">
                        <h1 className="font-Quesha text-7xl xl:text-6xl md:text-5xl">Votre message a bien été transmis !</h1>
                        <p className="text-xl flex flex-col pb-10 gap-5 lg:text-lg sm:text-base ">Nous revenons vers vous rapidement...</p>
                    </div>
                    <div className="px-5">
                        <h1 className="font-Quesha text-6xl xl:text-5xl md:text-4xl">A bientôt</h1>
                        <p className="text-lg font-semibold flex flex-col pb-10 gap-5 lg:text-base sm:text-sm">L’équipe Merveilles de Morph’ose</p>
                    </div>
                </div> 
                : <form onSubmit={handleSubmit(onSubmit)} className='w-full grid grid-cols-2 bg-primary/30 px-6 py-10  rounded-lg gap-5 md:bg-transparent md:rounded-none md:p-0 place-self-center sm:grid-cols-1' id="contact">
                        <InterfaceTextInput label='Nom *' placeholder='Dupont' name="lastname" options={{...register("lastname")}} commonError={errors.lastname} commonErrorMessage={errors.lastname?.message} labelStyle="text-secondary"/>
                        <InterfaceTextInput label='Email *' placeholder='Entrez votre email' name="email" options={{...register("email")}} commonError={errors.email} commonErrorMessage={errors.email?.message} labelStyle="text-secondary"/>
                        <InterfaceTextInput label='Téléphone *' placeholder='0606060606' name="phone" options={{...register("phone")}} commonError={errors.phone} commonErrorMessage={errors.phone?.message} labelStyle="text-secondary"/>
                        <div className="flex flex-col tracking-[0.2px] gap-2 h-full text-secondary col-span-2 sm:col-span-1">
                            <label className="text-lg gap-2 font-medium lg:text-base sm:text-sm">Thématique *</label>
                            <ThemeProvider theme={colorTheme}>
                                <FormControl variant="filled" sx={{background:'white', borderRadius:'6px 6px 0 0'}}>
                                    <Select label="Thématique" defaultValue="" required sx={{background:'white', borderRadius:'6px 6px 0 0'}}
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
