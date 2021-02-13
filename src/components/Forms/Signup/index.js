import React, { useReducer, useEffect } from "react";
import Input from "../../../elements/Input";
import { form, fieldset__vertical } from "./index.module.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "ON_CHANGE":
      return {
        ...state,
        [action.field]: action.payload,
      };

    default:
      return state;
  }
};

const Signup = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleTextChange = (evt, type, field, payload) => {
    dispatch({
      type,
      field,
      payload,
    });
  };

  useEffect(() => {
    console.log("formState".toUpperCase(), formState);
  });

  return (
    <form className={form}>
      <fieldset className={fieldset__vertical}>
        {/* <legend>Signup Form</legend> */}
        <Input
          inputType="email"
          inputId="email"
          inputName="email"
          labelFor="email"
          labelText="Email"
          handleTextChange={handleTextChange}
          inputValue={formState.email}
        />
        <Input
          inputType="password"
          inputId="password"
          inputName="password"
          labelFor="password"
          labelText="Password"
          handleTextChange={handleTextChange}
          inputValue={formState.password}
        />
      </fieldset>
    </form>
  );
};

export default Signup;
