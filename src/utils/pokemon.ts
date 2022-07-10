export const addLeftpadZeroes = (number: number, minLength: number): string => {
    const numberString = String(number);
    if (numberString.length >= minLength) return numberString;
    return numberString.padStart(minLength, "0");
};

export const formatPokemonId = (id: number): string => {
    return `#${addLeftpadZeroes(id, 3)}`;
};
