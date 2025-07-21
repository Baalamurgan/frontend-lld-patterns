"use client";
import { useFormContext } from "react-hook-form";

const Step3 = () => {
  console.log("Step3 re-render");
  const { register, formState } = useFormContext();
  const { errors } = formState;

  const passwordError =
    typeof errors.password?.message === "string"
      ? errors.password?.message
      : "";

  const confirmPassword =
    typeof errors.confirmPassword?.message === "string"
      ? errors.confirmPassword?.message
      : "";

  return (
    <>
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        aria-invalid={!!passwordError}
      />
      {passwordError && <p>{passwordError}</p>}

      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
        aria-invalid={!!confirmPassword}
      />
      {confirmPassword && <p>{confirmPassword}</p>}
    </>
  );
};

export default Step3;
