import React from "react";
import { form__container } from "../index.module.css";
import Form from "../../components/Forms/Signup";

const Signup = () => {
  return (
    <div className={form__container}>
      <Form />
    </div>
  );
};

export default Signup;
