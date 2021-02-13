import React from "react";

const Input = ({ type = "text", name = "" }) => {
  return (
    <>
      <input type="radio" name="size" id="size_1" value="small" />
      <label for="size_1">Email</label>
    </>
  );
};

export default Input;
