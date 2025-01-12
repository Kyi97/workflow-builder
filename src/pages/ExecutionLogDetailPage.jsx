import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EmailTaskComponent from "../components/EmailTaskComponent";
import LogMessageTaskComponent from "../components/LogMessageTaskComponent";
import CalculationTaskComponent from "../components/CalculationTaskComponent";
import Button from "../components/ButtonComponent";

const ExecutionLogDetailPage = () => {
  const { workflowId, taskId } = useParams();
  const navigate = useNavigate();

  // Get workflow data
  const workflow = useSelector((state) =>
    state.workflows.workflows.find((w) => w.workflow_id === workflowId)
  );

  // Get task data
  const task = useMemo(() => {
    return workflow
      ? workflow.tasks.find((t) => t.task_id.toString() === taskId)
      : null;
  }, [workflow, taskId]);

  // Get task inputs
  const taskInputs = useMemo(() => {
    return workflow.tasks.reduce((acc, task) => {
      acc[task.task_id] = {
        log_message: task.answer?.log_message || "",
        recipient: task.answer?.recipient || "",
        subject: task.answer?.subject || "",
        body: task.answer?.body || "",
        number_one: task.answer?.number_one || 0,
        number_two: task.answer?.number_two || 0,
        operator: task.answer?.operator || "",
        errors: {},
      };
      return acc;
    }, {});
  }, [workflow]);

  // Handle input change
  const handleInputChange = useCallback((taskId, field, value) => {
    console.log(`Task ID: ${taskId}, Field: ${field}, Value: ${value}`);
  }, []);

  // Check if workflow and task
  if (!workflow || !task) {
    return (
      <div className="p-8">
        <h1 className="text-2xl text-gray-900 font-bold">Task Not Found</h1>
        <Button onClick={() => navigate(-1)} label="Back" className="mt-4" />
      </div>
    );
  }

  // Render task component
  const renderTaskComponent = (taskType) => {
    switch (taskType) {
      case "Email":
        return (
          <EmailTaskComponent
            task={task}
            taskInputs={taskInputs}
            onInputChange={handleInputChange}
          />
        );
      case "Log a Message":
        return (
          <LogMessageTaskComponent
            task={task}
            taskInputs={taskInputs}
            onInputChange={handleInputChange}
          />
        );
      case "Calculation":
        return (
          <CalculationTaskComponent
            task={task}
            taskInputs={taskInputs}
            onInputChange={handleInputChange}
          />
        );
      default:
        return (
          <p className="font-medium-gray">
            Task type "{task.type}" is not supported on this page.
          </p>
        );
    }
  };

  return (
    <div className="p-6">
      {/* Workflow Details */}
      <h1 className="font-large mb-6">Execution Log Details</h1>
      <div className="p-6 default-bg rounded-md ">
        <h1 className="font-large text-gray-900 ">{workflow.name}</h1>
        <p className="font-medium-gray  mt-2">{workflow.description}</p>
        <div className="mt-8">
          <h2 className="font-large">
            {task.sequence}. {task.task_name}
          </h2>
          <div className="mt-4 ">
            {/* Render Task Component */}
            <div className="mt-4">{renderTaskComponent(task.type)}</div>
          </div>
        </div>
        <div className="mt-8">
          <Button
            onClick={() => navigate(-1)}
            label="Back"
            className="bg-blue-500 text-white hover:bg-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default ExecutionLogDetailPage;
