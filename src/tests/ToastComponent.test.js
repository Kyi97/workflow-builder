import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Toast from "../components/ToastComponent";

describe("ToastComponent", () => {
  test("render toast component with message and handle close", () => {
    const handleClose = jest.fn();
    const { getByText, getByRole } = render(
      <Toast
        type="success"
        message="Operation successful"
        onClose={handleClose}
      />
    );

    const messageElement = getByText(/Operation successful/i);
    expect(messageElement).toBeInTheDocument();

    const closeButton = getByRole("button", { name: /close toast message/i });
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("applies correct class based on type", () => {
    const { container, rerender } = render(
      <Toast type="success" message="Success message" onClose={() => {}} />
    );
    expect(container.firstChild).toHaveClass("toast-success");

    rerender(<Toast type="error" message="Error message" onClose={() => {}} />);
    expect(container.firstChild).toHaveClass("toast-error");

    rerender(
      <Toast type="default" message="Default message" onClose={() => {}} />
    );
    expect(container.firstChild).toHaveClass("toast-default");
  });
});
