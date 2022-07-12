import { createRouter } from "./context";
import { z } from "zod";
import { Pokemon, PokemonClient, PokemonType } from "pokenode-ts";
type MyPokemon = {
    id: number;
    name: string;
    spriteUrl: string | null;
    types: PokemonType[];
};

export const infinitePokemonRouter = createRouter().query("get-infinite-pokemon", {
    input: z.object({
        limit: z.number().min(1).max(12).nullish(),
        cursor: z.number().nullish(),
    }),
    async resolve({ input }) {
        const api = new PokemonClient();
        const limit = input.limit ?? 6;

        const { cursor } = input;

        const pokemons: MyPokemon[] = [];
        for (let index = 1; index < limit + 2; index++) {
            const pokemon = await api.getPokemonById(index);
            pokemons.push({
                id: pokemon.id,
                name: pokemon.name,
                spriteUrl: pokemon.sprites.other["official-artwork"].front_default,
                types: pokemon.types,
            });
        }

        let nextCursor: typeof cursor | null = input.cursor;

        if (pokemons.length > limit) {
            const nextItem = pokemons.pop();
            nextCursor = nextItem!.id;
        }

        return {
            pokemons,
            nextCursor,
        };
    },
});
