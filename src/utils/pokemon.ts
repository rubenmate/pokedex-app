export const addLeftpadZeroes = (number: number, minLength: number): string => {
    const numberString = String(number);
    if (numberString.length >= minLength) return numberString;
    return numberString.padStart(minLength, "0");
};

export const formatPokemonId = (id: number): string => {
    return `#${addLeftpadZeroes(id, 3)}`;
};

export const generateTypeColor = (type: string): string => {
    if (type === "grass") return "bg-green-500";
    if (type === "poison") return "bg-purple-500";
    if (type === "fire") return "bg-orange-500";
    if (type === "water") return "bg-blue-500";
    if (type === "flying") return "bg-sky-400";
    if (type === "bug") return "bg-lime-800";
    if (type === "normal") return "bg-slate-400";
    if (type === "electric") return "bg-yellow-400";
    if (type === "ground") return "bg-amber-600";
    if (type === "fairy") return "bg-pink-400";
    return "no color for this type";
};
