"use client";
import { useFormContext } from "react-hook-form";

const Step1 = () => {
  console.log("Step1 re-render");
  const { register, formState } = useFormContext();
  const { errors } = formState;

  const nameError =
    typeof errors.name?.message === "string" ? errors.name?.message : "";
  const emailError =
    typeof errors.email?.message === "string" ? errors.email?.message : "";

  return (
    <>
      <input
        placeholder="Name"
        {...register("name")}
        aria-invalid={!!nameError}
      />
      {nameError && <p>{nameError}</p>}

      <input
        placeholder="Email"
        {...register("email")}
        aria-invalid={!!emailError}
      />
      {emailError && <p>{emailError}</p>}
    </>
  );
};

export default Step1;
