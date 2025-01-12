import React, { useState, useCallback } from "react";
import Button from "./ButtonComponent";
import { TrashIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const CardComponent = ({
  workflow_id,
  name,
  description,
  tasks,
  onExecute,
  buttonLabel,
  buttonDisabled,
  onDelete,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  // Handle execute click
  const handleExecuteClick = useCallback(() => {
    if (onExecute) {
      onExecute();
    }
  }, [onExecute]);

  // Handle delete click
  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(workflow_id);
    }
  };

  // Toggle options
  const toggleOptionsMenu = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <div className="min-w-70 rounded-lg p-4 default-bg">
      <div className="flex justify-between">
        {/* Name */}
        <h2 className="font-medium text-black">{name}</h2>
        <div className="flex items-center">
          {/* Options Button */}
          <button
            onClick={toggleOptionsMenu}
            className="p-1 rounded-full text-gray-500 hover:text-gray-700"
          >
            <EllipsisVerticalIcon className="h-5 w-5" />
          </button>

          {/* Show Delete Icon*/}
          {showOptions && (
            <button
              onClick={handleDeleteClick}
              className="ml-4 p-1 rounded-full text-red-500 hover:text-red-700 hover:bg-gray-200"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      {/* Description */}
      <div className="mt-2">
        <span className="font-medium-gray">Description</span>
        <p className="mt-1 font-medium-gray">{description}</p>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          {/* Tasks */}
          <span className="font-medium-gray">{tasks} Tasks</span>
          <Button
            label={buttonLabel}
            onClick={handleExecuteClick}
            disabled={buttonDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
