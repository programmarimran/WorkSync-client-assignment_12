import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import Lottie from "lottie-react";
import loginAnimation from "../../../assets/login-animation.json";
import { toast } from "react-toastify";
import AuthContext from "../../../contexts/auth/AuthContext";
import GoogleLogin from "../socialLogin/GoogleLogin";

const Login = () => {
  const location = useLocation();
  const from = location?.state;
  const navigate = useNavigate();
  const { signInUser, setUser, setLoading } = use(AuthContext);

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginUser = (data) => {
    data.password = data.password.replace(/\s+/g, "");

    const { email, password } = data;

    const uppercaseRegex = /^(?=.*[A-Z])/;
    const lowercaseRegex = /^(?=.*[a-z])/;
    const specialCharRegex = /^(?=.*[!@#$%^&*])/;
    const passwordLength = /^.{6,}$/;

    if (!uppercaseRegex.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      setError("");
      return;
    } else if (!lowercaseRegex.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      setError("");
      return;
    } else if (!specialCharRegex.test(password)) {
      setPasswordError("Password must contain at least one special character.");
      setError("");
      return;
    } else if (!passwordLength.test(password)) {
      setPasswordError("Password must be at least 6 characters long.");
      setError("");
      return;
    } else {
      setPasswordError("");
    }

    signInUser(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success(
          `${
            from
              ? "Login successfully! Redirecting to your previous page..."
              : "Login successfully! Redirecting to home page..."
          }`
        );
        navigate(`${from || "/"}`);
        return;
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            setError("No user found with this email. Please sign up first.");
            break;
          case "auth/wrong-password":
            setError("Incorrect password. Please try again.");
            break;
          case "auth/invalid-email":
            setError("Invalid email format. Please enter a valid email.");
            break;
          default:
            setError("An unexpected error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="py-12">
      <div className="card mx-auto bg-base-100 border border-gray-200 w-full shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(handleLoginUser)} className="card-body">
          <h1 className="text-3xl text-center font-bold">Login now!</h1>
          <div className="md:flex flex-row-reverse">
            <div className="flex-1 flex flex-col justify-center items-center">
              <Lottie style={{ width: "300px" }} animationData={loginAnimation} loop={true} />
              <div className="text-center border border-[#2F80ED] rounded-2xl p-4 m-4 bg-[#2F80ED10]">
                <h1 className="text-[#2F80ED]"> Don\'t have an account?</h1>
                <h1>
                  <span className="text-[#2F80ED]">Please</span>
                  <Link state={location?.state} to={"/register"} className="ml-2 text-2xl font-extrabold text-blue-500 underline">
                    Register
                  </Link>
                </h1>
              </div>
            </div>
            <div className="flex-1">
              <fieldset className="fieldset">
                <GoogleLogin from={from}></GoogleLogin>
              </fieldset>
              <div className="flex my-5 items-center gap-2 w-full">
                <hr className="flex-grow border-2 border-gray-300 border-dashed" />
                <span className="text-gray-500 font-semibold">OR</span>
                <hr className="flex-grow border-2 border-gray-300 border-dashed" />
              </div>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input {...register("email", { required: true })} type="email" className="input bg-[#2F80ED20] w-full" placeholder="Enter Your Email" />

                <label className="label">Password</label>
                <div className="relative">
                  <input {...register("password", { required: true })} type={show ? "text" : "password"} className="input w-full pr-16" placeholder="Password" />
                  <button
                    onClick={() => setShow(!show)}
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-4 z-10"
                  >
                    {show ? <MdOutlineRemoveRedEye size={24} /> : <IoMdEyeOff size={24} />}
                  </button>
                </div>
                {errors.password && <p className="text-error my-3 text-sm">Password is required</p>}
                <p className="text-error my-3 text-sm">{passwordError}</p>
                <button className="btn bg-[#2F80ED80] mt-4">Login</button>
              </fieldset>
            </div>
          </div>
          <div className="text-center">
            <p className="text-error my-3">{error}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;