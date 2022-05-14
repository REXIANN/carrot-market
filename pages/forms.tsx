import * as React from "react";
import { useForm } from "react-hook-form";

function Forms() {
  const { register, watch } = useForm();

  console.log(watch());
  return (
    <form>
      <input {...register("username")} type="text" />
      <input {...register("email")} type="email" />
      <input {...register("password")} type="password" />
      <input type="submit" value="Create Account" />
    </form>
  );
}

export default Forms;
