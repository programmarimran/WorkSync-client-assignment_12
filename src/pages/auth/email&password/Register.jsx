import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
// import Lottie from "lottie-react";
// import registerAnimation from "../../../assets/register-animation.json";
import GoogleLogin from "../socialLogin/GoogleLogin";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosInstance from "../../../hooks/useAxiosInstance";

const Register = () => {
  const axiosinstance = useAxiosInstance();
  const [uploadedImage, setUploadedImage] = useState("");
  // console.log(uploadedImage);
  const location = useLocation();
  const from = location?.state;
  const navigate = useNavigate();
  const { createUser, updateUserProfile, setUser, setLoading } = useAuth();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          setUploadedImage(imgData.data.url);
          toast.success("Image uploaded!");
        }
      })
      .catch(() => {
        setError("Image upload failed");
      });
  };

  const handleCreateUser = (data) => {
    // console.log(data);
    data.password = data.password.replace(/\s+/g, "");
    const { email, password, name } = data;

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

    createUser(email, password)
      .then((result) => {
        // console.log(result);
        const updateInfo = {
          displayName: name,
          photoURL: uploadedImage,
        };

        updateUserProfile(updateInfo)
          .then(() => {
            toast.success(
              `${
                from
                  ? "SignUp successfully! Redirecting to your previous page..."
                  : "SignUp successfully! Redirecting to home page..."
              }`
            );

            // data save mongodb

            // eslint-disable-next-line no-unused-vars
            const { password, photo, ...userData } = data;

            // console.log(userData);
            const userInfoDB = {
              ...userData,
              uid: result.user.uid,
              created_at: new Date().toISOString(),
              last_log_in: new Date().toISOString(),
              photo: uploadedImage,
            };
            // eslint-disable-next-line no-unused-vars
            axiosinstance.post(`/users`, userInfoDB).then((res) => {
              // console.log(res.data);
            });
            navigate(`${from || "/"}`);

            setUser(result.user);
          })
          .catch((error) => {
            setError(error.code);
          });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-credential":
            setError("Invalid email or password. Please check and try again.");
            break;
          case "auth/email-already-in-use":
            setError(
              "This email is already registered. Please login or use another email."
            );
            break;
          default:
            setError("An unexpected error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //  <Lottie
  //               style={{ width: "300px" }}
  //               animationData={registerAnimation}
  //               loop={true}
  //             />
  return (
    <div className="py-12 ">
      <div className="text-center mb-4">
  {/* Icon / Avatar */}
  <div className="mx-auto h-20 w-20 bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-primary/25 dark:shadow-primary/40 backdrop-blur-sm border border-primary/20">
    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  </div>

  {/* Heading */}
  <h2 className="text-4xl md:text-5xl font-bold mb-4">
    <span className="text-base-content dark:text-base-content">Join Us </span>
    <span className="relative inline-block">
      <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Today
      </span>
      <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-60"></div>
    </span>
  </h2>

  {/* Subtext */}
  <p className="text-lg text-base-content/80 dark:text-base-content/70 font-medium">
    Create your account and access all features
  </p>
</div>

      <div className="card max-w-xl mx-auto bg-base-100 border border-gray-200 w-full shrink-0 shadow-2xl">

        
        <form onSubmit={handleSubmit(handleCreateUser)} className="card-body">
         
          <div className="">
           
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
                <label className="label">Name</label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="w-full px-5 py-4 bg-base-100/50 dark:bg-base-200/50 border-2 border-base-300/90 dark:border-base-content/80 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-300 text-base-content dark:text-base-content placeholder-base-content/50 dark:placeholder-base-content/40 backdrop-blur-sm hover:bg-base-100 dark:hover:bg-base-200/70 font-medium"
                  placeholder="Enter Your Name"
                />

                <label className="label">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="w-full px-5 py-4 bg-base-100/50 dark:bg-base-200/50 border-2 border-base-300/90 dark:border-base-content/80 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-300 text-base-content dark:text-base-content placeholder-base-content/50 dark:placeholder-base-content/40 backdrop-blur-sm hover:bg-base-100 dark:hover:bg-base-200/70 font-medium"
                  placeholder="Enter Your Email"
                />

                <label className="label">Photo Upload (imgbb URL)</label>
                <input
                  {...register("photo", { required: true })}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-5 py-4 bg-base-100/50 dark:bg-base-200/50 border-2 border-base-300/90 dark:border-base-content/80 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-300 text-base-content dark:text-base-content placeholder-base-content/50 dark:placeholder-base-content/40 backdrop-blur-sm hover:bg-base-100 dark:hover:bg-base-200/70 font-medium"
                />

                <label className="label">Role (Required)</label>
                <select
                  {...register("role", { required: true })}
                  className="w-full px-5 py-4 bg-base-100/50 dark:bg-base-200/50 border-2 border-base-300/90 dark:border-base-content/80 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-300 text-base-content dark:text-base-content placeholder-base-content/50 dark:placeholder-base-content/40 backdrop-blur-sm hover:bg-base-100 dark:hover:bg-base-200/70 font-medium"
                >
                  <option className="dark:text-black" value="">
                    Select Role
                  </option>
                  <option className="dark:text-black" value="Employee">
                    Employee
                  </option>
                  <option className="dark:text-black" value="HR">
                    HR
                  </option>
                </select>
                {errors.role && (
                  <p className="text-error my-3 text-sm">Role is required</p>
                )}

                <label className="label">Bank Account No</label>
                <input
                  {...register("bank_account_no", { required: true })}
                  type="text"
                  className="w-full px-5 py-4 bg-base-100/50 dark:bg-base-200/50 border-2 border-base-300/90 dark:border-base-content/80 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-300 text-base-content dark:text-base-content placeholder-base-content/50 dark:placeholder-base-content/40 backdrop-blur-sm hover:bg-base-100 dark:hover:bg-base-200/70 font-medium"
                  placeholder="Bank Account Number"
                />

                <label className="label">Salary</label>
                <input
                  {...register("salary", { required: true })}
                  type="number"
                  className="w-full px-5 py-4 bg-base-100/50 dark:bg-base-200/50 border-2 border-base-300/90 dark:border-base-content/80 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-300 text-base-content dark:text-base-content placeholder-base-content/50 dark:placeholder-base-content/40 backdrop-blur-sm hover:bg-base-100 dark:hover:bg-base-200/70 font-medium"
                  placeholder="Salary"
                />

                <label className="label">Designation</label>
                <input
                  {...register("designation", { required: true })}
                  type="text"
                  className="w-full px-5 py-4 bg-base-100/50 dark:bg-base-200/50 border-2 border-base-300/90 dark:border-base-content/80 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-300 text-base-content dark:text-base-content placeholder-base-content/50 dark:placeholder-base-content/40 backdrop-blur-sm hover:bg-base-100 dark:hover:bg-base-200/70 font-medium"
                  placeholder="Designation"
                />

                <label className="label">Password</label>
                <div className="relative ">
                  <input
                    {...register("password", { required: true })}
                    type={show ? "text" : "password"}
                    className="w-full px-5 py-4 bg-base-100/50 dark:bg-base-200/50 border-2 border-base-300/90 dark:border-base-content/80 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-300 text-base-content dark:text-base-content placeholder-base-content/50 dark:placeholder-base-content/40 backdrop-blur-sm hover:bg-base-100 dark:hover:bg-base-200/70 font-medium"
                    placeholder="Password"
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
                </div>

 </fieldset>

                  {/* Enhanced Error Message */}
            {error && (
              <div className="bg-error/10 border-2 border-error/20 text-error px-6 py-4 rounded-2xl text-sm font-medium backdrop-blur-sm flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            {passwordError && (
              <div className="bg-error/10 border-2 border-error/20 text-error px-6 py-4 rounded-2xl text-sm font-medium backdrop-blur-sm flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>{passwordError}</span>
              </div>
            )}
               {/* Enhanced Submit Button */}
            <button 
              type="submit"
              className="group mt-4 relative w-full bg-gradient-to-r from-primary via-secondary to-primary hover:from-secondary hover:via-primary hover:to-secondary text-white font-bold py-4 px-6 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-primary/30 dark:focus:ring-primary/50 shadow-2xl hover:shadow-3xl shadow-primary/25 dark:shadow-primary/40 overflow-hidden"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign Up 
              </span>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
            </button>

             
            </div>
          </div>
            {/* Enhanced Register Link */}
            <div className="text-center pt-6 border-t-2 border-dashed border-base-content/10">
              <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 backdrop-blur-sm border border-primary/20">
                <p className="text-base-content/80 dark:text-base-content/70 mb-3 font-medium">
                  Already you have an Account?
                </p>
                <Link
                  state={location?.state}
                  to={"/login"}
                  className="inline-flex items-center gap-2 font-bold text-primary transition-colors duration-300 text-lg group"
                >
                  <span>Please Login</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
        </form>
      </div>
       {/* Professional Footer */}
        <div className="text-center mt-5">
          <p className="text-sm text-base-content/60 dark:text-base-content/50 font-medium">
            Secured by enterprise-grade encryption • Terms of Service • Privacy Policy
          </p>
        </div>
    </div>
  );
};

export default Register;
