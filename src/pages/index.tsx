import type { NextPage } from "next";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import PokemonCard from "../components/pokemon-card";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
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
                        className="flex items-center justify-center mt-2 rounded-lg bg-white
                        p-2 shadow-xl"
                        onClick={() => {
                            if (hasNextPage) {
                                const myPromise = fetchNextPage();
                                toast.promise(myPromise, {
                                    loading: "Loading more Pokemons",
                                    success: "Gotcha!",
                                    error: "Error when fetching",
                                });
                            }
                        }}
                    >
                        <Toaster position="bottom-right" reverseOrder={false} />
                        <div className="pr-2">Load More </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;
