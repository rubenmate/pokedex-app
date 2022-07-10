import { describe, expect, test } from "vitest";
import { addLeftpadZeroes, formatPokemonId, formatPokemonId } from "./pokemon";

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
});
