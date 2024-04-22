import { Loading } from "@/utils/loader";
import Link from "next/link";

export function RentServiceCart ({rent}) {
    return (
        <>
        <h1 className="text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center font-Quesha gradient-text lg:hidden">Résumé de votre réservation</h1>
        {!rent
            ? <Loading />
            : 
            <div className="flex flex-col gap-3 w-[95vw] max-w-[350px]">
                <div className="flex flex-col w-full px-4 sm:px-3 bg-secondary/70 text-center py-5 rounded-xl items-center font-medium text-white mt-5 gap-1 text-base sm:text-sm">
                    <h2 className="text-lg font-bold sm:text-base">{rent?.room_rental?.title}</h2>
                    <h2 className="font-bold mb-4 text-lg sm:text-base">{new Date(rent?.room_rental?.date).toLocaleDateString('fr')}</h2>
                    <p>Prix par participant : {rent?.price_per_person}€</p>
                    <p>Nombre de participants : {rent?.number_of_person} </p>
                    <p>Coût de la réservation : {rent?.room_rental?.price}€ </p>
                </div>
                <Link href="/rent" className="">
                    <button className='bg-secondary w-full items-center transition-all duration-500 rounded-xl justify-center text-base text-white py-2'>
                        <p className='font-medium text-center mb-[2px]'>Modifier</p>
                    </button>
                </Link>
            </div>
        }
        </>
    )
}