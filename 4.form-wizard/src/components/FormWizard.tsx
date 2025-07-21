"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { stepSchemas } from "../utils/schema";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const steps = [Step1, Step2, Step3];

export type FormData = {
  name: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

const defaultValues: FormData = {
  name: "",
  email: "",
  age: 0,
  password: "",
  confirmPassword: "",
};

const FormWizard = () => {
  console.log("Form re-render");
  const [step, setStep] = useState(0);

  const form = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(stepSchemas[step]),
  });

  const CurrentStep = steps[step];

  const onSubmit = form.handleSubmit((data) => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      console.log("Final Submission: ", data);
      alert("Submitted! ✅");
    }
  });

  const onBack = useCallback(() => {
    if (step > 0) setStep((prev) => prev - 1);
  }, [step]);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} style={{ maxWidth: 400 }}>
        <p aria-current="step">Step - {step + 1}</p>
        <CurrentStep />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Buttons step={step} onBack={onBack} />
        </div>
      </form>
    </FormProvider>
  );
};

type ButtonsProps = {
  step: number;
  onBack: () => void;
};

const Buttons = memo((props: ButtonsProps) => {
  console.log("Buttons re-render");

  return (
    <>
      {props.step > 0 && (
        <button type="button" onClick={props.onBack}>
          Back
        </button>
      )}
      <button type="submit">
        {props.step === steps.length - 1 ? "Submit" : "Next"}
      </button>
    </>
  );
});

export default FormWizard;
