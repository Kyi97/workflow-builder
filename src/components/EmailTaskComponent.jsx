import React, { useMemo, useCallback } from "react";
import InputComponent from "../components/InputComponent";

const EmailTaskComponent = ({ task, taskInputs, onInputChange }) => {
  // Get task input
  const taskInput = useMemo(
    () => taskInputs[task.task_id] || {},
    [taskInputs, task.task_id]
  );
  const errors = useMemo(() => taskInput.errors || {}, [taskInput]);

  // Handle input change
  const handleInputChange = useCallback(
    (field) => (e) => onInputChange(task.task_id, field, e.target.value),
    [task.task_id, onInputChange]
  );

  // Define input fields
  const inputFields = useMemo(
    () => [
      {
        label: "Recipient",
        name: `recipient-${task.task_id}`,
        value: taskInput.recipient || "",
        onChange: handleInputChange("recipient"),
        placeholder: "Enter email recipient",
        error: errors.recipient,
      },
      {
        label: "Subject",
        name: `subject-${task.task_id}`,
        value: taskInput.subject || "",
        onChange: handleInputChange("subject"),
        placeholder: "Enter subject",
        error: errors.subject,
      },
      {
        label: "Body",
        name: `body-${task.task_id}`,
        value: taskInput.body || "",
        onChange: handleInputChange("body"),
        placeholder: "Enter email body",
        error: errors.body,
      },
    ],
    [task.task_id, taskInput, errors, handleInputChange]
  );

  return (
    <>
      {inputFields.map(
        ({ label, name, value, onChange, placeholder, error }) => (
          <InputComponent
            key={name}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            error={error}
          />
        )
      )}
    </>
  );
};

export default EmailTaskComponent;
