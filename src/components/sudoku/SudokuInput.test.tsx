import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, type Mock } from "vitest";
import { SudokuInput } from "./SudokuInput";
import { useSudokuContext } from "~/components/sudoku/hooks/useSudokuContext";

// Mock the Sudoku context
vi.mock("~/components/sudoku/hooks/useSudokuContext");

const mockUseSudokuContext = useSudokuContext as Mock;

describe("SudokuInput", () => {
  const onChange = vi.fn();
  const onFocus = vi.fn();

  const testCases = [
    {
      row: 0,
      col: 0,
      value: "1",
      showErrors: false,
      errors: [],
      disabled: false,
      expectedError: false,
    },
    {
      row: 0,
      col: 1,
      value: "2",
      showErrors: true,
      errors: [{ x: 1, y: 0 }],
      disabled: false,
      expectedError: true,
    },
    {
      row: 1,
      col: 0,
      value: "",
      showErrors: true,
      errors: [],
      disabled: false,
      expectedError: false,
    },
    {
      row: 2,
      col: 2,
      value: "5",
      showErrors: true,
      errors: [{ x: 2, y: 2 }],
      disabled: true,
      expectedError: false,
    },
  ];

  testCases.forEach(
    ({ row, col, value, showErrors, errors, disabled, expectedError }) => {
      it(`renders input at row ${row}, col ${col} with value "${value}"${disabled ? " (disabled)" : ""}`, () => {
        mockUseSudokuContext.mockReturnValue({ showErrors, errors });

        render(
          <SudokuInput
            rowIndex={row}
            colIndex={col}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            isDisabled={disabled}
          />,
        );

        const input = screen.getByRole("textbox") as HTMLInputElement;

        expect(input.value).toBe(value);
        expect(input.disabled).toBe(disabled);

        if (expectedError) {
          expect(input.className).toContain("text-red-300");
        } else {
          expect(input.className).not.toContain("text-red-300");
        }

        fireEvent.focus(input);
        expect(onFocus).toHaveBeenCalled();

        fireEvent.change(input, { target: { value: "9" } });
        expect(onChange).toHaveBeenCalled();
      });
    },
  );
});
