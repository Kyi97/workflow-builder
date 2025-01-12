import { createSlice } from "@reduxjs/toolkit";
import {
  workflows as initialWorkflows,
  executionLogs as initialexecutionLogs,
} from "../utils/constant";

//find workflow and task
const findWorkflowAndTask = (state, workflowId, taskId) => {
  const workflow = state.workflows.find((w) => w.workflow_id === workflowId);
  const task = workflow
    ? workflow.tasks.find((t) => t.task_id === taskId)
    : null;
  return { workflow, task };
};

const workflowsSlice = createSlice({
  name: "workflows",
  initialState: {
    workflows: initialWorkflows,
    executionLogs: [...initialexecutionLogs],
  },
  reducers: {
    // Add new workflow
    addWorkflow: (state, { payload }) => {
      state.workflows.push(payload);
    },

    // Remove workflow by ID
    removeWorkflow: (state, { payload: workflowId }) => {
      state.workflows = state.workflows.filter(
        (workflow) => workflow.workflow_id !== workflowId
      );
    },

    // Add task
    addTask: (state, { payload: { workflowId, task } }) => {
      const { workflow } = findWorkflowAndTask(state, workflowId);
      if (workflow) {
        workflow.tasks.push(task);
      }
    },

    // Remove task
    removeTask: (state, { payload: { workflowId, taskId } }) => {
      const { workflow } = findWorkflowAndTask(state, workflowId);
      if (workflow) {
        workflow.tasks = workflow.tasks.filter(
          (task) => task.task_id !== taskId
        );
      }
    },

    // Log task execution
    logExecution: (
      state,
      { payload: { workflowId, taskId, isSuccess, message } }
    ) => {
      const { workflow, task } = findWorkflowAndTask(state, workflowId, taskId);
      if (workflow) {
        workflow.isCompleted = message;
        task.isSuccess = isSuccess;
      }
      state.executionLogs.push({
        workflowId,
        taskId,
        workflowName: workflow ? workflow.name : "Unknown Workflow",
        workflowDescription: workflow ? workflow.description : "No Description",
        taskName: task ? task.task_name : "Unknown Task",
        taskType: task ? task.type : "Unknown Type",
        status: isSuccess,
        message: message,
        timestamp: new Date().toISOString(),
      });
    },

    // Update task input
    updateTaskInput: (
      state,
      { payload: { workflowId, taskId, taskInput } }
    ) => {
      const { task } = findWorkflowAndTask(state, workflowId, taskId);
      if (task) {
        task.answer = taskInput;
      }
    },
  },
});

export const {
  addWorkflow,
  removeWorkflow,
  addTask,
  removeTask,
  logExecution,
  updateTaskInput,
} = workflowsSlice.actions;

export default workflowsSlice.reducer;
