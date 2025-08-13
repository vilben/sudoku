import { InvalidLengthError, split } from "~/components/sudoku/sudoku.utils";
import { expect, test, describe } from "vitest";

export const validSudokus = [
  "530070000600195000098000060800060003400803001700020006060000280000419005000080079",
  "000000907000420180000705026100904000050000040000507009920108000034059000507000000",
  "302609005000000000000000000020080000100000709000400800000800000005000000000000000",
  "004000000600000080000030000000000020001906000700000000050000000000000040000200000",
  "800000000003600000070090200050007000000045700000100030001000068008500010090000400",
];

describe("tanstack-sudoku utils", () => {
  describe("split", () => {
    test("should split into pieces of 9", () => {
      const testString =
        "000000000111111111222222222333333333444444444555555555666666666777777777888888888";

      const result = split(testString);
      const expected = [
        "000000000",
        "111111111",
        "222222222",
        "333333333",
        "444444444",
        "555555555",
        "666666666",
        "777777777",
        "888888888",
      ];
      expect(result).toEqual(expected);
    });

    test("valid sudokus successfully split into pieces of 9", () => {
      const splitUpSudokus = validSudokus.map(split);

      splitUpSudokus.forEach((sudoku) => {
        expect(sudoku).toHaveLength(9);
        sudoku.forEach((row) => {
          expect(row).toHaveLength(9);
        });
      });
    });

    test("throws error when tanstack-sudoku has invalid length", () => {
      const invalidSudoku = "123456789";
      expect(() => split(invalidSudoku)).toThrowError(InvalidLengthError);
    });
  });
});
