import React from "react";
import clsx from "clsx";

const Button = React.memo(
  ({ label, textColor = "text-white", onClick, disabled = false }) => {
    return (
      <button
        className={clsx(
          "p-2 rounded bg-black font-small min-w-20",
          textColor,
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    );
  }
);

export default Button;
