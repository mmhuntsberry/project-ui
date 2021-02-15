import React from "react";
import Form from "../../components/Forms/Login";
import { form__container } from "../index.module.css";

const Login = () => {
  return (
    <div className={form__container}>
      <Form />
    </div>
  );
};

export default Login;
