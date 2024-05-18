// __tests__/components/AutocompleteInputPlace.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AutocompleteInputPlace from "@/components/map-navigation/AutocompleteInputPlace";
import usePlacesAutocomplete from "use-places-autocomplete";

// Mocking usePlacesAutocomplete hook
jest.mock("use-places-autocomplete");

const mockUsePlacesAutocomplete = usePlacesAutocomplete as jest.MockedFunction<
  typeof usePlacesAutocomplete
>;

const setValue = jest.fn();

describe("AutocompleteInputPlace", () => {
  beforeEach(() =>
    mockUsePlacesAutocomplete.mockReturnValue({
      ready: true,
      value: "",
      suggestions: {
        status: "OK",
        data: [
          {
            place_id: "1",
            description: "Place 1",
            matched_substrings: [],
            structured_formatting: {
              main_text: "",
              main_text_matched_substrings: [],
              secondary_text: "",
            },
            terms: [],
            types: [],
          },
          {
            place_id: "2",
            description: "Place 2",
            matched_substrings: [],
            structured_formatting: {
              main_text: "",
              main_text_matched_substrings: [],
              secondary_text: "",
            },
            terms: [],
            types: [],
          },
        ],
        loading: false,
      },
      setValue,
      clearSuggestions: jest.fn(),
      clearCache: () => null,
      init: () => [],
    })
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    test("renders correctly with given props", () => {
      render(
        <AutocompleteInputPlace
          name="location"
          placeholder="Enter a location"
          label="Location"
        />
      );

      expect(screen.getByLabelText("Location")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Enter a location")
      ).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    test("calls setValue on input change", async () => {
      render(
        <AutocompleteInputPlace
          name="location"
          placeholder="Enter a location"
          label="Location"
        />
      );

      const input: HTMLInputElement =
        screen.getByPlaceholderText("Enter a location");
      fireEvent.input(input, { target: { value: "Inno" } });
      expect(input).toHaveValue("Inno");
      setValue(input.value);
      expect(setValue).toHaveBeenCalledWith("Inno");
    });

    test("calls clearSuggestions on clear", () => {
      const clearSuggestions = jest.fn();
      mockUsePlacesAutocomplete.mockReturnValueOnce({
        ready: true,
        value: "",
        suggestions: {
          status: "OK",
          data: [],
          loading: false,
        },
        setValue: jest.fn(),
        clearSuggestions,
        clearCache: () => null,
        init: () => [],
      });

      render(
        <AutocompleteInputPlace
          name="location"
          placeholder="Enter a location"
          label="Location"
        />
      );

      const input = screen.getByPlaceholderText("Enter a location");
      fireEvent.change(input, { target: { value: "Clear this" } });
      fireEvent.click(screen.getAllByRole("button")[0]);

      expect(clearSuggestions).toHaveBeenCalled();
    });
  });
});
