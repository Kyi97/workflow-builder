import React, { useMemo } from "react";
import InputComponent from "../components/InputComponent";

const CalculationTaskComponent = ({ task, taskInputs, onInputChange }) => {
  const { task_id } = task;
  const taskInput = useMemo(
    () => taskInputs[task_id] || {},
    [taskInputs, task_id]
  );
  const errors = useMemo(() => taskInput.errors || {}, [taskInput]);

  // Define input fields
  const inputFields = useMemo(
    () => [
      {
        id: "number_one",
        name: `number_one-${task_id}`,
        label: "Number One",
        value: taskInput.number_one ?? 0,
        onChange: (e) => onInputChange(task_id, "number_one", e.target.value),
        type: "number",
        placeholder: "Enter first number",
        error: errors.number_one,
      },
      {
        id: "number_two",
        name: `number_two-${task_id}`,
        label: "Number Two",
        value: taskInput.number_two ?? 0,
        onChange: (e) => onInputChange(task_id, "number_two", e.target.value),
        type: "number",
        placeholder: "Enter second number",
        error: errors.number_two,
      },
      {
        id: "operator",
        name: `operator-${task_id}`,
        label: "Operator",
        value: taskInput.operator ?? "",
        onChange: (e) => onInputChange(task_id, "operator", e.target.value),
        placeholder: "Enter operator (+, -, *, /)",
        error: errors.operator,
      },
    ],
    [task_id, taskInput, errors, onInputChange]
  );

  return (
    <>
      {inputFields.map(({ id, ...props }) => (
        <InputComponent key={id} id={id} {...props} />
      ))}
    </>
  );
};

export default CalculationTaskComponent;
