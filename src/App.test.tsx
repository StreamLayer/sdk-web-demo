import { render } from "@testing-library/react";
import 'intersection-observer';
import App from "./App";

describe("App", () => {
  it("renders App component", async () => {
    const {container} = render(<App />);
    const [internalContainer] = container.getElementsByClassName('StreamLayerSDKTheme');

    expect(internalContainer).toBeDefined();
  });
});