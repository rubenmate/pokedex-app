import { FC, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Pokemon, PokemonClient, PokemonType } from "pokenode-ts";
import { formatPokemonId, generateTypeColor } from "../utils/pokemon";
import Types from "./types";

type PokemonProps = {
    id: number | undefined;
    name: string | undefined;
};

const PokemonCard: FC<PokemonProps> = ({ id, name }) => {
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        async function fetchPokemon() {
            const api = new PokemonClient();
            const pokemon = await api.getPokemonById(id!);
            setPokemon(pokemon);
        }
        fetchPokemon();
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (pokemon) setHasLoaded(true);
    }, [pokemon, id]);

    const getPokemon = async () => {
        setPokemon(pokemon);
    };

    const spriteURL = pokemon?.sprites.other["official-artwork"].front_default;
    return (
        <>
            {hasLoaded && (
                <div
                    className="cursor-pointer duration-500 flex flex-col justify-center items-center 
                text-center rounded shadow-xl border-2 border-gray-500 h-full w-full p-6"
                >
                    <Image src={spriteURL!} alt={`${name} image`} height={200} width={200} />

                    <p className="text-sm text-gray-600">{formatPokemonId(id!)}</p>
                    <h2 className="text-lg text-gray-700 capitalize">{name}</h2>
                    <div className="p-2" />
                    <Types types={pokemon?.types} />
                </div>
            )}
        </>
    );
};

export default PokemonCard;
