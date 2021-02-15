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
  const [postStatus, setPostStatus] = useState({ errorMessage: "" });
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
    }).then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        const error = (data && data.message) || response.status;

        return Promise.reject(error);
      }

      return data;
    });
  };

  useEffect(() => {
    console.log("postStatus", postStatus);

    sendHttpRequest("GET", PROXY + USERS).then((data) => {
      if (data) {
        return data.find((user) => {
          user.email === formState.email && setValue(user);
          console.log("value", value);
          console.log(user);

          postStatus?.message && history.push(`/user/${user.id}`);
        });
      }
    });

    // if (postStatus?.message && value) {
    //   history.push(`/user/${value.id}`);
    // }
  }, [postStatus]);

  const handleTextChange = (evt, type, field, payload) => {
    if (evt.target.value.length === 0) {
      setPostStatus(null);
    }

    dispatch({
      type,
      field,
      payload,
    });
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    console.log("clicked");

    sendHttpRequest("POST", PROXY + URL, formState)
      .then((data) => {
        setPostStatus(data);
      })
      .catch((err) => setPostStatus({ errorMessage: err }));
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

  return (
    <>
      <span>{postStatus?.errorMessage && postStatus.errorMessage}</span>
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
