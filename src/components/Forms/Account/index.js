import React, { useContext, useState, useReducer, useCallback } from "react";
import Input from "../../../elements/Input";
import { UserContext } from "../../../contexts/UserContext";
import { formReducer } from "../helpers/reducers";

import {
  form,
  fieldsetVertical,
  formButton,
  button,
  formButtonDisabled,
} from "../index.module.css";

import {
  inputContainer,
  input,
  inputLabel,
} from "../../../elements/Input/index.module.css";

const Account = () => {
  const [, setErr] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const PROXY = "https://salty-stream-25179.herokuapp.com/";
  const URL = `https://prisma-fe-dev-assignent.vercel.app/api/user/${
    user && user.id
  }`;

  const [formState, dispatch] = useReducer(formReducer, {
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
    team: user?.team || "",
    errors: {
      email: "",
      password: "",
    },
  });

  const sendHttpRequest = (method, url, data, setStatus) => {
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
      .catch((err) => setStatus({ errorMessage: err.toString() }));
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

  const handleSelectChange = (evt) => {
    const { target } = evt;
    const type = target.name;
    const field = target.name;
    const payload = target.value;

    if (target.value.length === 0) {
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

    sendHttpRequest("PUT", PROXY + URL, formState).then((data) =>
      setUser(data)
    );
  };

  const disabledBtn = useCallback(() => {
    return formState.email.length > 0 &&
      formState.password.length >= 6 &&
      !formState.errors.email &&
      !formState.errors.password &&
      formState.team !== ""
      ? false
      : true;
  }, [
    formState.email.length,
    formState.password.length,
    formState.errors.email,
    formState.errors.password,
    formState.team,
  ]);

  return (
    <form className={form} onSubmit={onFormSubmit}>
      <fieldset className={fieldsetVertical}>
        <Input
          inputType="text"
          inputId="name"
          inputName="name"
          labelFor="name"
          labelText="Name"
          handleTextChange={handleTextChange}
          inputValue={formState.name}
          handleBlur={() => {}}
        />

        <Input
          inputType="email"
          inputId="email"
          inputName="email"
          labelFor="email"
          labelText="Email"
          handleTextChange={handleTextChange}
          inputValue={formState.email}
          handleBlur={() => {}}
          errors={formState.errors.email}
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

        <div className={inputContainer}>
          <label className={inputLabel} htmlFor="team-select">
            Team
          </label>
          <select
            className={input}
            name="team"
            id="team-select"
            onChange={handleSelectChange}
            defaultValue={formState.team ? formState.team : "Empty"}
          >
            {formState.team === "" && (
              <option value="Empty">Please select a team</option>
            )}
            <option value="Admins">Admins</option>
            <option value="Users">Users</option>
            <option value="Viewers">Viewers</option>
          </select>
        </div>

        <button
          disabled={disabledBtn()}
          className={
            disabledBtn()
              ? `${button} ${formButtonDisabled}`
              : `${button} ${formButton}`
          }
        >
          Save
        </button>
      </fieldset>
    </form>
  );
};

export default Account;
