interface InputTypes {
  placeholder: string;
  referance?: any;
  type: string;
}

const Input = ({ placeholder, referance, type }: InputTypes) => {
  return (
    <input
      ref={referance}
      placeholder={placeholder}
      type={type}
      className="input input-bordered pl-10 w-full"
    />
  );
};

export default Input;
