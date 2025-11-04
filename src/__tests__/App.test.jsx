import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App.jsx";



test("renders vite + react app", () => {
    render(<App />);
    const linkElement = screen.getByText(/Vite \+ React/i);
    expect(linkElement).toBeInTheDocument();
});

test("increment count button by one", () => {
    render(<App />);
    const buttonElement = screen.getByText("count is 0");
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent("count is 1");
});
