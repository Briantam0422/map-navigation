import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import FormInputRoute from "@/components/map-navigation/form/FormInputRoute";
import ButtonsApiTesting from "@/components/map-navigation/form/ButtonsApiTesting";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useMutation } from "@tanstack/react-query";
import { DataPostRouteProps, postRoute } from "@/api/route";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQuery: jest.fn(),
}));
jest.mock("@/store/hooks", () => ({
  useAppSelector: jest.fn(),
  useAppStore: jest.fn(),
}));
jest.mock("@/store/slices/routeSlice", () => ({
  setToken: jest.fn(),
  initialRoute: jest.fn(),
  resetRoute: jest.fn(),
}));
jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
}));

// Mocking usePlacesAutocomplete hook
jest.mock("use-places-autocomplete");

const mockUsePlacesAutocomplete = usePlacesAutocomplete as jest.MockedFunction<
  typeof usePlacesAutocomplete
>;

// Mock useJsApiLoader
jest.mock("@react-google-maps/api", () => ({
  useJsApiLoader: jest.fn(() => ({
    isLoaded: true, // Simulate Google Maps API is loaded
  })),
  GoogleMap: jest.fn(({ children }) => <div>{children}</div>),
  DirectionsService: jest.fn(() => null),
  DirectionsRenderer: jest.fn(() => null),
}));

//  Mock Form functions
const demoText = "Demo Text";
const setValue = jest.fn();
const mockUseMutation = useMutation as jest.Mock;

describe("FormInputRoute", () => {
  const mockMutate = jest.fn();
  beforeEach(() => {
    mockUseMutation.mockReturnValue({ mutate: mockMutate });
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
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("Rendering", () => {
    test("renders the component correctly", () => {
      render(<FormInputRoute />);
      // Form
      const form = screen.getByTestId("form-search-location");
      expect(form).toBeInTheDocument();
      // Input Components
      const inputPickupLocation = screen.getByLabelText("Pick-up Location");
      expect(inputPickupLocation).toBeInTheDocument();
      const inputDropOffLocation = screen.getByLabelText("Drop-off Location");
      expect(inputDropOffLocation).toBeInTheDocument();
      // Button Components
      const buttonSubmit = screen.getByText("Submit");
      expect(buttonSubmit).toBeInTheDocument();
      const buttonReset = screen.getByText("Reset");
      expect(buttonReset).toBeInTheDocument();
      // Mock API
      const buttonMockApisTest = screen.getByText("Try Mock APIs");
      expect(buttonMockApisTest).toBeInTheDocument();
    });
  });
  describe("behavior", () => {
    test("Pick-up Location onchange", () => {
      render(<FormInputRoute />);
      const inputPickupLocation = screen.getByLabelText("Pick-up Location");
      fireEvent.input(inputPickupLocation, { target: { value: demoText } });
      expect(inputPickupLocation).toHaveValue(demoText);
    });
    test("Drop-off Location onchange", () => {
      render(<FormInputRoute />);
      const inputDropOffLocation = screen.getByLabelText("Drop-off Location");
      fireEvent.input(inputDropOffLocation, { target: { value: demoText } });
      expect(inputDropOffLocation).toHaveValue(demoText);
    });
    test("Submit Form", async () => {
      render(<FormInputRoute />);
      const inputPickupLocation: HTMLInputElement =
        screen.getByLabelText("Pick-up Location");
      const inputDropOffLocation: HTMLInputElement =
        screen.getByLabelText("Drop-off Location");
      const buttonSubmit = screen.getByText("Submit");
      // simulate user input and submit form
      await act(async () => {
        fireEvent.input(inputPickupLocation, { target: { value: demoText } });
        fireEvent.input(inputDropOffLocation, { target: { value: demoText } });
        fireEvent.click(buttonSubmit);
        expect(useMutation).toHaveBeenCalled();
        // simulate mutation onSuccess
        const onSuccess = mockUseMutation.mock.calls[0][0].onSuccess;
        await onSuccess(({ token }: DataPostRouteProps) => {
          expect(token).not.toBe(null);
        });
      });
    });
    test("Reset Form", async () => {
      render(<FormInputRoute />);
      const inputPickupLocation: HTMLInputElement =
        screen.getByLabelText("Pick-up Location");
      const inputDropOffLocation: HTMLInputElement =
        screen.getByLabelText("Drop-off Location");
      const buttonReset = screen.getByText("Reset");
      // simulate user reset form
      await act(async () => {
        fireEvent.input(inputPickupLocation, { target: { value: demoText } });
        fireEvent.input(inputDropOffLocation, { target: { value: demoText } });
        fireEvent.click(buttonReset);
      });
      expect(inputPickupLocation).not.toHaveValue();
      expect(inputDropOffLocation).not.toHaveValue();
    });
  });
});
