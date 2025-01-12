import React, { lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeWorkflow } from "../redux/workflowsSlice";
import Button from "../components/ButtonComponent";

// Lazy load CardComponent
const CardComponent = lazy(() => import("../components/CardComponent"));

// Workflows Listing Page
const WorkflowListingPage = () => {
  const dispatch = useDispatch();
  const workflows = useSelector((state) => state.workflows.workflows);
  const navigate = useNavigate();

  // Handle adding a new workflow
  const handleAddWorkflow = () => {
    navigate("/builder");
  };

  // Handle navigating
  const handleNavigateToExecution = (workflowId) => {
    navigate(`/builder/${workflowId}`);
  };

  // Handle deleting a workflow
  const handleDeleteWorkflow = (workflowId) => {
    dispatch(removeWorkflow(workflowId));
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-large">Manage Workflows</h1>
        <Button onClick={handleAddWorkflow} label="New Workflow" />
      </div>

      {/* Render Workflows */}
      <div className="mt-6">
        {workflows.length > 0 ? (
          <Suspense fallback={<div>Loading...</div>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflows.map(
                (workflow) =>
                  workflow &&
                  workflow.workflow_id && (
                    <CardComponent
                      key={workflow.workflow_id}
                      workflow_id={workflow.workflow_id}
                      name={workflow.name}
                      description={workflow.description}
                      tasks={workflow.tasks?.length || 0}
                      onExecute={
                        workflow.isCompleted
                          ? undefined
                          : () =>
                              handleNavigateToExecution(workflow.workflow_id)
                      }
                      buttonLabel={
                        workflow.isCompleted ? "Completed" : "Execute"
                      }
                      buttonDisabled={workflow.isCompleted}
                      onDelete={handleDeleteWorkflow}
                    />
                  )
              )}
            </div>
          </Suspense>
        ) : (
          <p className="font-medium-gray text-center">
            No workflows available. Create a new one.
          </p>
        )}
      </div>
    </div>
  );
};

export default WorkflowListingPage;
