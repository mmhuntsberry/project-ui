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
  const PROXY = "https://salty-stream-25179.herokuapp.com/";
  const GET_USERS = `https://prisma-fe-dev-assignent.vercel.app/api/users`;
  const [url] = useState(
    "https://prisma-fe-dev-assignent.vercel.app/api/register"
  );

  const initialState = {
    email: "",
    password: "",
  };
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: data ? { "Content-type": "application/json" } : {},
    }).then((response) => response.json());
  };

  const handleTextChange = (evt, type, field, payload) => {
    dispatch({
      type,
      field,
      payload,
    });
  };

  useEffect(() => {
    console.log("formState".toUpperCase(), formState);
    sendHttpRequest("GET", PROXY + GET_USERS).then((data) => console.log(data));
  });

  const onFormSubmit = (evt) => {
    console.log(formState);
    evt.preventDefault();

    sendHttpRequest("POST", PROXY + url, formState).then((data) =>
      console.log(data)
    );
  };

  return (
    <form className={form} onSubmit={onFormSubmit}>
      <fieldset className={fieldset__vertical}>
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
        <button className={form__button}>Sign up</button>
      </fieldset>
    </form>
  );
};

export default Signup;
