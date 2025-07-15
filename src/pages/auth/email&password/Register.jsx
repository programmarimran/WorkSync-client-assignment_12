import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import Lottie from "lottie-react";
import registerAnimation from "../../../assets/register-animation.json";
import GoogleLogin from "../socialLogin/GoogleLogin";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosInstance from "../../../hooks/useAxiosInstance";

const Register = () => {
  const axiosinstance = useAxiosInstance();
  const [uploadedImage, setUploadedImage] = useState("");
  console.log(uploadedImage);
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
        setLoading(false);
      });
  };

  const handleCreateUser = (data) => {
    console.log(data);
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
        console.log(result);
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
            navigate(`${from || "/"}`);
            setUser(result.user);
            // data save mongodb
            const { password, photo, ...userData } = data;
            console.log(userData);
            const userInfoDB = {
              ...userData,
              uid:result.user.uid,
              created_at: new Date().toISOString(),
              last_log_in: new Date().toISOString(),
            };
            axiosinstance.post(`/users`, userInfoDB).then((res) => {
              console.log(res.data);
            });
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

  return (
    <div className="py-12">
      <div className="card mx-auto bg-base-100 border border-gray-200 w-full shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(handleCreateUser)} className="card-body">
          <h1 className="text-3xl text-center font-bold">SignUp now!</h1>
          <div className="md:flex flex-row-reverse">
            <div className="flex-1 flex flex-col justify-center items-center">
              <Lottie
                style={{ width: "300px" }}
                animationData={registerAnimation}
                loop={true}
              />
              <div className="text-center border border-[#2F80ED] rounded-2xl p-4 m-4 bg-[#2F80ED10]">
                <h1 className="text-[#2F80ED]"> Already have an account?</h1>
                <h1>
                  <span className="text-[#2F80ED]">Please</span>
                  <Link
                    state={location?.state}
                    to={"/login"}
                    className="ml-2 text-2xl font-extrabold text-blue-500 underline"
                  >
                    Login
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
                <label className="label">Name</label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="input bg-[#2F80ED20] w-full"
                  placeholder="Enter Your Name"
                />

                <label className="label">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="input bg-[#2F80ED20] w-full"
                  placeholder="Enter Your Email"
                />

                <label className="label">Photo Upload (imgbb URL)</label>
                <input
                  {...register("photo", { required: true })}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="input bg-[#2F80ED20] w-full"
                />

                <label className="label">Role (Required)</label>
                <select
                  {...register("role", { required: true })}
                  className="input bg-[#2F80ED20] w-full"
                >
                  <option value="">Select Role</option>
                  <option value="Employee">Employee</option>
                  <option value="HR">HR</option>
                </select>
                {errors.role && (
                  <p className="text-error my-3 text-sm">Role is required</p>
                )}

                <label className="label">Bank Account No</label>
                <input
                  {...register("bank_account_no", { required: true })}
                  type="text"
                  className="input bg-[#2F80ED20] w-full"
                  placeholder="Bank Account Number"
                />

                <label className="label">Salary</label>
                <input
                  {...register("salary", { required: true })}
                  type="number"
                  className="input bg-[#2F80ED20] w-full"
                  placeholder="Salary"
                />

                <label className="label">Designation</label>
                <input
                  {...register("designation", { required: true })}
                  type="text"
                  className="input bg-[#2F80ED20] w-full"
                  placeholder="Designation"
                />

                <label className="label">Password</label>
                <div className="relative">
                  <input
                    {...register("password", { required: true })}
                    type={show ? "text" : "password"}
                    className="input w-full pr-16"
                    placeholder="Password"
                  />
                  <button
                    onClick={() => setShow(!show)}
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-4 z-10"
                  >
                    {show ? (
                      <MdOutlineRemoveRedEye size={24} />
                    ) : (
                      <IoMdEyeOff size={24} />
                    )}
                  </button>
                </div>

                <p className="text-error my-3 text-sm">{passwordError}</p>
                <button className="btn bg-[#2F80ED80] mt-4">SignUp</button>
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

export default Register;
