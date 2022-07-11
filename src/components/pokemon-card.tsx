import { FC } from "react";
import Image from "next/image";
import { PokemonType } from "pokenode-ts";
import { formatPokemonId, generateTypeColor } from "../utils/pokemon";

type PokemonProps = {
    id: number | undefined;
    name: string | undefined;
    spriteUrl: string;
    types: PokemonType[] | undefined;
};

const PokemonCard: FC<PokemonProps> = ({ id, name, types, spriteUrl }) => {
    return (
        <>
            <div
                className="cursor-pointer duration-500 flex flex-col justify-center items-center 
                text-center rounded shadow-xl border-2 border-gray-500 h-full w-full p-6"
            >
                <Image src={spriteUrl} alt={`${name} image`} height={200} width={200} />

                <p className="text-sm text-gray-600">{formatPokemonId(id!)}</p>
                <h2 className="text-lg text-gray-700 capitalize">{name}</h2>
                <div className="p-2" />
                <div className="flex justify-center items-center">
                    {types?.map(({ type }) => {
                        return (
                            <div
                                key={type.url}
                                className={`${generateTypeColor(
                                    type.name
                                )} rounded-md px-2 py-1 mr-2 text-white capitalize`}
                            >
                                {type.name}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default PokemonCard;
