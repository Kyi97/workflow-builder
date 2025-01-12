import { DocumentChartBarIcon, FolderIcon } from "@heroicons/react/24/outline";

// Workflows
export const workflows = [
  {
    workflow_id: "48c3c1a2-e10a-4acd-bb9a-2653d9b50fb0",
    name: "Sample Workflow",
    description: "This is a sample workflow",
    isCompleted: true,
    tasks: [
      {
        task_id: "48c3c1a2-e10a-4acd-bb9a-2653d9b50fn1",
        task_name: "Email for Task 1",
        type: "Email",
        answer: {
          recipient: "b7TtW@example.com",
          subject: "Task 1",
          body: "Task 1",
          log_message: "",
          number_one: 0,
          number_two: 0,
          operator: "",
        },
        sequence: 1,
        isSuccess: true,
      },
      {
        task_id: "48c3c1a2-e10a-4acd-bb9a-2653d9b50fn2",
        task_name: "Message for Task 2",
        type: "Log a Message",
        answer: {
          recipient: "",
          subject: "",
          body: "",
          log_message: "Hello Task 2",
          number_one: 0,
          number_two: 0,
          operator: "",
        },
        sequence: 2,
        isSuccess: true,
      },
      {
        task_id: "48c3c1a2-e10a-4acd-bb9a-2653d9b50fn3",
        task_name: "Calculation for Task 3",
        type: "Calculation",
        answer: {
          recipient: "",
          subject: "",
          body: "",
          log_message: "",
          number_one: 2,
          number_two: 3,
          operator: "+",
        },
        sequence: 3,
        isSuccess: true,
      },
    ],
  },
];

//Execution Logs
export const executionLogs = [
  {
    message: true,
    status: true,
    taskId: "48c3c1a2-e10a-4acd-bb9a-2653d9b50fn1",
    taskName: "Email for Task 1",
    taskType: "Log a Message",
    timestamp: "2025-01-11T13:50:00.925Z",
    workflowDescription: "This is a sample workflow",
    workflowId: "48c3c1a2-e10a-4acd-bb9a-2653d9b50fb0",
    workflowName: "SampleWorkflow",
  },
  {
    message: true,
    status: true,
    taskId: "48c3c1a2-e10a-4acd-bb9a-2653d9b50fn2",
    taskName: "Message for Task 2",
    taskType: "Log a Message",
    timestamp: "2025-01-11T13:50:00.925Z",
    workflowDescription: "This is a sample workflow",
    workflowId: "48c3c1a2-e10a-4acd-bb9a-2653d9b50fb0",
    workflowName: "SampleWorkflow",
  },
  {
    message: true,
    status: true,
    taskId: "48c3c1a2-e10a-4acd-bb9a-2653d9b50fn3",
    taskName: "Calculation for Task 3",
    taskType: "Calculation",
    timestamp: "2025-01-11T13:50:00.925Z",
    workflowDescription: "This is a sample workflow",
    workflowId: "48c3c1a2-e10a-4acd-bb9a-2653d9b50fb0",
    workflowName: "SampleWorkflow",
  },
];

// Task Types
export const tasks = [
  { name: "Email", fields: ["recipient", "subject", "body"] },
  { name: "Log a Message", fields: ["message"] },
  {
    name: "Calculation",
    fields: ["number1", "number2", "operator"],
  },
];

// EmailJS Config
export const EMAILJS_CONFIG = {
  USER_ID: "25uko_8OTxZ-Rxp_C",
  TEMPLATE_ID: "template_1w4dmzm",
  SERVICE_ID: "service_sa85swh",
};

//Navigation
export const navigation = [
  {
    name: "Workflows",
    href: "/",
    icon: DocumentChartBarIcon,
  },
  {
    name: "Execution Logs",
    href: "/execution-log",
    icon: FolderIcon,
  },
];
