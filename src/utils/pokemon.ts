export const extractPokemonIdFromURL = (input: string) => {
    return input.split("/").at(6);
};

export const addLeftpadZeroes = (number: number, minLength: number): string => {
    const numberString = String(number);
    if (numberString.length >= minLength) return numberString;
    return numberString.padStart(minLength, "0");
};

export const formatPokemonId = (id: number): string => {
    return `#${addLeftpadZeroes(id, 3)}`;
};

export const generateTypeColor = (type: string): string => {
    if (type === "grass") return "bg-green-500 text-black";
    if (type === "poison") return "bg-purple-500";
    if (type === "fire") return "bg-orange-500";
    if (type === "water") return "bg-blue-500";
    if (type === "flying") return "bg-sky-400 text-blue-900";
    if (type === "bug") return "bg-lime-800";
    if (type === "normal") return "bg-slate-400";
    if (type === "electric") return "bg-yellow-400 text-black";
    if (type === "ground") return "bg-amber-600";
    if (type === "fairy") return "bg-pink-400";
    if (type === "fighting") return "bg-orange-700";
    if (type === "psychic") return "bg-rose-800";
    if (type === "rock") return "bg-yellow-900";
    if (type === "steel") return "bg-zinc-700";
    if (type === "ghost") return "bg-indigo-900";
    if (type === "ice") return "bg-blue-300 text-gray-800";
    if (type === "dragon") return "bg-blue-600";
    return "bg-black";
};
