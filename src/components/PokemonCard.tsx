import { FC } from "react";
import Image from "next/image";
import { formatPokemonId } from "../utils/pokemon";
import Types from "./Types";
import { trpc } from "../utils/trpc";
import MoonLoader from "react-spinners/MoonLoader";
import BarLoader from "react-spinners/BarLoader";

type PokemonProps = {
    id: number | undefined;
    name: string | undefined;
};

const PokemonCard: FC<PokemonProps> = ({ id, name }) => {
    let pokemonQuery = trpc.useQuery(["pokemon.get-pokemon-by-id", { id: id! }]);

    const spriteURL = pokemonQuery.data?.sprite;
    const types = pokemonQuery.data?.types;

    if (pokemonQuery.isLoading) {
        return (
            <div
                className="cursor-pointer duration-500 flex flex-col justify-center items-center 
                text-center dark:bg-gray-800 rounded shadow-xl border-2 border-gray-500 dark:border-gray-500 h-full w-full p-6"
            >
                <div className="h-[200px] w-[200px] flex flex-col justify-center items-center">
                    <MoonLoader size={40} />
                </div>

                <p className="text-sm text-gray-600 dark:text-white">{formatPokemonId(id!)}</p>
                <h2 className="text-lg text-gray-700 dark:text-white capitalize">{name}</h2>
                <div className="rounded-md h-8 px-2 mt-3 mr-2 capitalize">
                    <BarLoader width={40} />
                </div>
            </div>
        );
    }

    return (
        <>
            <div
                className="cursor-pointer duration-500 flex flex-col justify-center items-center
                text-center dark:bg-gray-800 rounded shadow-xl border-2 border-gray-500 dark:border-gray-500 h-full w-full p-6"
            >
                {spriteURL && (
                    <img src={spriteURL} alt={`${name} image`} height={200} width={200} />
                )}
                {/* <Image src={spriteURL} alt={`${name} image`} height={200} width={200} /> */}

                <p className="text-sm text-gray-600 dark:text-white">{formatPokemonId(id!)}</p>
                <h2 className="text-lg text-gray-700 dark:text-white capitalize">{name}</h2>
                <div className="p-2" />
                <Types types={types} />
            </div>
        </>
    );
};

export default PokemonCard;
