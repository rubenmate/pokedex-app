import type { NextPage } from "next";
import { useTheme } from "next-themes";
import Head from "next/head";
import { useCallback, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import PokemonCard from "../components/pokemon-card";
import { extractPokemonIdFromURL } from "../utils/pokemon";
import { trpc } from "../utils/trpc";
import { MdModeNight } from "react-icons/md";
import { BsSun } from "react-icons/bs";

const LIMIT = 27;

const Home: NextPage = () => {
    const { theme, setTheme } = useTheme();
    const [firstPos, setFirstPos] = useState(0);

    const { hasNextPage, isLoading, data, fetchNextPage } = trpc.useInfiniteQuery(
        ["pokemon.get-infinite-pokemon", { limit: LIMIT, firstPos: firstPos }],
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    const observer = useRef<IntersectionObserver | null>(null);
    const divToLoadPokemonsRef = useCallback<React.RefCallback<HTMLDivElement>>(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0]?.isIntersecting) {
                    const myPromise = fetchNextPage();
                    toast.promise(myPromise, {
                        loading: "Loading more Pokemons",
                        success: "Gotcha!",
                        error: "Error when fetching",
                    });
                }
            });
            if (node) observer.current.observe(node);
        },
        [fetchNextPage]
    );

    if (isLoading)
        return (
            <div className="flex flex-col justify-center items-center p-4 dark:bg-grayish dark:text-white min-h-screen">
                <h1 className="text-6xl font-extrabold">Loading</h1>
                {/* TODO: Differentiate colors in dark/light mode */}
                <ScaleLoader className="mt-4" color="silver" />
            </div>
        );
    return (
        <>
            <Head>
                <title>Pokedex App</title>
                <meta name="description" content="Pokedex App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <button onClick={() => setFirstPos(0)}>Primera generación</button>
            <button onClick={() => setFirstPos(151)}>Segunda generación</button>
            <button onClick={() => setFirstPos(251)}>Tercera generación</button>
            <button onClick={() => setFirstPos(386)}>Cuarta generación</button>
            <button onClick={() => setFirstPos(493)}>Quinta generación</button>
            <button onClick={() => setFirstPos(649)}>Sexta generación</button>
            <button onClick={() => setFirstPos(721)}>Séptima generación</button>
            <button onClick={() => setFirstPos(809)}>Octava generación</button>
            <button onClick={() => setFirstPos(898)}>Otros</button>
            <div className="flex flex-col justify-center items-center p-4 dark:bg-grayish">
                <div className="self-end flex justify-end items-center">
                    <div>Switch color theme</div>
                    <button
                        className="m-2 w-10 h-10 rounded-md dark:bg-yellow-400 bg-blue-400 dark:text-black text-white flex justify-center items-center"
                        onClick={() => {
                            setTheme(theme === "dark" ? "light" : "dark");
                        }}
                    >
                        {theme === "dark" ? (
                            <BsSun className="w-5 h-5" />
                        ) : (
                            <MdModeNight className="w-5 h-5" />
                        )}
                    </button>
                </div>
                <h2 className="text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700 dark:text-white">
                    <span className="text-purple-300">Pokedex</span> App
                </h2>
                <div
                    className="grid grid-cols-1 grid-rows-3 lg:grid-rows-1 md:grid-rows-1 
                lg:grid-cols-3 md:grid-cols-3 gap-3 mt-3 pt-3 w-full lg:w-2/3 md:w-full"
                >
                    {data?.pages.map((page) =>
                        page.pokemons.results.map((element) => {
                            let id = Number(extractPokemonIdFromURL(element.url));
                            return <PokemonCard key={id} id={id} name={element.name} />;
                        })
                    )}
                    {hasNextPage && <div ref={divToLoadPokemonsRef} />}
                </div>
                <div className="btn-container">
                    <Toaster position="bottom-right" reverseOrder={false} />
                </div>
            </div>
        </>
    );
};

export default Home;
