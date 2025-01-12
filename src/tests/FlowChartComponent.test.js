import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const mockWorkflow = [
  { instanceId: "task1", name: "Task 1", isCompleted: false },
  { instanceId: "task2", name: "Task 2", isCompleted: false },
];

const renderTask = (task, index) => (
  <Draggable key={task.instanceId} draggableId={task.instanceId} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="p-4 shadow rounded bg-white"
      >
        <h3 className="font-medium">{task.name}</h3>
      </div>
    )}
  </Draggable>
);

test("render flowchart component and handle drag drop", () => {
  const handleReorder = jest.fn();

  const { getByText } = render(
    <DragDropContext onDragEnd={handleReorder}>
      <Droppable droppableId="droppable" direction="vertical">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {mockWorkflow.map((task, index) => renderTask(task, index))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

  const task1 = getByText(/Task 1/i);
  const task2 = getByText(/Task 2/i);

  expect(task1).toBeInTheDocument();
  expect(task2).toBeInTheDocument();

  fireEvent.dragStart(task1);
  fireEvent.dragEnter(task2);
  fireEvent.dragOver(task2);
  fireEvent.drop(task2);
  fireEvent.dragEnd(task1);
});
