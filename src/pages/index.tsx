import type { NextPage } from "next";
import Head from "next/head";
import PokemonCard from "../components/pokemon-card";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
    const utils = trpc.useContext();
    const { hasNextPage, isLoading, data, fetchNextPage } = trpc.useInfiniteQuery(
        ["pokemon.get-infinite-pokemon", { limit: 12 }],
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    if (isLoading)
        return (
            <div className="flex flex-col justify-center items-center p-4">
                <h2 className="text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700">
                    <span className="text-purple-300">Loading...</span>
                </h2>
            </div>
        );
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
                    {data?.pages.map((page) =>
                        page.pokemons.map(({ id, name, types, spriteUrl }) => {
                            return (
                                <PokemonCard
                                    key={id}
                                    id={id}
                                    name={name}
                                    types={types}
                                    spriteUrl={spriteUrl!}
                                />
                            );
                        })
                    )}
                </div>
                <div className="btn-container">
                    <button
                        onClick={() => {
                            if (hasNextPage) fetchNextPage();
                        }}
                    >
                        Load More
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;
