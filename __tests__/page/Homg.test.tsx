import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { useJsApiLoader } from "@react-google-maps/api";
import FormInputRoute from "@/components/map-navigation/form/FormInputRoute";

// Mock useJsApiLoader
jest.mock("@react-google-maps/api", () => ({
  useJsApiLoader: jest.fn(() => ({
    isLoaded: true, // Simulate Google Maps API is loaded
  })),
}));

// Mock the FormInputRoute component
jest.mock("@/components/map-navigation/form/FormInputRoute", () => {
  return function FormInputRoute() {
    return <div data-testid="mock-form-input-route">Mock FormInputRoute</div>;
  };
});

// Mock the GoogleMapDirections component
jest.mock("@/components/map-navigation/google-map/GoogleMapComponent", () => {
  return function MockGoogleMapDirections() {
    return <div data-testid="mock-google-map">Mock GoogleMapDirections</div>;
  };
});

describe("Home", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("Rendering", () => {
    test("renders Spinner when Google Maps API is not loaded", () => {
      // Mock the return value of useJsApiLoader
      (useJsApiLoader as jest.Mock).mockReturnValue({ isLoaded: false });

      render(<Home />);

      // Expect Spinner to be in the document
      const spinnerElement = screen.queryByTestId("spinner-loading");
      expect(spinnerElement).toBeInTheDocument();

      // Ensure the mock FormInputRoute is rendered
      const formInputRouteElement = screen.queryByTestId(
        "mock-form-input-route"
      );
      expect(formInputRouteElement).toBeNull();

      // Ensure GoogleMapComponent is not rendered
      const googleMapElement = screen.queryByTestId("mock-google-map");
      expect(googleMapElement).toBeNull();
    });

    test("renders GoogleMapComponent when Google Maps API is loaded", () => {
      // Mock the return value of useJsApiLoader
      (useJsApiLoader as jest.Mock).mockReturnValue({ isLoaded: true });

      render(<Home />);

      // Ensure Spinner is not rendered
      const spinnerElement = screen.queryByRole("spinner-loading");
      expect(spinnerElement).toBeNull();

      // Ensure the mock FormInputRoute is rendered
      const formInputRouteElement = screen.queryByTestId(
        "mock-form-input-route"
      );
      expect(formInputRouteElement).toBeInTheDocument();

      // Expect GoogleMapComponent to be in the document
      const googleMapElement = screen.queryByTestId("mock-google-map");
      expect(googleMapElement).toBeInTheDocument();
    });
  });
});
