import { createRouter } from "./context";
import { z } from "zod";
import { PokemonClient, PokemonType } from "pokenode-ts";

const ONE_DAY_MILISECONDS = 60 * 60 * 24 * 1000;

export const infinitePokemonRouter = createRouter().query("get-infinite-pokemon", {
    input: z.object({
        limit: z.number().min(1).max(50).nullish(),
        cursor: z.number().nullish(),
    }),
    async resolve({ input }) {
        const api = new PokemonClient({
            cacheOptions: { maxAge: ONE_DAY_MILISECONDS, exclude: { query: false } },
        });
        const limit = input.limit ?? 50;

        const { cursor } = input;

        let offset = cursor ? cursor : 0;
        const pokemons = await api.listPokemons(offset, limit);

        /* for (let index = 1; index < limit + 2; index++) {
            let offset = cursor ? cursor : 0;
            if (index + offset <= 151) {
                const { id, name, sprites, types } = await api.getPokemonById(index + offset);
                pokemons.push({
                    id: id,
                    name: name,
                    spriteUrl: sprites.other["official-artwork"].front_default,
                    types: types,
                });
            }
        } */

        let nextCursor: typeof cursor | null = input.cursor;
        nextCursor = nextCursor ? nextCursor : 0;

        /* if (pokemons.length > limit) {
            const nextItem = pokemons.pop();
            nextCursor = nextItem!.id;
        } */

        nextCursor += pokemons.results.length;

        return {
            pokemons,
            nextCursor,
        };
    },
});
