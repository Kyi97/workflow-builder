import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const InputComponent = ({
  label,
  type = "text",
  disabled,
  name,
  value,
  onChange,
  placeholder = "",
  error = "",
}) => {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label htmlFor={name} className="mb-2 font-medium text-black">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          "px-3 py-2 border rounded-md  focus:outline-none font-medium-gray",
          {
            "border-red-500": error,
            "border-gray-300": !error,
            "focus:ring-2 focus:ring-black": !error,
          }
        )}
      />
      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
    </div>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default InputComponent;
