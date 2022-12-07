import * as yup from "yup";

const editSchema = yup.object().shape({
    title: yup.string().required("Required field."),
    description: yup.string().min(10,"Minimum 10 characters.").required("Required field."),
    price: yup.number("Only number.").required("Required field."),
})

export default editSchema;