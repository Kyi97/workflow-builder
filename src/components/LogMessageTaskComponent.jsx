import React, { useMemo, useCallback } from "react";
import InputComponent from "../components/InputComponent";

const LogMessageTaskComponent = ({ task, onInputChange, taskInputs }) => {
  //Get task input
  const taskInput = useMemo(
    () => taskInputs[task.task_id] || {},
    [taskInputs, task.task_id]
  );
  const errors = useMemo(() => taskInput.errors || {}, [taskInput]);

  //Handle input change
  const handleInputChange = useCallback(
    (e) => onInputChange(task.task_id, "log_message", e.target.value),
    [task.task_id, onInputChange]
  );

  return (
    <InputComponent
      id="log_message"
      name={`log_message-${task.task_id}`}
      label="Log Message"
      value={taskInput.log_message || ""}
      onChange={handleInputChange}
      placeholder="Enter log message"
      error={errors.log_message}
    />
  );
};

export default LogMessageTaskComponent;
