import { render } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("renders App component", async () => {
    const {container} = render(<App />);
    const buttons = container.getElementsByTagName('button');
    const enableButton = [...buttons].find((button) => button.innerHTML === 'enable');

    expect(enableButton).toBeDefined();
  });
});