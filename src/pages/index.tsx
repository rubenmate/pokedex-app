import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { trpc } from "../utils/trpc";

const MAX_POKEMONS = 9;
const Home: NextPage = () => {
    let pokemons = [];

    for (let index = 1; index <= MAX_POKEMONS; index++) {
        pokemons.push(trpc.useQuery(["pokemon.get-pokemon-by-id", { id: index }]));
    }

    return (
        <>
            <Head>
                <title>Pokedex App</title>
                <meta name="description" content="Pokedex App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="w-screen h-screen flex flex-col justify-center items-center p-4">
                <h2 className="text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700">
                    <span className="text-purple-300">Pokedex</span> App
                </h2>
                <div className="grid grid-cols-1 grid-rows-3 lg:grid-rows-1 md:grid-rows-1 lg:grid-cols-3 md:grid-cols-3 gap-3 mt-3 pt-3 w-full lg:w-2/3 md:w-full">
                    {pokemons.map(({ data }) => {
                        return (
                            <div
                                key={data?.id}
                                className="hover:scale-105 cursor-pointer duration-500 flex flex-col 
                    justify-center items-center text-center rounded shadow-xl border-2 
                    border-gray-500 h-full w-full p-6"
                            >
                                {/* Pokemon image */}
                                <Image
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data?.id}.png`}
                                    alt="Pokemon image"
                                    height={200}
                                    width={200}
                                />
                                {/* Pokemon id */}
                                <p className="text-sm text-gray-600">#001</p>
                                <h2 className="text-lg text-gray-700 capitalize">{data?.name}</h2>
                                <div className="p-2" />
                                <div className="flex justify-center items-center">
                                    {data?.types.map(({ type }) => {
                                        return (
                                            <div
                                                key={type.url}
                                                className="bg-green-400 rounded-md px-2 py-1 mr-2 capitalize"
                                            >
                                                {type.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Home;
