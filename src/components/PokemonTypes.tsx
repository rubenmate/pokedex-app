import { PokemonType } from "pokenode-ts";
import { FC } from "react";
import { generateTypeColor } from "../utils/pokemon";

type TypeProps = {
    types: PokemonType[] | undefined;
};

const Types: FC<TypeProps> = ({ types }) => {
    return (
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
    );
};

export default Types;
