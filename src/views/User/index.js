import React from "react";
import Form from "../../components/Forms/Account";
import { form__container } from "../index.module.css";

const User = () => {
  return (
    <div className={form__container}>
      <Form />
    </div>
  );
};

export default User;
