import React from "react";
import {
  render,
  fireEvent,
  getByLabelText,
  getByPlaceholderText,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import CalculationTaskComponent from "../components/CalculationTaskComponent";

describe("CalculationTaskComponent", () => {
  test("render calculation task component and handle input change", () => {
    const task = { task_id: 1 };
    const taskInputs = { 1: { number_one: 5, operator: "+", number_two: 10 } };
    const handleInputChange = jest.fn();

    const { container } = render(
      <CalculationTaskComponent
        task={task}
        onInputChange={handleInputChange}
        taskInputs={taskInputs}
      />
    );

    const numberOneInput = getByLabelText(container, /Number One/i);
    expect(numberOneInput).toBeInTheDocument();
    expect(numberOneInput.value).toBe("5");

    fireEvent.change(numberOneInput, { target: { value: "15" } });
    expect(handleInputChange).toHaveBeenCalledWith(1, "number_one", "15");

    const operatorInput = getByPlaceholderText(container, /Enter operator/i);
    expect(operatorInput).toBeInTheDocument();
    expect(operatorInput.value).toBe("+");

    fireEvent.change(operatorInput, { target: { value: "-" } });
    expect(handleInputChange).toHaveBeenCalledWith(1, "operator", "-");

    const numberTwoInput = getByLabelText(container, /Number Two/i);
    expect(numberTwoInput).toBeInTheDocument();
    expect(numberTwoInput.value).toBe("10");

    fireEvent.change(numberTwoInput, { target: { value: "20" } });
    expect(handleInputChange).toHaveBeenCalledWith(1, "number_two", "20");
  });
});
