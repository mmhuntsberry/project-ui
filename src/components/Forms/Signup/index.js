import React from "react";
import Input from "../../../elements/Input";

const Signup = () => {
  return (
    <form>
      <fieldset>
        <legend>Signup Form</legend>
        <Input
          inputType="email"
          inputId="email"
          inputName="email"
          labelFor="email"
          labelText="Email"
        />
      </fieldset>
    </form>
  );
};

export default Signup;
