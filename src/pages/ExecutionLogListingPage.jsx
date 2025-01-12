import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableComponent from "../components/TableComponent";

const ExecutionLogListingPage = ({ workflowId }) => {
  const navigate = useNavigate();
  const executionLogs = useSelector((state) => state.workflows.executionLogs);
  const workflows = useSelector((state) => state.workflows.workflows);

  const logs = useMemo(() => {
    return executionLogs?.filter(
      (log) => log.workflowId === workflowId || !workflowId
    );
  }, [executionLogs, workflowId]);

  const columns = useMemo(
    () => [
      { header: "Workflow Name", accessor: "workflowName" },
      { header: "Workflow Description", accessor: "workflowDescription" },
      { header: "Task Name", accessor: "taskName" },
      { header: "Task Type", accessor: "taskType" },
      { header: "Status", accessor: "status" },
      { header: "Message", accessor: "message" },
    ],
    []
  );

  const formattedLogs = useMemo(() => {
    return logs?.map((log) => {
      const workflow =
        workflows.find((w) => w.workflow_id === log.workflowId) || {};
      const task = workflow.tasks?.find((t) => t.task_id === log.taskId) || {};

      return {
        ...log,
        workflowName: workflow.name || "Unknown Workflow",
        workflowDescription: workflow.description || "No Description",
        taskName: task.task_name || "Unknown Task",
        taskType: task.type || "Unknown Type",
        status: (
          <span
            className={log.status === true ? "text-green-400" : "text-red-400"}
          >
            {log.status === true ? "Success" : "Failed"}
          </span>
        ),
        message: log.message ? "Completed" : "Pending",
      };
    });
  }, [logs, workflows]);

  return (
    <div className="p-6">
      <h1 className="font-large mb-4">Execution Logs</h1>
      {formattedLogs?.length > 0 ? (
        <TableComponent
          columns={columns}
          data={formattedLogs}
          onDetailsClick={(row) =>
            navigate(`/execution-log/${row.workflowId}/${row.taskId}`)
          }
        />
      ) : (
        <p className="font-medium-gray">No Data Available</p>
      )}
    </div>
  );
};

export default ExecutionLogListingPage;
