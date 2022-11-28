import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Required field."),
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters.")
    .required("Required field."),
  lastName: yup
    .string()
    .min(3, "Last Name must be at least 3 characters.")
    .required("Required field."),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters.")
    .required("Required field."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Required field."),
});

export default validations;
