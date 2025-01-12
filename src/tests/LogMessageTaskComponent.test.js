import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LogMessageTaskComponent from "../components/LogMessageTaskComponent";

describe("LogMessageTaskComponent", () => {
  test("render log message component and handle input change", () => {
    const task = { task_id: 1 };
    const taskInputs = { 1: { log_message: "Initial message" } };
    const handleInputChange = jest.fn();

    const { getByLabelText } = render(
      <LogMessageTaskComponent
        task={task}
        onInputChange={handleInputChange}
        taskInputs={taskInputs}
      />
    );

    const inputElement = getByLabelText(/Log Message/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe("Initial message");

    fireEvent.change(inputElement, { target: { value: "Updated message" } });
    expect(handleInputChange).toHaveBeenCalledWith(
      1,
      "log_message",
      "Updated message"
    );
  });
});
