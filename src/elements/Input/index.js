import React, { useEffect } from "react";
import { render } from "react-dom";
import HelperText01 from "../HelperText01";

import { inputContainer, input, inputLabel } from "./index.module.css";

const Input = ({
  inputType = "text",
  inputName = "",
  inputId = "",
  inputValue = "",
  labelFor = "",
  labelText = "",
  placeholderText = `Enter ${inputType || "Text"}`,
  handleTextChange,
  handleBlur,
  errors,
}) => {
  const renderErrorState = () => {
    if (inputValue.length === 0) return "";
    return errors && <HelperText01 message={errors} />;
  };

  return (
    <div className={inputContainer}>
      <label className={inputLabel} htmlFor={labelFor}>
        {labelText}
      </label>

      <input
        className={input}
        type={inputType}
        name={inputName}
        id={inputId}
        value={inputValue}
        placeholder={placeholderText}
        onChange={(evt) =>
          handleTextChange(
            evt,
            evt.target.name,
            evt.target.name,
            evt.target.value
          )
        }
        onBlur={handleBlur}
      />
      {renderErrorState()}
    </div>
  );
};

export default Input;
