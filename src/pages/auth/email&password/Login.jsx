import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import GoogleLogin from "../socialLogin/GoogleLogin";
import useAuth from "../../../hooks/useAuth";
import useAxiosInstance from "../../../hooks/useAxiosInstance";

const Login = () => {
  const axiosinstance = useAxiosInstance();
  const location = useLocation();
  const from = location?.state;
  const navigate = useNavigate();
  const { loginUser, setUser, setLoading } = useAuth();

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

    loginUser(email, password)
      .then(async (result) => {
        setUser(result.user);
        toast.success(
          `${
            from
              ? "Login successfully! Redirecting to your previous page..."
              : "Login successfully! Redirecting to home page..."
          }`
        );
        const patchInfoDB = {
          email: result?.user.email,
          last_log_in: new Date().toISOString(),
        };

        await axiosinstance.patch(`/users/profile`, patchInfoDB);

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
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100/50 to-base-100 dark:from-base-900 dark:via-base-800 dark:to-base-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 dark:bg-accent/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-xl w-full space-y-8 relative z-10">
        {/* Enhanced Header with Professional Badge */}
        <div className="text-center">
         
          
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-primary/25 dark:shadow-primary/40 backdrop-blur-sm border border-primary/20">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-base-content dark:text-base-content">Welcome </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Back
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-60"></div>
            </span>
          </h2>
          
          <p className="text-lg text-base-content/80 dark:text-base-content/70 font-medium">
            Access your professional dashboard
          </p>
        </div>

        {/* Enhanced Main Form Card */}
        <div className="bg-base-200/80 dark:bg-base-300/50 backdrop-blur-sm rounded-3xl shadow-2xl dark:shadow-base-content/10 border border-base-300/50 dark:border-base-content/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"></div>
          
          <form onSubmit={handleSubmit(handleLoginUser)} className="relative px-10 py-10 space-y-8">
            
            {/* Enhanced Social Login Section */}
            <div className="space-y-6">
              <div className="transform hover:scale-[1.02] transition-transform duration-200">
                <GoogleLogin from={from} />
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-dashed border-base-content/20 dark:border-base-content/30" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-6 py-2 bg-base-200/80 dark:bg-base-300/50 text-base-content/70 dark:text-base-content/60 font-semibold rounded-full backdrop-blur-sm border border-base-content/10">
                    or continue with credentials
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Form Fields */}
            <div className="space-y-6">
              {/* Email Field with Professional Styling */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold text-base-content dark:text-base-content">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    id="email"
                    className="w-full px-5 py-4 bg-base-100/50 dark:bg-base-200/50 border-2 border-base-300/50 dark:border-base-content/20 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-300 text-base-content dark:text-base-content placeholder-base-content/50 dark:placeholder-base-content/40 backdrop-blur-sm hover:bg-base-100 dark:hover:bg-base-200/70 font-medium"
                    placeholder="Enter your professional email"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                {errors.email && (
                  <p className="text-error text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Email is required
                  </p>
                )}
              </div>

              {/* Password Field with Enhanced Security Styling */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-bold text-base-content dark:text-base-content">
                  Password
                </label>
                <div className="relative group">
                  <input
                    {...register("password", { required: true })}
                    type={show ? "text" : "password"}
                    id="password"
                    className="w-full px-5 py-4 pr-14 bg-base-100/50 dark:bg-base-200/50 border-2 border-base-300/50 dark:border-base-content/20 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-300 text-base-content dark:text-base-content placeholder-base-content/50 dark:placeholder-base-content/40 backdrop-blur-sm hover:bg-base-100 dark:hover:bg-base-200/70 font-medium"
                    placeholder="Enter your secure password"
                  />
                  <button
                    onClick={() => setShow(!show)}
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-base-content/60 dark:text-base-content/50 hover:text-primary dark:hover:text-primary transition-colors duration-200 z-10"
                  >
                    {show ? (
                      <MdOutlineRemoveRedEye size={22} />
                    ) : (
                      <IoMdEyeOff size={22} />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {errors.password && (
                  <p className="text-error text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Password is required
                  </p>
                )}
                
                {passwordError && (
                  <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-sm font-medium backdrop-blur-sm">
                    {passwordError}
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Error Message */}
            {error && (
              <div className="bg-error/10 border-2 border-error/20 text-error px-6 py-4 rounded-2xl text-sm font-medium backdrop-blur-sm flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Enhanced Submit Button */}
            <button 
              type="submit"
              className="group relative w-full bg-gradient-to-r from-primary via-secondary to-primary hover:from-secondary hover:via-primary hover:to-secondary text-white font-bold py-4 px-6 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-primary/30 dark:focus:ring-primary/50 shadow-2xl hover:shadow-3xl shadow-primary/25 dark:shadow-primary/40 overflow-hidden"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In to Dashboard
              </span>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
            </button>

            {/* Enhanced Register Link */}
            <div className="text-center pt-6 border-t-2 border-dashed border-base-content/10">
              <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 backdrop-blur-sm border border-primary/20">
                <p className="text-base-content/80 dark:text-base-content/70 mb-3 font-medium">
                  New to our platform?
                </p>
                <Link
                  state={location?.state}
                  to={"/register"}
                  className="inline-flex items-center gap-2 font-bold text-primary transition-colors duration-300 text-lg group"
                >
                  <span>Create Professional Account</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Professional Footer */}
        <div className="text-center">
          <p className="text-sm text-base-content/60 dark:text-base-content/50 font-medium">
            Secured by enterprise-grade encryption • Terms of Service • Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;