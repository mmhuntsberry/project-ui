import React, { useReducer, useState, useCallback } from "react";
import Input from "../../../elements/Input";
import { formReducer } from "../helpers/reducers";
// import { useHistory } from "react-router-dom";
import {
  form,
  fieldset__vertical,
  form__button,
  formButtonDisabled,
  button,
} from "../index.module.css";

const Signup = () => {
  const PROXY = "https://salty-stream-25179.herokuapp.com/";
  const URL = "https://prisma-fe-dev-assignent.vercel.app/api/register";

  // const history = useHistory();
  const [err, setErr] = useState(null);
  const [formState, dispatch] = useReducer(formReducer, {
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

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

  const onFormSubmit = (evt) => {
    console.log(formState);
    evt.preventDefault();

    sendHttpRequest("POST", PROXY + URL, formState).then((data) => {
      // if (data) {
      //   history.push("/account");
      // }
    });
  };

  const onEmailBlur = (evt) => {
    sendHttpRequest("POST", PROXY + URL, formState).then((data) =>
      console.log("data".toUpperCase(), data)
    );
  };

  const onPasswordBlur = (evt) => {
    sendHttpRequest("POST", PROXY + URL, formState).then((data) =>
      console.log("data".toUpperCase(), data)
    );
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
