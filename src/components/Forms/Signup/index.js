import React, { useReducer, useState, useCallback, useContext } from "react";
import Input from "../../../elements/Input";
import { formReducer } from "../helpers/reducers";
import { useHistory } from "react-router-dom";
import {
  fieldsetVertical,
  formButton,
  formButtonDisabled,
  button,
} from "../index.module.css";
import { UserContext } from "../../../contexts/UserContext";

const Signup = () => {
  const PROXY = "https://salty-stream-25179.herokuapp.com/";
  const URL = "https://prisma-fe-dev-assignent.vercel.app/api/register";

  const history = useHistory();
  const { setUser } = useContext(UserContext);
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
    evt.preventDefault();

    sendHttpRequest("POST", PROXY + URL, formState).then((data) => {
      if (data) {
        setUser(data);

        setTimeout(() => {
          history.push(`/user/${data.id}`);
        }, 250);
      }
    });
  };

  const onEmailBlur = (evt) => {
    sendHttpRequest("POST", PROXY + URL, formState).then((data) => data);
  };

  const onPasswordBlur = (evt) => {
    sendHttpRequest("POST", PROXY + URL, formState).then((data) => data);
  };

  const disabledBtn = useCallback(() => {
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
      <form onSubmit={onFormSubmit}>
        <fieldset className={fieldsetVertical}>
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
                : `${button} ${formButton}`
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
