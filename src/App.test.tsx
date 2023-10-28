import { render } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("renders App component", async () => {
    const {container} = render(<App />);
    const linkElement = container.getElementsByClassName('StreamLayerSDK');
    expect(linkElement.length).toBe(1);
  });
});