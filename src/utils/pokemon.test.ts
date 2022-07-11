import { describe, expect, test } from "vitest";
import { addLeftpadZeroes, formatPokemonId, generateTypeColor } from "./pokemon";

describe("Pokemon Utils", () => {
    describe("addLeftpadZeroes", () => {
        test("works when the number is smaller than min length", () => {
            let number = addLeftpadZeroes(3, 3);
            expect(number).toBe("003");
        });

        test("works when the number is longer or same than min length", () => {
            let number1 = addLeftpadZeroes(333, 3);
            expect(number1).toBe("333");
            let number2 = addLeftpadZeroes(3333, 3);
            expect(number2).toBe("3333");
        });
    });
    describe("formatPokemonId", () => {
        test("1, 2 or 3 digit id is properly formatted", () => {
            let formatedPokemonId = formatPokemonId(3);
            expect(formatedPokemonId).toBe("#003");
            formatedPokemonId = formatPokemonId(13);
            expect(formatedPokemonId).toBe("#013");
            formatedPokemonId = formatPokemonId(113);
            expect(formatedPokemonId).toBe("#113");
        });

        test("4 or more digit id is properly formatted", () => {
            let formatedPokemonId = formatPokemonId(1113);
            expect(formatedPokemonId).toBe("#1113");
            formatedPokemonId = formatPokemonId(11113);
            expect(formatedPokemonId).toBe("#11113");
        });
    });

    describe("generateTypeColor", () => {
        test("type get a properly bg color", () => {
            expect(generateTypeColor("fire")).toBe("bg-orange-500");
            expect(generateTypeColor("fairy")).toBe("bg-pink-400");
        });
        test("if type is not supported return the default value", () => {
            expect(generateTypeColor("magma")).toBe("bg-white");
        });
    });
});
