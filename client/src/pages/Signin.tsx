import { Link, useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import Button from "../components/Button";
import { Eye, EyeOff, Loader2, Lock, Mail, MessagesSquare } from "lucide-react";
import Input from "../components/Input";
import { useRef, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";

const Signin = () => {
  const [showPassword, setShowpassword] = useState(false);
  const passwordRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();

  const { isSignIn, signin } = useAuthStore();

  function validateData() {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    if (!email.trim()) toast.error("Email is required");
    if (
      !password.trim() &&
      /[A-Z]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    )
      toast.error("Incorrect format");

    return true;
  }
  const navigate = useNavigate();
  function onClick() {
    const success = validateData();
    if (success === true) {
      signin({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
      navigate("/");
    }
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessagesSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Login to Account</h1>
              <p className="text-slate-500">Login to your free account</p>
            </div>
            <form action="" className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40" />
                  </div>
                  <Input
                    referance={emailRef}
                    type="text"
                    placeholder="Enter your mail"
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="size-5 text-base-content/40" />
                  </div>
                  <Input
                    referance={passwordRef}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowpassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40" />
                    ) : (
                      <Eye className=" size-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                text="Login"
                desabled={isSignIn}
                loadingIcon={<Loader2 className="size-5 animate-spin" />}
                onClick={onClick}
              />
            </form>
            <div className="text-center">
              <p className="text-base-content/60">
                Don't have Account?{" "}
                <Link to="/signup" className="link link-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern
        title="Welcome Back!"
        subTitle="Login to continue... and get access chat and connected with your friends   "
      />
    </div>
  );
};

export default Signin;
