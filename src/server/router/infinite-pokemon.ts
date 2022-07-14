import { createRouter } from "./context";
import { z } from "zod";
import { MainClient, PokemonType } from "pokenode-ts";
type MyPokemon = {
    id: number;
    name: string;
    spriteUrl: string | null;
    types: PokemonType[];
};

const ONE_DAY_SECONDS = 60 * 60 * 24 * 1000;

export const infinitePokemonRouter = createRouter().query("get-infinite-pokemon", {
    input: z.object({
        limit: z.number().min(1).max(50).nullish(),
        cursor: z.number().nullish(),
    }),
    async resolve({ input }) {
        const api = new MainClient({
            cacheOptions: { maxAge: ONE_DAY_SECONDS, exclude: { query: false } },
        });
        const limit = input.limit ?? 6;

        const { cursor } = input;

        const pokemons: MyPokemon[] = [];

        for (let index = 1; index < limit + 2; index++) {
            let offset = cursor ? cursor : 0;
            if (index + offset <= 151) {
                const { id, name, sprites, types } = await api.pokemon.getPokemonById(
                    index + offset
                );
                pokemons.push({
                    id: id,
                    name: name,
                    spriteUrl: sprites.other["official-artwork"].front_default,
                    types: types,
                });
            }
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
