import React, { useReducer, useState, useEffect } from "react";
import Input from "../../../elements/Input";
import { form, fieldset__vertical, form__button } from "./index.module.css";

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
  // const PROXY = "https://cors-anywhere.herokuapp.com/";
  // const PROXY = "https://salty-stream-25179.herokuapp.com/";
  const GET_USERS = `https://prisma-fe-dev-assignent.vercel.app/api/users`;
  const [url] = useState(
    "https://prisma-fe-dev-assignent.vercel.app/api/register"
  );

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
    fetch(GET_USERS, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        mode: "cors",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  });

  const onFormSubmit = (evt) => {
    console.log(formState);
    evt.preventDefault();

    fetch(url, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        body: formState,
        mode: "cors",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  };

  return (
    <form className={form} onSubmit={onFormSubmit}>
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
        <input className={form__button} type="submit" value="Sign up" />
      </fieldset>
    </form>
  );
};

export default Signup;
