import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import this to use the toBeInTheDocument matcher
import GoogleMapComponent from "@/components/map-navigation/google-map/GoogleMapComponent";
import { useAppSelector } from "@/store/hooks";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
// import { initialize } from "@googlemaps/jest-mocks";

// Mock useAppSelector
jest.mock("@/store/hooks", () => ({
  useAppSelector: jest.fn(),
}));

// Mock useJsApiLoader
jest.mock("@react-google-maps/api", () => ({
  useJsApiLoader: jest.fn(() => ({
    isLoaded: true, // Simulate Google Maps API is loaded
  })),
  GoogleMap: jest.fn(({ children }) => <div>{children}</div>),
  DirectionsService: jest.fn(() => null),
  DirectionsRenderer: jest.fn(() => null),
}));

describe("GoogleMapComponent", () => {
  beforeEach(() => {
    // initialize();
  });
  it("renders GoogleMap when Google Maps API is loaded", () => {
    // Mock routeState.path
    (useAppSelector as unknown as jest.Mock).mockReturnValue({ path: [] });
    render(<GoogleMapComponent isLoaded={true} />);
    const googleMapElement = screen.getByTestId("google-map");
    expect(googleMapElement).toBeInTheDocument();
  });

  it("does not render GoogleMap when Google Maps API is not loaded", () => {
    // Mock useJsApiLoader to simulate Google Maps API is not loaded
    (useJsApiLoader as jest.Mock).mockReturnValue({ isLoaded: false });
    render(<GoogleMapComponent isLoaded={false} />);
    const googleMapElement = screen.queryByTestId("google-map");
    expect(googleMapElement).not.toBeInTheDocument();
  });
});
