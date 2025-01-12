import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  Suspense,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addWorkflow } from "../redux/workflowsSlice";
import { ArrowLeftIcon as Exist, FlagIcon } from "@heroicons/react/24/outline";
import { tasks } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../components/InputComponent";
import Button from "../components/ButtonComponent";

const WorkflowFlowchart = React.lazy(() =>
  import("../components/FlowChartComponent")
);

const useWorkflowValidation = (workflowName, description, taskName) => {
  const [errors, setErrors] = useState({});

  const validateFields = useCallback(() => {
    const newErrors = {};
    if (!workflowName.trim())
      newErrors.workflowName = "Workflow name is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!taskName.trim()) newErrors.taskName = "Task name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [workflowName, description, taskName]);

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return { errors, validateFields, clearError };
};

const WorkflowBuilder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [workflow, setWorkflow] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [workflowName, setWorkflowName] = useState("");
  const [description, setDescription] = useState("");
  const [taskName, setTaskName] = useState("");

  const availableTasks = useMemo(() => tasks, []);
  const { errors, validateFields, clearError } = useWorkflowValidation(
    workflowName,
    description,
    taskName
  );

  useEffect(() => {
    if (workflow.length > 0 && !selectedTask) {
      setSelectedTask(workflow[0]);
    }
  }, [workflow, selectedTask]);

  // Handle add task
  const handleAddTask = useCallback((task) => {
    const newTask = {
      ...task,
      instanceId: uuidv4(),
      taskName: "",
      values: {
        recipient: "",
        subject: "",
        body: "",
        log_message: "",
        number_one: 0,
        number_two: 0,
        operator: "",
      },
    };
    setWorkflow((prevWorkflow) => [...prevWorkflow, newTask]);
  }, []);

  // Handle field change
  const handleFieldChange = useCallback(
    (field, value) => {
      if (!selectedTask) return;
      const updatedWorkflow = workflow.map((task) =>
        task.instanceId === selectedTask.instanceId
          ? { ...task, values: { ...task.values, [field]: value } }
          : task
      );
      setWorkflow(updatedWorkflow);
      if (value.trim()) {
        clearError(field);
      }
    },
    [workflow, selectedTask, clearError]
  );

  // Handle task name change
  const handleTaskNameChange = useCallback(
    (e) => {
      const updatedTaskName = e.target.value;
      setTaskName(updatedTaskName);

      if (selectedTask) {
        const updatedWorkflow = workflow.map((task) =>
          task.instanceId === selectedTask.instanceId
            ? { ...task, taskName: updatedTaskName }
            : task
        );
        setWorkflow(updatedWorkflow);

        // Clear error
        if (updatedTaskName.trim()) {
          clearError("taskName");
        }
      }
    },
    [workflow, selectedTask, clearError]
  );

  // Handle task selection
  const handleSelectTask = useCallback((task) => {
    setSelectedTask(task);
    setTaskName(task ? task.taskName || "" : "");
  }, []);

  // Handle task reorder
  const handleTaskReorder = useCallback((reorderedWorkflow) => {
    setWorkflow(reorderedWorkflow);
  }, []);

  // Handle create workflow
  const handleCreateWorkflow = useCallback(() => {
    if (!validateFields()) {
      return;
    }
    const workflowData = {
      workflow_id: uuidv4(),
      name: workflowName,
      description,
      isCompleted: false,
      tasks: workflow.map((task, index) => ({
        task_id: task.instanceId,
        task_name: task.name,
        type: task.name,
        answer: { ...task.values },
        sequence: index + 1,
        isSuccess: false,
      })),
    };
    dispatch(addWorkflow(workflowData));
    navigate("/");
  }, [dispatch, navigate, workflow, workflowName, description, validateFields]);

  return (
    <div className="flex flex-col h-screen">
      {/* Navigation Section */}
      <div className="default-bg flex justify-between items-center px-8 py-4 ">
        <div className="flex items-center">
          <Link to="/" className="text-gray-500 flex items-center">
            <Exist className="mr-2 h-5 w-5" />
          </Link>
        </div>

        <Button label="Create" onClick={handleCreateWorkflow}></Button>
      </div>

      {/* Main Section */}
      <div className="flex h-screen border-t border-gray-300">
        {/* Available Tasks Section */}
        <div className="w-1/4 default-bg p-4 rounded ">
          <h2 className="font-large mb-4">Available Tasks</h2>
          {availableTasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-4 p-2 font-medium default-bg rounded cursor-pointer"
              onClick={() => handleAddTask(task)}
            >
              <span>{task.name}</span>
              <button className="font-medium-gray">+</button>
            </div>
          ))}
        </div>

        {/* Workflow Flowchart Section */}
        <div className="w-1/2 p-4 h-[calc(100vh-68px)] overflow-scroll">
          <h2 className="font-medium mt-7 mb-[27px] flex flex-row items-center justify-center rounded-full bg-white shadow-md p-4 max-w-60 mx-auto">
            <FlagIcon className="h-5 w-5 mr-2" />
            Start your workflow
          </h2>
          <Suspense fallback={<div>Loading...</div>}>
            <WorkflowFlowchart
              workflow={workflow}
              onReorder={handleTaskReorder}
              onSelectTask={handleSelectTask}
            />
          </Suspense>
        </div>

        {/* Task Detail Section */}
        <div className="w-1/4 default-bg rounded  border-t border-gray-300 h-[calc(100vh-68px)] overflow-scroll">
          <h2 className="font-large px-4 pt-4">Workflow Details</h2>
          <div className="p-4 ">
            <InputComponent
              label="Workflow Name"
              id="workflowName"
              name="workflowName"
              value={workflowName}
              onChange={(e) => {
                setWorkflowName(e.target.value);
                if (e.target.value.trim()) {
                  clearError("workflowName");
                }
              }}
              placeholder="Enter workflow name"
              error={errors.workflowName}
            />
            <InputComponent
              label="Description"
              id="description"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (e.target.value.trim()) {
                  clearError("description");
                }
              }}
              placeholder="Enter description"
              error={errors.description}
            />
          </div>
          {/* Congfiguration Section */}
          {selectedTask ? (
            <h2 className="font-large px-4 pt-4">
              {selectedTask.name === "Email" && (
                <span>Email Configuration</span>
              )}
              {selectedTask.name === "Calculation" && (
                <span>Calculation Configuration</span>
              )}
              {selectedTask.name === "Log a Message" && (
                <span>Log Message Configuration</span>
              )}
            </h2>
          ) : null}
          {selectedTask ? (
            <div className="p-4">
              <InputComponent
                label="Task Name"
                id="taskName"
                name="taskName"
                value={taskName}
                onChange={handleTaskNameChange}
                placeholder="Enter task name"
                error={errors.taskName}
              />
              {selectedTask.fields.map((field) => (
                <InputComponent
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={selectedTask.values[field] || ""}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                  placeholder={`Enter ${field}`}
                  disabled={true}
                />
              ))}
            </div>
          ) : (
            <p className="font-medium-gray p-4">
              Select a task to edit its details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
