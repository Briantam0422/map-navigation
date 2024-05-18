import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonsApiTesting from "@/components/map-navigation/ButtonsApiTesting"; // Adjust the path as needed
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/hooks";
import { retry } from "@reduxjs/toolkit/query";

// Mock dependencies
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/store/hooks", () => ({
  useAppStore: jest.fn(),
}));

// Mock implementations
const mockUseQuery = useQuery as jest.Mock;
const mockUseMutation = useMutation as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;
const mockUseAppStore = useAppStore as unknown as jest.Mock;

describe("ButtonsApiTesting", () => {
  const mockMutate = jest.fn();
  const mockRefetch = jest.fn();
  const mockRouterPush = jest.fn();
  const mockDispatch = jest.fn();
  const mockRetry = jest.fn();

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockRouterPush });
    mockUseAppStore.mockReturnValue({ dispatch: mockDispatch });
    mockUseMutation.mockReturnValue({ mutate: mockMutate });
    mockUseQuery.mockReturnValue({
      retry: mockRetry,
      refetch: mockRefetch,
      status: "success",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    test("renders the component correctly", () => {
      render(<ButtonsApiTesting />);
      expect(screen.getByText("Try Mock APIs")).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    test("toggles display of mock API buttons on link click", () => {
      render(<ButtonsApiTesting />);
      const link = screen.getByText("Try Mock APIs");

      // Initially, buttons are not displayed
      expect(screen.queryByText("Get Success")).not.toBeInTheDocument();

      // Click the link to display buttons
      fireEvent.click(link);
      expect(screen.getByText("Get Success")).toBeInTheDocument();

      // Click the link again to hide buttons
      fireEvent.click(link);
      expect(screen.queryByText("Get Success")).not.toBeInTheDocument();
    });

    test("calls mutate with correct parameters on button click", () => {
      render(<ButtonsApiTesting />);
      fireEvent.click(screen.getByText("Try Mock APIs"));

      const successButton = screen.getByText("Get Success");
      fireEvent.click(successButton);
      expect(mockMutate).toHaveBeenCalled();
    });

    test("Click Get Success Button and mutate for getting success mock API", async () => {
      render(<ButtonsApiTesting />);
      fireEvent.click(screen.getByText("Try Mock APIs"));
      fireEvent.click(screen.getByText("Get Success"));

      // Simulate successful mutation
      const mutationFn = mockUseMutation.mock.calls[0][0].mutationFn;
      const onSuccess = mockUseMutation.mock.calls[0][0].onSuccess;
      await mutationFn();
      await onSuccess();

      expect(mockRefetch).toHaveBeenCalled();
    });

    test("Click Get In Progress Button and mutate for getting in progress mock API", async () => {
      render(<ButtonsApiTesting />);
      fireEvent.click(screen.getByText("Try Mock APIs"));
      fireEvent.click(screen.getByText("Get In Progress"));

      // Simulate successful mutation
      const mutationFn = mockUseMutation.mock.calls[0][0].mutationFn;
      const onSuccess = mockUseMutation.mock.calls[0][0].onSuccess;
      await mutationFn();
      await onSuccess();

      expect(mockRefetch).toHaveBeenCalled();
    });

    test("Click Get Failure Button and mutate for getting failure mock API", async () => {
      render(<ButtonsApiTesting />);
      fireEvent.click(screen.getByText("Try Mock APIs"));
      fireEvent.click(screen.getByText("Get Failure"));

      // Simulate successful mutation
      const mutationFn = mockUseMutation.mock.calls[0][0].mutationFn;
      const onSuccess = mockUseMutation.mock.calls[0][0].onSuccess;
      await mutationFn();
      await onSuccess();

      expect(mockRefetch).toHaveBeenCalled();
    });

    test("Click Get Error Button and mutate for getting error mock API", async () => {
      render(<ButtonsApiTesting />);
      fireEvent.click(screen.getByText("Try Mock APIs"));
      fireEvent.click(screen.getByText("Get Error"));

      // Simulate successful mutation
      const mutationFn = mockUseMutation.mock.calls[0][0].mutationFn;
      const onSuccess = mockUseMutation.mock.calls[0][0].onSuccess;
      await mutationFn();
      await onSuccess();

      expect(mockRefetch).toHaveBeenCalled();
    });

    test("dispatches correct action after successful query", async () => {
      render(<ButtonsApiTesting />);
      fireEvent.click(screen.getByText("Try Mock APIs"));
      fireEvent.click(screen.getByText("Get Success"));

      // Simulate successful query
      const queryFn = mockUseQuery.mock.calls[0][0].queryFn;
      await queryFn();

      expect(mockDispatch).toHaveBeenCalled();
      expect(mockRouterPush).toHaveBeenCalled();
    });

    test("Test In progress API Retry Query", async () => {
      render(<ButtonsApiTesting />);
      fireEvent.click(screen.getByText("Try Mock APIs"));
      fireEvent.click(screen.getByText("Get In Progress"));

      // Simulate inprogress query
      const queryFn = mockUseQuery.mock.calls[0][0].queryFn;
      await queryFn();

      // Simulate retry call
      const retry = mockUseQuery.mock.calls[0][0].retry;
      await retry();

      expect(mockDispatch).toHaveBeenCalled();
      expect(mockRouterPush).toHaveBeenCalled();
    });

    test("Get Failure Query", async () => {
      render(<ButtonsApiTesting />);
      fireEvent.click(screen.getByText("Try Mock APIs"));
      fireEvent.click(screen.getByText("Get Failure"));

      // Simulate Failure query
      const queryFn = mockUseQuery.mock.calls[0][0].queryFn;
      await queryFn();

      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
