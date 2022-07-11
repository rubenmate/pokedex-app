import type { NextPage } from "next";
import Head from "next/head";
import PokemonCard from "../components/pokemon-card";
import { trpc } from "../utils/trpc";

const INITIAL_POKEMONS = 12;
const MAX_POKEMONS = 151;
const Home: NextPage = () => {
    let pokemons = [];

    for (let index = 1; index <= INITIAL_POKEMONS; index++) {
        let pokemon = trpc.useQuery(["pokemon.get-pokemon-by-id", { id: index }]);
        pokemons.push(pokemon);
    }

    if (pokemons.at(-1)?.isLoading) return null;

    return (
        <>
            <Head>
                <title>Pokedex App</title>
                <meta name="description" content="Pokedex App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col justify-center items-center p-4">
                <h2 className="text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700">
                    <span className="text-purple-300">Pokedex</span> App
                </h2>
                <div
                    className="grid grid-cols-1 grid-rows-3 lg:grid-rows-1 md:grid-rows-1 
                lg:grid-cols-3 md:grid-cols-3 gap-3 mt-3 pt-3 w-full lg:w-2/3 md:w-full"
                >
                    {pokemons.map(({ data }) => {
                        return (
                            <PokemonCard
                                key={data?.id}
                                id={data?.id}
                                name={data?.name}
                                types={data?.types}
                                spriteUrl={data?.sprites.other["official-artwork"].front_default!}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Home;
