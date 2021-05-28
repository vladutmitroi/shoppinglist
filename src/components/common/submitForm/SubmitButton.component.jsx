import React from "react";

export const SubmitButton = ({
  title,
  layoutClass,
  handleSubmit,
  disabled,
}) => {
  return (
    <div className="row full-width">
      <div className={`col ${layoutClass} input-field`}>
        <button
          disabled={disabled}
          className="primary-btn p-15"
          onClick={handleSubmit}
        >
          {title}
        </button>
      </div>
    </div>
  );
};
