import { render, act, screen } from "@testing-library/react";
import 'intersection-observer';
import App from "./App";

const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

describe("App", () => {
  it("renders App component", async () => {
    render(<App />)

    await act(() => wait(2000));

    const pointsContainer = screen.getByTestId('PointsContainer');

    expect(pointsContainer).toBeDefined();

    const internalContainer = pointsContainer?.getElementsByClassName('StreamLayerSDK')[0];

    expect(internalContainer).toBeDefined();
  });
});