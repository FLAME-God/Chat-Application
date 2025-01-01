import { ReactElement } from "react";

interface ButtonTypes {
  type: "submit" | "reset" | "button";
  desabled: boolean;
  onClick?: () => void;
  loadingIcon: ReactElement;
  text: string;
}

const Button = ({
  type,
  desabled,
  onClick,
  loadingIcon,
  text,
}: ButtonTypes) => {
  return (
    <button
      className="btn bg-blue-800 w-full"
      type={type}
      disabled={desabled}
      onClick={onClick}
    >
      {desabled ? loadingIcon : text}
    </button>
  );
};

export default Button;
