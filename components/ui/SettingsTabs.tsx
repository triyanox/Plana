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
import { DeleteButton, SubmitButton } from "./Buttons";
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
      <div className="flex  justify-center w-full px-8 md:px-32 gap-2 items-center">
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
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
        className="flex mt-4 flex-col justify-center w-full px-8 gap-2 items-center"
      >
        <NameInput sm={true} form={data} setForm={setData} />
        <EmailInput sm={true} form={data} setForm={setData} />
        <PasswordInput sm={true} form={data} setForm={setData} />
        <SubmitButton sm={true} text="Update" />
      </form>
    </div>
  );
};

export const DeleteTab = () => {
  const handleDelete = async (e: any) => {
    e.preventDefault();
    const deleteUser = users.deleteUser();
    try {
      await deleteUser;
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (e: any) {}
  };
  return (
    <div className="flex w-full flex-col gap-2 justify-center items-start">
      <h2 className="text-lg md:text-xl font-semibold  px-4  leading-6 text-red-500 dark:text-red-600">
        Danger Zone
      </h2>
      <p className="text-sm md:text-base px-4 leading-5 text-zinc-500 dark:text-zinc-300">
        Delete your account.
      </p>
      <p className="text-xs px-4 mb-6 leading-5 text-zinc-900 dark:text-zinx-50 font-semibold dark:text-zinc-300">
        Make sure that you want to delete your account. This action is
        irreversible.
      </p>
      <form
        onSubmit={handleDelete}
        className="flex  justify-center w-full px-8 gap-2 items-center"
      >
        <DeleteButton sm={true} text="Delete Account" />
      </form>
    </div>
  );
};

export const SignOut = () => {
  const handleSignout = async (e: any) => {
    e.preventDefault();
    const signout = users.signout();
    try {
      await signout;
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (e: any) {}
  };
  return (
    <div className="flex w-full flex-col gap-2 justify-center items-start">
      <h2 className="text-lg md:text-xl font-semibold  px-4  leading-6 text-zinc-700 dark:text-zinc-300">
        Sign Out
      </h2>
      <p className="text-sm md:text-base px-4 leading-5 text-zinc-500 dark:text-zinc-300">
        Sign out of your account.
      </p>

      <form
        onSubmit={handleSignout}
        className="flex  justify-center w-full px-8 gap-2 items-center"
      >
        <SubmitButton sm={true} text="Sign Out" />
      </form>
    </div>
  );
};
