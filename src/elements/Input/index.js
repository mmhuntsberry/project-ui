import React from "react";

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
    <>
      <label htmlFor={labelFor}>{labelText}</label>
      <input
        type={inputType}
        name={inputName}
        id={inputId}
        value={inputValue}
        placeholder={placeholderText}
        onChange={(evt) =>
          handleTextChange(evt, "ON_CHANGE", evt.target.name, evt.target.value)
        }
      />
    </>
  );
};

export default Input;
