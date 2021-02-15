import { validEmailRegex } from ".";

export const formReducer = (state, action) => {
  let errors = state.errors;

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
