import React from "react";

const Input = ({
  inputType = "text",
  inputName = "",
  inputId = "",
  inputValue = "",
  labelFor = "",
  labelText = "",
  placeholderText = `Enter ${inputType || "Text"}`,
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
      />
    </>
  );
};

export default Input;
