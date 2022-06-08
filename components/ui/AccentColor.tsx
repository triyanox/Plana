type ColorProps = {
  onclick?: () => void;
};

export const BlueColor = (props: ColorProps) => {
  return (
    <button
      onClick={props.onclick}
      className="flex gap-2 transition-all duration-500  active:ring-2 ring-blue-300 bg-blue-500 dark:bg-blue-600  justify-start p-3 items-center w-full rounded-full "
    ></button>
  );
};

export const GreenColor = (props: ColorProps) => {
  return (
    <button
      onClick={props.onclick}
      className="flex gap-2 transition-all duration-500  active:ring-2 ring-green-300 bg-green-500 dark:bg-green-600  justify-start p-3 items-center w-full rounded-full "
    ></button>
  );
};

export const PurpleColor = (props: ColorProps) => {
  return (
    <button
      onClick={props.onclick}
      className="flex gap-2 transition-all duration-500  active:ring-2 ring-purple-300 bg-purple-500 dark:bg-purple-600  justify-start p-3 items-center w-full rounded-full "
    ></button>
  );
};

export const RedColor = (props: ColorProps) => {
  return (
    <button
      onClick={props.onclick}
      className="flex gap-2 transition-all duration-500  active:ring-2 ring-red-300 bg-red-500 dark:bg-red-600  justify-start p-3 items-center w-full rounded-full "
    ></button>
  );
};

export const CyanColor = (props: ColorProps) => {
  return (
    <button
      onClick={props.onclick}
      className="flex gap-2 transition-all duration-500  active:ring-2 ring-cyan-300 bg-cyan-500 dark:bg-cyan-600  justify-start p-3 items-center w-full rounded-full "
    ></button>
  );
};
