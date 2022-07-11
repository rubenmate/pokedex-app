import { createRouter } from "./context";
import { z } from "zod";
import { PokemonClient } from "pokenode-ts";

export const pokemonRouter = createRouter().query("get-pokemon-by-id", {
    input: z.object({
        id: z.number(),
    }),
    async resolve({ input }) {
        const api = new PokemonClient();

        const pokemon = await api.getPokemonById(input.id);
        return {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types,
            sprite: pokemon.sprites.other["official-artwork"].front_default,
        };
    },
});
