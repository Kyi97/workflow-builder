import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import sendEmailWithEmailJS from "../composables/useEmail";
import { logExecution, updateTaskInput } from "../redux/workflowsSlice";
import Button from "../components/ButtonComponent";
import EmailTaskComponent from "../components/EmailTaskComponent";
import LogMessageTaskComponent from "../components/LogMessageTaskComponent";
import CalculationTaskComponent from "../components/CalculationTaskComponent";
import Toast from "../components/ToastComponent";

const WorkflowExecutionPage = () => {
  const { workflowId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const workflow = useSelector((state) =>
    state.workflows.workflows.find((w) => w.workflow_id === workflowId)
  );

  const [taskInputs, setTaskInputs] = useState({});
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState({ type: "", message: "" });

  // Handle input change
  const handleInputChange = (taskId, fieldName, value) => {
    setTaskInputs((prev) => {
      const updatedInputs = {
        ...prev,
        [taskId]: {
          ...prev[taskId],
          [fieldName]: value,
          errors: { ...prev[taskId]?.errors, [fieldName]: "" },
        },
      };

      //  Update task input
      dispatch(
        updateTaskInput({
          workflowId: workflow.workflow_id,
          taskId,
          taskInput: updatedInputs[taskId],
        })
      );

      return updatedInputs;
    });
  };

  // Validate inputs
  const validateInputs = (task) => {
    const taskInput = taskInputs[task.task_id] || {};
    const errors = {};
    switch (task.type) {
      case "Email":
        if (!taskInput.recipient) errors.recipient = "Recipient is required.";
        if (!taskInput.subject) errors.subject = "Subject is required.";
        if (!taskInput.body) errors.body = "Body is required.";
        break;
      case "Log a Message":
        if (!taskInput.log_message)
          errors.log_message = "Log message is required.";
        break;
      case "Calculation":
        const { number_one, number_two, operator } = taskInput;
        if (!number_one) errors.number_one = "Number One is required.";
        if (!number_two) errors.number_two = "Number Two is required.";
        if (!operator) {
          errors.operator = "Operator is required.";
        } else if (!["+", "-", "*", "/"].includes(operator)) {
          errors.operator = "Operator must be one of (+, -, *, /).";
        }
        break;
      default:
        break;
    }
    return errors;
  };

  // Handle Execute
  const handleExecute = async () => {
    if (!workflow || !workflow.tasks) return;

    const totalTasks = workflow.tasks.length;
    let isSuccess = true;

    setIsLoading(true);
    setErrorMessage("");

    const currentTask = workflow.tasks[currentTaskIndex];
    const errors = validateInputs(currentTask);

    if (Object.keys(errors).length > 0) {
      setTaskInputs((prev) => ({
        ...prev,
        [currentTask.task_id]: { ...prev[currentTask.task_id], errors },
      }));
      setIsLoading(false);
      return;
    }

    const taskInput = taskInputs[currentTask.task_id] || {};
    try {
      let toastMessage = "";
      let toastType = "success";

      switch (currentTask.type) {
        case "Email":
          await sendEmailWithEmailJS({
            recipient: taskInput.recipient,
            subject: taskInput.subject,
            body: taskInput.body,
          });
          toastMessage = "Email sent successfully";
          break;
        case "Log a Message":
          toastMessage = "Message logged successfully";
          break;
        case "Calculation":
          const { number_one, number_two, operator } = taskInput;
          const num1 = parseFloat(number_one);
          const num2 = parseFloat(number_two);
          let result;
          switch (operator) {
            case "+":
              result = num1 + num2;
              break;
            case "-":
              result = num1 - num2;
              break;
            case "*":
              result = num1 * num2;
              break;
            case "/":
              result = num2 !== 0 ? num1 / num2 : "Error: Division by zero";
              break;
            default:
              toastMessage = "Invalid operator.";
              toastType = "error";
              setToast({ type: toastType, message: toastMessage });
              isSuccess = false;
              break;
          }
          toastMessage = `Result: ${result}`;
          break;
        default:
          break;
      }
    } catch (error) {
      setToast({
        type: "error",
        message: error.message || "An error occurred.",
      });
      isSuccess = false;
    }
    // If successful
    if (isSuccess) {
      // Dispatch logExecution
      dispatch(
        logExecution({
          workflowId: workflow.workflow_id,
          taskId: workflow.tasks[currentTaskIndex]?.task_id,
          isSuccess: isSuccess,
          message: isSuccess,
        })
      );

      // Handle navigation
      if (currentTaskIndex + 1 < totalTasks) {
        setCurrentTaskIndex(currentTaskIndex + 1);
      } else {
        setToast({ type: "success", message: "Workflow completed" });
        navigate("/");
      }
    }
    setIsLoading(false);
  };

  // Redirect to home
  useEffect(() => {
    if (!workflow) navigate("/");
  }, [workflow, navigate]);

  const currentTask = workflow?.tasks?.[currentTaskIndex];

  return (
    <div className="p-6">
      <h1 className="font-large mb-6">Execution Workflow</h1>
      <div className="p-6 default-bg rounded  ">
        <h1 className="font-large text-black ">{workflow?.name}</h1>
        <p className="font-medium-gray  mt-2">{workflow?.description}</p>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {toast.message && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast({ type: "", message: "" })}
          />
        )}

        <div className="mt-8">
          <h2 className="font-large">
            {currentTask.sequence}. {currentTask.task_name}
          </h2>
          {currentTask ? (
            <div className="p-4 rounded-md ">
              <h4 className="font-medium-gray">{currentTask.description}</h4>

              {currentTask.type === "Email" && (
                <EmailTaskComponent
                  task={currentTask}
                  onInputChange={handleInputChange}
                  taskInputs={taskInputs}
                />
              )}

              {currentTask.type === "Log a Message" && (
                <LogMessageTaskComponent
                  task={currentTask}
                  onInputChange={handleInputChange}
                  taskInputs={taskInputs}
                />
              )}

              {currentTask.type === "Calculation" && (
                <CalculationTaskComponent
                  task={currentTask}
                  onInputChange={handleInputChange}
                  taskInputs={taskInputs}
                />
              )}

              <div className="mt-6">
                <Button
                  label={
                    isLoading
                      ? "Processing..."
                      : currentTaskIndex === workflow.tasks.length - 1
                      ? "Submit"
                      : "Next"
                  }
                  onClick={handleExecute}
                  disabled={isLoading}
                ></Button>
              </div>
            </div>
          ) : (
            <p>No task available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowExecutionPage;
