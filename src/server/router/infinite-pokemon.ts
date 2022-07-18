import { createRouter } from "./context";
import { z } from "zod";
import { PokemonClient } from "pokenode-ts";

const ONE_DAY_MILISECONDS = 60 * 60 * 24 * 1000;

export const infinitePokemonRouter = createRouter().query("get-infinite-pokemon", {
    input: z.object({
        limit: z.number().min(1).max(50).nullish(),
        firstPos: z.number().nullish(),
        cursor: z.number().nullish(),
    }),
    async resolve({ input }) {
        const api = new PokemonClient({
            cacheOptions: { maxAge: ONE_DAY_MILISECONDS, exclude: { query: false } },
        });
        const limit = input.limit ?? 50;
        const firstPos = input.firstPos ? input.firstPos : 0;

        const { cursor } = input;

        let offset = cursor ? cursor : 0;
        const pokemons = await api.listPokemons(firstPos + offset, limit);

        let nextCursor: typeof cursor | null = input.cursor;

        nextCursor = nextCursor ? nextCursor : 0;
        nextCursor += pokemons.results.length;

        return {
            pokemons,
            nextCursor,
        };
    },
});
