import { ChangeEvent, useState } from "react";
type Props = {
  setForm: (form: any) => void;
  form: {
    email: string;
    password?: string;
    name?: string;
  };
};

const EmailInput = (props: Props) => {
  const [email, setEmail] = useState("");
  const [helper, setHelper] = useState({
    text: "",
    color: "",
  });

  const validateEmail = (value: string) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    props.setForm({ ...props.form, email: e.target.value });
    if (e.target.value === "") {
      setHelper({
        text: "",
        color: "",
      });
      return;
    }
    const isValid = validateEmail(e.target.value);
    setHelper({
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    });
    return;
  };

  return (
    <div className="flex flex-col justify-center items-start">
      <input
        className={`w-[360px] md:w-[400px] rounded-2xl  
      ${
        helper.color === "error"
          ? "text-red-600 dark:text-red-400 bg-red-200 dark:bg-red-600 dark:bg-opacity-20"
          : helper.color === "success"
          ? "text-green-600 dark:text-green-400 bg-green-200 dark:bg-green-600 dark:bg-opacity-20"
          : "text-black dark:text-white bg-zinc-100 dark:bg-zinc-900"
      }
      
      px-6 py-3 text-lg font-medium  outline-none focus:placeholder:invisible dark:focus:placeholder:text-zinc-900 transition-all duration-200 `}
        value={email}
        onChange={handleChange}
        color={helper.color}
        type="email"
        placeholder="Email"
      />
    </div>
  );
};

export default EmailInput;
