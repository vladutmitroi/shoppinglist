import React from "react";
import { SubmitButton } from "./SubmitButton.component";
const textInputType = ["location", "quantity", "addProduct"];
const numberInputType = ["total"];

export const SubmitForm = ({
  handleOnInputChange,
  handleSubmit,
  buttonProps: { submitButtonLayoutClass, submitButtonText } = {},
  formState = {},
  errorMessage,
}) => {
  const stateArray = [];
  Object.keys(formState).forEach((key) => stateArray.push(key));

  const checkMissingFields = () => {
    let disabled = false;
    for (let key in formState) {
      if (!formState[key]) disabled = true;
    }
    return disabled;
  };

  const disabled = checkMissingFields();

  const renderFormInputs = () => {
    return stateArray.map((field, idx) => {
      return (
        <div key={`${idx}_${field}`} className="row full-width">
          <div className="input-field col s12 m8">
            <input
              value={formState[field]}
              id={field}
              type={
                textInputType.includes(field)
                  ? "text"
                  : numberInputType.includes(field)
                  ? "number"
                  : field
              }
              name={field}
              placeholder={field}
              onChange={handleOnInputChange}
            />
            <label htmlFor={field} className={`fas ${field}-icon`} />
          </div>
        </div>
      );
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderFormInputs()}
      {errorMessage && (
        <div className="row red-text error-message">{errorMessage}</div>
      )}
      <SubmitButton
        disabled={disabled}
        key="submit-button"
        title={submitButtonText}
        layoutClass={submitButtonLayoutClass}
        handleSubmit={handleSubmit}
      />
    </form>
  );
};

export default SubmitForm;
