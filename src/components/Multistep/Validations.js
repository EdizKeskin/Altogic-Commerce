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
  address: yup
    .string()
    .min(3, "Address must be at least 3 characters.")
    .required("Required field."),
  city: yup
    .string()
    .min(3, "City must be at least 3 characters.")
    .required("Required field."),
  state: yup
    .string()
    .min(3, "State must be at least 3 characters.")
    .required("Required field."),
});

export default validations;
