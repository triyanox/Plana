import { ChangeEvent, useState } from "react";

type Props = {
  setForm: (form: any) => void;
  form: {
    email: string;
    password: string;
    name?: string;
  };
  sm?: boolean;
};

const NameInput = (props: Props) => {
  const [name, setName] = useState("");
  const [helper, setHelper] = useState({
    text: "",
    color: "",
  });

  const validatePassword = (value: string) => {
    return value.length > 1;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    props.setForm({ ...props.form, name: e.target.value });
    if (e.target.value === "") {
      setHelper({
        text: "",
        color: "",
      });
      return;
    }
    const isValid = validatePassword(e.target.value);
    setHelper({
      text: isValid
        ? "Good name format"
        : "Name must be at least 2 characters long",
      color: isValid ? "success" : "error",
    });
    return;
  };

  return (
    <input
      className={`${
        props.sm ? "w-full sm:w-[360px]" : "w-[360px]"
      }  md:w-[400px] rounded-2xl    
      ${
        helper.color === "error"
          ? "text-red-600 dark:text-red-400 bg-red-200 dark:bg-red-600 dark:bg-opacity-20"
          : helper.color === "success"
          ? "text-green-600 dark:text-green-400 bg-green-200 dark:bg-green-600 dark:bg-opacity-20"
          : "text-black dark:text-white bg-zinc-100 dark:bg-zinc-900"
      }
      
      px-6  py-3 text-lg font-medium  outline-none focus:placeholder:invisible dark:focus:placeholder:text-zinc-900 transition-all duration-200 `}
      onChange={handleChange}
      value={name}
      color={helper.color}
      type="name"
      placeholder="Name"
    />
  );
};

export default NameInput;
