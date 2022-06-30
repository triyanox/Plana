import { FormEvent, useState } from "react";
import EmailInput from "../inputs/Email";
import PasswordInput from "../inputs/Password";
import { SubmitButton } from "./Buttons";
import toast, { Toaster } from "react-hot-toast";
import * as auth from "../../lib/auth";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const login = auth.login(data);
    try {
      await login;
      toast.success("Logged in successfully, redirecting...");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (e: any) {
      toast.error(e.response.data.error);
    }
  };
  return (
    <section className="w-full pt-24 px-12 flex flex-col justify-center items-center gap-8">
      <h1 className="text-5xl font-semibold text-black dark:text-white">
        Login
      </h1>
      <p className="text-xl text-zinc-700 dark:text-zinc-300">
        Welcome back, please login to your account.
      </p>
      <form
        onSubmit={handelSubmit}
        className="mt-2 flex flex-col justify-center items-center gap-4 px-6 py-4"
      >
        <EmailInput form={data} setForm={setData} />
        <PasswordInput form={data} setForm={setData} />
        <SubmitButton text="Login" />
      </form>
      <Toaster
        toastOptions={{
          position: "bottom-right",
        }}
      />
    </section>
  );
};

export default Login;
