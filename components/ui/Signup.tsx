import { FormEvent, useState } from "react";
import EmailInput from "../inputs/Email";
import NameInput from "../inputs/Name";
import PasswordInput from "../inputs/Password";
import { SubmitButton } from "./Buttons";
import * as users from "../../lib/users";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const signup = users.createUser(data);
    try {
      await signup;
      toast.success("User created successfully, redirecting...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (e: any) {
      toast.error(e.response.data.error);
    }
  };
  return (
    <section className="w-full pt-24 px-12 flex flex-col justify-center items-center gap-8">
      <h1 className="text-5xl font-semibold text-black dark:text-white">
        Signup
      </h1>
      <p className="text-xl text-zinc-700 dark:text-zinc-300">
        Welcome to Plana, create your account.
      </p>
      <form
        onSubmit={handelSubmit}
        className="mt-2 flex flex-col justify-center items-center gap-8 px-6 py-4"
      >
        <NameInput form={data} setForm={setData} />
        <EmailInput form={data} setForm={setData} />
        <PasswordInput form={data} setForm={setData} />
        <SubmitButton text="Signup" />
      </form>
      <Toaster
        toastOptions={{
          position: "bottom-right",
        }}
      />
    </section>
  );
};

export default Signup;
