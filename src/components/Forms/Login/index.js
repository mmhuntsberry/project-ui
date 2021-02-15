import React, {
  useState,
  useReducer,
  useCallback,
  useContext,
  useEffect,
} from "react";
import Input from "../../../elements/Input";
import { formReducer } from "../helpers/reducers";
import { useHistory } from "react-router-dom";

import {
  form,
  fieldset__vertical,
  form__button,
  formButtonDisabled,
  button,
} from "../index.module.css";
import { UserContext } from "../../../contexts/UserContext";

const Login = () => {
  const PROXY = "https://salty-stream-25179.herokuapp.com/";
  const URL = "https://prisma-fe-dev-assignent.vercel.app/api/login";
  const USERS = "https://prisma-fe-dev-assignent.vercel.app/api/users";

  const history = useHistory();
  const { value, setValue } = useContext(UserContext);
  const [err, setErr] = useState(null);
  const [formState, dispatch] = useReducer(formReducer, {
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    console.log(UserContext);
  }, []);

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
      .catch((err) => {
        console.log("HELLO ERR", err);
        setErr({ errorMessage: err.toString() });
      });
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

    sendHttpRequest("POST", PROXY + URL, formState).then((data) => data);

    sendHttpRequest("GET", PROXY + USERS).then((data) => {
      console.log("DATA222", data);
      if (data) {
        data.find((user) => {
          console.log(user.email);
          console.log(formState.email);
          return user.email === formState.email ? setValue(user) : null;
        });
        history.push("/account");
      }
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

  return (
    <>
      <span>{err && err.errorMessage}</span>
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
            handleBlur={() => {}}
          />
          <Input
            inputType="password"
            inputId="password"
            inputName="password"
            labelFor="password"
            labelText="Password"
            handleTextChange={handleTextChange}
            inputValue={formState.password}
            handleBlur={() => {}}
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
            Log in
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Login;
