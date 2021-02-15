import React, { useReducer, useState, useEffect, useCallback } from "react";
import Input from "../../../elements/Input";
import {
  form,
  fieldset__vertical,
  form__button,
  formButtonDisabled,
  button,
  formErrorMessage,
} from "./index.module.css";

const formReducer = (state, action) => {
  let errors = state.errors;
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  switch (action.type) {
    case "email":
      errors.email = validEmailRegex.test(action.payload)
        ? ""
        : "Please enter a valid email address!";
      break;
    case "password":
      errors.password =
        action.payload.length < 6
          ? "The password needs to be at least 6 characters long."
          : "";
      break;
    default:
      break;
  }

  return {
    ...state,
    errors,
    [action.type]: action.payload,
  };
};

const Signup = () => {
  const PROXY = "https://salty-stream-25179.herokuapp.com/";
  const [url] = useState(
    "https://prisma-fe-dev-assignent.vercel.app/api/register"
  );
  const [err, setErr] = useState(null);

  const initialState = {
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  };
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: data ? { "Content-type": "application/json" } : {},
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        return data;
      })
      .catch((err) => setErr({ errorMessage: err.toString() }));
  };

  const handleTextChange = (evt, type, field, payload) => {
    if (evt.target.value.length === 0) {
      setErr(null);
    }
    dispatch({
      type,
      field,
      payload,
    });
  };

  const disabledBtn = useCallback(() => {
    console.log(formState.email.length);
    return formState.email.length > 0 &&
      formState.password.length >= 6 &&
      !formState.errors.email &&
      !formState.errors.password
      ? false
      : true;
  }, [
    formState.email.length,
    formState.password.length,
    formState.errors.email,
    formState.errors.password,
  ]);

  useEffect(() => {
    console.log("formState".toUpperCase(), formState);

    console.log("err".toUpperCase(), err);
  }, [err, formState, disabledBtn]);

  const onFormSubmit = (evt) => {
    console.log(formState);
    evt.preventDefault();

    sendHttpRequest("POST", PROXY + url, formState).then((data) =>
      console.log("data".toUpperCase(), data)
    );
  };

  const onEmailBlur = (evt) => {
    sendHttpRequest("POST", PROXY + url, formState).then((data) =>
      console.log("data".toUpperCase(), data)
    );
  };

  const onPasswordBlur = (evt) => {
    sendHttpRequest("POST", PROXY + url, formState).then((data) =>
      console.log("data".toUpperCase(), data)
    );
  };

  const renderError = () => {
    if (err.errorMessage.includes("password")) return;
    if (err.errorMessage) return err.errorMessage;

    return null;
  };

  return (
    <>
      <span>{err && renderError()}</span>
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
            errors={formState.errors.email}
            handleBlur={onEmailBlur}
          />

          <Input
            inputType="password"
            inputId="password"
            inputName="password"
            labelFor="password"
            labelText="Password"
            handleTextChange={handleTextChange}
            inputValue={formState.password}
            handleBlur={onPasswordBlur}
            errors={formState.errors.password}
          />

          <button
            disabled={disabledBtn()}
            className={
              disabledBtn()
                ? `${button} ${formButtonDisabled}`
                : `${button} ${form__button}`
            }
          >
            Sign up
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Signup;
