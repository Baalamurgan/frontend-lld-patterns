"use client";
import { useFormContext } from "react-hook-form";

const Step2 = () => {
  console.log("Step2 re-render");
  const { register, formState } = useFormContext();
  const { errors } = formState;

  const ageError =
    typeof errors.age?.message === "string" ? errors.age?.message : "";

  return (
    <>
      <input
        type="number"
        placeholder="Age"
        {...register("age")}
        aria-invalid={!!ageError}
      />
      {ageError && <p>{ageError}</p>}
    </>
  );
};

export default Step2;
