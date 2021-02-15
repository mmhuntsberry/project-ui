import React, { useContext, useEffect, useState, useReducer } from "react";
import { formReducer } from "../../components/Forms/helpers/reducers";
import { UserContext } from "../../contexts/UserContext";
import Input from "../../elements/Input";
import {
  form,
  fieldset__vertical,
  form__button,
  formButtonDisabled,
  button,
} from "../index.module.css";
import {
  inputContainer,
  input,
  inputLabel,
} from "../../elements/Input/index.module.css";

const User = () => {
  const PROXY = "https://salty-stream-25179.herokuapp.com/";
  const URL = "https://prisma-fe-dev-assignent.vercel.app/api/register";
  // const PROXY = "https://salty-stream-25179.herokuapp.com/";
  // const URL = "https://prisma-fe-dev-assignent.vercel.app/api/users";
  // const [activeUser, setActiveUser] = useState(null);
  // const { value, setValue } = useContext(UserContext);
  const [err, setErr] = useState(null);
  const { value = {}, setValue } = useContext(UserContext);

  const [formState, dispatch] = useReducer(formReducer, {
    name: value?.name || "",
    email: value?.email || "",
    password: value?.password || "",
    team: value?.team || "",
    errors: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    console.log(value);
  });

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

    // sendHttpRequest("POST", PROXY + URL, formState).then((data) => {
    //   // if (data) {
    //   //   history.push("/account");
    //   // }
    // });
  };

  return (
    <form className={form} onSubmit={onFormSubmit}>
      <fieldset className={fieldset__vertical}>
        <Input
          inputType="text"
          inputId="name"
          inputName="name"
          labelFor="name"
          labelText="Name"
          handleTextChange={handleTextChange}
          inputValue={formState.name}
          errors={formState.errors.email}
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
          errors={formState.errors.password}
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
          <select className={input} name="pets" id="team-select">
            <option value="admins" selected={value?.team === "admins"}>
              Admins
            </option>
            <option value="users" selected={value?.team === "users"}>
              Users
            </option>
            <option value="viewers" selected={value?.team === "viewers"}>
              Viewers
            </option>
          </select>
        </div>

        {/* <button
          disabled={disabledBtn()}
          className={
            disabledBtn()
              ? `${button} ${formButtonDisabled}`
              : `${button} ${form__button}`
          }
        >
          Save
        </button> */}
      </fieldset>
    </form>
  );
};

export default User;
