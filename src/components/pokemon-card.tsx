import { FC } from "react";
import Image from "next/image";
import { formatPokemonId } from "../utils/pokemon";
import Types from "./types";
import { trpc } from "../utils/trpc";

type PokemonProps = {
    id: number | undefined;
    name: string | undefined;
};

const PokemonCard: FC<PokemonProps> = ({ id, name }) => {
    let pokemonQuery = trpc.useQuery(["pokemon.get-pokemon-by-id", { id: id! }]);

    const spriteURL = pokemonQuery.data?.sprite;
    const types = pokemonQuery.data?.types;

    // TODO: Make this prettier
    if (pokemonQuery.isLoading) return <h1>Loading...</h1>;

    return (
        <>
            <div
                className="cursor-pointer duration-500 flex flex-col justify-center items-center 
                text-center rounded shadow-xl border-2 border-gray-500 h-full w-full p-6"
            >
                <Image src={spriteURL!} alt={`${name} image`} height={200} width={200} />

                <p className="text-sm text-gray-600">{formatPokemonId(id!)}</p>
                <h2 className="text-lg text-gray-700 capitalize">{name}</h2>
                <div className="p-2" />
                <Types types={types} />
            </div>
        </>
    );
};

export default PokemonCard;
