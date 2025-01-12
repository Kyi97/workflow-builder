import React from "react";
import clsx from "clsx";

const Toast = ({ type = "default", message, onClose }) => {
  return (
    <div
      className={clsx(
        "toast-box fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-md",
        {
          "toast-default": type === "default",
          "toast-success": type === "success",
          "toast-error": type === "error",
        }
      )}
      role="alert"
      aria-live="assertive"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-gray-500 hover:text-gray-700"
        aria-label="Close toast message"
      >
        ×
      </button>
    </div>
  );
};

export default React.memo(Toast);
