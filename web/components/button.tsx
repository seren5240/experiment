import { BoltIcon } from "@heroicons/react/16/solid";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const BASE_BUTTON_PROPS =
  "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 text-blue-800 border border-blue-800 rounded shadow";

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className={`${BASE_BUTTON_PROPS} px-4 ${
        props.disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export const AIButton = (props: ButtonProps) => {
  return (
    <button
      className={`${BASE_BUTTON_PROPS} ${
        props.disabled ? "opacity-50 cursor-not-allowed" : ""
      } flex gap-2 px-3 items-center group relative`}
      {...props}
    >
      <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-blue-800 group-hover:h-full opacity-90"></span>
      <BoltIcon className="h-6 w-6 min-w-6 group-hover:text-white z-10" />
      <p className="text-sm group-hover:text-white z-10">Explain with AI</p>
    </button>
  );
};
