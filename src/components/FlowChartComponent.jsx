import React, { useMemo, useCallback, useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

const FlowChartComponent = ({ workflow = [], onSelectTask, onReorder }) => {
  const [workflowState, setWorkflowState] = useState(workflow);

  useEffect(() => {
    setWorkflowState(workflow);
  }, [workflow]);

  const memoizedWorkflow = useMemo(() => workflowState, [workflowState]);

  // Handle task click
  const handleTaskClick = useCallback(
    (task) => {
      onSelectTask(task);
    },
    [onSelectTask]
  );

  // Handle task removal
  const handleRemoveTask = useCallback(
    (taskId) => {
      const updatedWorkflow = workflowState.filter(
        (task) => task.instanceId !== taskId
      );
      setWorkflowState(updatedWorkflow);

      if (onReorder) {
        onReorder(updatedWorkflow);
      }

      if (onSelectTask) {
        const remainingTask =
          updatedWorkflow.length > 0 ? updatedWorkflow[0] : null;
        onSelectTask(remainingTask);
      }
    },
    [workflowState, onReorder, onSelectTask]
  );

  // Handle drag and drop
  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.index === source.index) return;

    const reorderedWorkflow = Array.from(workflowState);
    const [removed] = reorderedWorkflow.splice(source.index, 1);
    reorderedWorkflow.splice(destination.index, 0, removed);
    setWorkflowState(reorderedWorkflow);

    if (onReorder) {
      onReorder(reorderedWorkflow);
    }
  };

  // Render Task
  const renderTask = (task, index) => (
    <Draggable
      key={task.instanceId}
      draggableId={task.instanceId}
      index={index}
      isDragDisabled={task.isCompleted}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => handleTaskClick(task)}
          className="flex items-center justify-center space-x-4 py-3"
        >
          <div className="task-container flex flex-col items-center justify-center relative">
            {/* Connector line*/}
            <div className="absolute bottom-[76px] flex flex-col items-center">
              <div className="w-px bg-gray-400 h-10"></div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-gray-400 mt-[-8px]"></div>
            </div>
            <div className="flex items-center space-x-2 p-4 shadow-md rounded bg-white min-w-60 relative">
              <div
                className="drag-handle cursor-move p-2"
                {...provided.dragHandleProps}
              >
                <span className="text-xl">⋮⋮⋮</span>
              </div>
              {/* Task name */}
              <div className="flex-1">
                <h3 className="font-medium">{task.name}</h3>
              </div>
              {/* Remove Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTask(task.instanceId);
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                aria-label="Remove Task"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId={uuidv4()}
        direction="vertical"
        type="task"
        key={Math.random()}
      >
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col items-center justify-center space-y-4"
          >
            {memoizedWorkflow.map(renderTask)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FlowChartComponent;
