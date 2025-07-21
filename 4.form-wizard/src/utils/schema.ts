import * as Yup from "yup";

export const stepSchemas: Record<number, Yup.ObjectSchema<Yup.AnyObject>> = {
  0: Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
  }),
  1: Yup.object({
    age: Yup.number().required().min(18, "Must be at least 18"),
  }),
  2: Yup.object({
    password: Yup.string().required().min(6),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required(),
  }),
};
