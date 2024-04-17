import { Loading } from "@/utils/loader";

export function ServiceCart ({workshop}) {
    return (
        <>
        <h1 className="text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-center font-Quesha gradient-text lg:hidden">Résumé de votre réservation</h1>
        {!workshop
            ? <Loading />
            : 
            <div className="flex flex-col bg-secondary/70 py-5 px-10 rounded-xl items-center font-medium text-white mt-5 mx-5 gap-1 text-xl lg:text-base sm:text-sm">
                <h2 className="text-2xl lg:text-4xl md:text-3xl lg:font-Quesha font-bold lg:font-medium mb-4">{workshop?.title}</h2>
                <p>{workshop?.entries_available - workshop?.entries_reserved} places restantes</p>
                <p>Date : {new Date(workshop?.date).toLocaleDateString('fr')} {new Date(workshop?.date).toLocaleTimeString('fr')}</p>
                <p>Durée : {workshop?.duration} minutes</p>
                <p className="text-2xl lg:text-lg sm:text-base mt-4 font-semibold">{workshop?.price}€</p>
            </div>
        }
        </>
    )
}