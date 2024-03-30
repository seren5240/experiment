interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 text-blue-800 border border-blue-800 rounded shadow ${
        props.disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
