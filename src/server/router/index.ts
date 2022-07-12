// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { pokemonRouter } from "./pokemon";
import { infinitePokemonRouter } from "./infinite-pokemon";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge("example.", exampleRouter)
    .merge("pokemon.", pokemonRouter)
    .merge("pokemon.", infinitePokemonRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
