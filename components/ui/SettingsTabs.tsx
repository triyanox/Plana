import { useTheme } from "next-themes";
import { FormEvent, useState } from "react";
import EmailInput from "../inputs/Email";
import NameInput from "../inputs/Name";
import PasswordInput from "../inputs/Password";
import {
  BlueColor,
  GreenColor,
  PurpleColor,
  RedColor,
  CyanColor,
} from "./AccentColor";
import { SubmitButton } from "./Buttons";
import { DarkThemeTab, LightThemeTab, SysThemeTab } from "./Tabs";

export const ThemeTab = () => {
  const { setTheme } = useTheme();

  return (
    <div className="flex w-full flex-col gap-2 justify-center items-start">
      <h2 className="text-lg md:text-xl font-semibold  px-4  leading-6 text-zinc-700 dark:text-zinc-300">
        Theme
      </h2>
      <p className="text-sm md:text-base px-4 mb-6 leading-5 text-zinc-500 dark:text-zinc-300">
        Change the theme of the app.
      </p>
      <div className="flex  justify-center w-full px-32 gap-2 items-center">
        <DarkThemeTab onclick={() => setTheme("dark")} />
        <LightThemeTab onclick={() => setTheme("light")} />

        <SysThemeTab onclick={() => setTheme("system")} />
      </div>
    </div>
  );
};

export const AccentTab = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-start">
      <h2 className="text-lg md:text-xl font-semibold py-2 px-4  leading-6 text-zinc-700 dark:text-zinc-300">
        Accent Color
      </h2>
      <div className="flex px-8 justify-start gap-4 items-center">
        <BlueColor />
        <GreenColor />
        <PurpleColor />
        <RedColor />
        <CyanColor />
      </div>
    </div>
  );
};

import * as users from "../../lib/users";

export const UpdateTab = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const update = users.updateUser(data);
    try {
      await update;
    } catch (e: any) {}
  };
  return (
    <div className="flex w-full flex-col gap-2 justify-center items-start">
      <h2 className="text-lg md:text-xl font-semibold  px-4  leading-6 text-zinc-700 dark:text-zinc-300">
        Update Account
      </h2>
      <p className="text-sm md:text-base px-4 mb-4 leading-5 text-zinc-500 dark:text-zinc-300">
        Update your account details.
      </p>
      <form
        onSubmit={handelSubmit}
        className="mt-2 w-full flex flex-col justify-center items-center gap-4 px-8 py-4"
      >
        <NameInput form={data} setForm={setData} />
        <EmailInput form={data} setForm={setData} />
        <PasswordInput form={data} setForm={setData} />
        <SubmitButton text="Update" />
      </form>
    </div>
  );
};
