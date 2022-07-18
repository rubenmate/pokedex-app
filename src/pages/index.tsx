import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useCallback, useRef, useState } from "react";
import { useTheme } from "next-themes";
import PokemonCard from "../components/PokemonCard";
import { extractPokemonIdFromURL } from "../utils/pokemon";
import toast, { Toaster } from "react-hot-toast";
import { Menu } from "@headlessui/react";
import { ScaleLoader } from "react-spinners";
import { MdModeNight } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { FiGithub } from "react-icons/fi";

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
            <div className="flex max-w-6xl mx-auto justify-between items-center">
                <div className="flex items-center">
                    <h2 className="ml-2 text-xl md:text-3xl font-extrabold text-gray-700 dark:text-white">
                        Pokedex App
                    </h2>
                    <div className="ml-4">
                        <Menu>
                            <Menu.Button
                                className={
                                    "font-bold bg-gray-100 rounded-sm shadow p-2 dark:text-black"
                                }
                            >
                                Start from:
                            </Menu.Button>
                            <Menu.Items>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFirstPos(0)}
                                            className="ml-2 p-2 bg-blue-300 rounded-md text-black"
                                        >
                                            1st gen
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFirstPos(151)}
                                            className="ml-2 p-2 bg-blue-300 rounded-md text-black"
                                        >
                                            2nd gen
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFirstPos(251)}
                                            className="ml-2 p-2 bg-blue-300 rounded-md text-black"
                                        >
                                            3rd gen
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFirstPos(386)}
                                            className="ml-2 p-2 bg-blue-300 rounded-md text-black"
                                        >
                                            4th gen
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFirstPos(493)}
                                            className="ml-2 p-2 bg-blue-300 rounded-md text-black"
                                        >
                                            5th gen
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFirstPos(649)}
                                            className="ml-2 p-2 bg-blue-300 rounded-md text-black"
                                        >
                                            6th gen
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFirstPos(721)}
                                            className="ml-2 p-2 bg-blue-300 rounded-md text-black"
                                        >
                                            7th gen
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFirstPos(809)}
                                            className="ml-2 p-2 bg-blue-300 rounded-md text-black"
                                        >
                                            8th gen
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFirstPos(898)}
                                            className="ml-2 p-2 bg-blue-300 rounded-md text-black"
                                        >
                                            Others
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
                <div className="justify-self-end flex items-center">
                    <a
                        href="https://github.com/rubenmate/pokedex-app"
                        className="flex items-center mr-2 bg-gray-100 pr-1 rounded-md font-semibold dark:text-black hover:underline shadow"
                    >
                        <div className="mr-2 p-2 bg-gray-600 rounded-sm">
                            <FiGithub className="text-white" />
                        </div>
                        GitHub
                    </a>
                    <button
                        className="m-2 w-10 h-10 rounded-md dark:bg-yellow-400 bg-blue-400 dark:text-black text-white flex justify-center items-center shadow"
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
            </div>
            <div className="flex flex-col justify-center items-center p-4 dark:bg-grayish">
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
