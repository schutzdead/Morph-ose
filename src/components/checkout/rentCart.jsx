import { Loading } from "@/utils/loader";

export function RentServiceCart ({rent}) {
    return (
        <>
        <h1 className="text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center font-Quesha gradient-text lg:hidden">Résumé de votre réservation</h1>
        {!rent
            ? <Loading />
            : 
            <div className="flex flex-col bg-secondary/70 py-5 px-20 rounded-xl items-center font-medium text-white mt-5 mx-5 gap-1 text-xl lg:text-base sm:text-sm">
                {/* <h2 className="lg:text-5xl md:text-4xl lg:font-Quesha font-bold lg:font-medium mb-4">{workshop?.title}</h2> */}
                {/* <p className="max-w-[400px] pb-5 text-center">{workshop?.description}</p> */}
                <p>{rent?.number_of_person} participants au maximum</p>
                <p className="text-2xl lg:text-lg sm:text-base mt-4 font-semibold">{rent?.price_per_person}€ par participant</p>
            </div>
        }
        </>
    )
}