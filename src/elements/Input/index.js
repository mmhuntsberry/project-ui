import React from "react";
import { input__container, input } from "./index.module.css";

const Input = ({
  inputType = "text",
  inputName = "",
  inputId = "",
  inputValue = "",
  labelFor = "",
  labelText = "",
  placeholderText = `Enter ${inputType || "Text"}`,
  handleTextChange,
}) => {
  return (
    <div className={input__container}>
      <label htmlFor={labelFor}>{labelText}</label>
      <input
        className={input}
        type={inputType}
        name={inputName}
        id={inputId}
        value={inputValue}
        placeholder={placeholderText}
        onChange={(evt) =>
          handleTextChange(evt, "ON_CHANGE", evt.target.name, evt.target.value)
        }
      />
    </div>
  );
};

export default Input;
