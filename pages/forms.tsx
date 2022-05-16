import * as React from "react";
import { useForm } from "react-hook-form";
import type { FieldErrors } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

function Forms() {
  const { register, watch, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      username: "ho",
    },
  });

  console.log(watch());

  const onValid = (data: LoginForm) => {
    console.log({ data });
  };

  const onInvalid = (err: FieldErrors) => {
    console.log({ err });
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required.",
        })}
        type="text"
      />
      <input
        {...register("email", { required: "Email is required." })}
        type="email"
      />
      <input
        {...register("password", { required: "Password is required." })}
        type="password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}

export default Forms;
