import { ChangeEvent, Fragment, useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";

type Props = {
  setForm: (form: any) => void;
  form: {
    email: string;
    password: string;
    name?: string;
  };
};

const PasswordInput = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [helper, setHelper] = useState({
    text: "",
    color: "",
  });

  const validatePassword = (value: string) => {
    return value.length > 7;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    props.setForm({ ...props.form, password: e.target.value });
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
        ? "Good Password"
        : "Password must be at least 8 characters long",
      color: isValid ? "success" : "error",
    });
    return;
  };

  return (
    <div className="relative  flex justify-center items-center">
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
        onChange={handleChange}
        value={password}
        type={showPassword ? "text" : "password"}
        placeholder="Password"
      />
      <button
        type="button"
        className="w-8 h-8 z-20 absolute right-2"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <TbEyeOff className="text-2xl" />
        ) : (
          <TbEye className="text-2xl" />
        )}
      </button>
      <p
        className={`text-xs mt-2 absolute top-14
        ${
          helper.color === "error"
            ? "text-red-600  dark:text-red-400"
            : helper.color === "success"
            ? "text-green-600 dark:text-green-400"
            : "text-black dark:text-white"
        }
        `}
      >
        {helper.text}
      </p>
    </div>
  );
};

export default PasswordInput;
