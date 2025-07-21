import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import useUserRole from "../../../hooks/useUserRole";
import LoadingPage from "../../../components/Loadingpage";

const UpdateProfile = () => {
  const axiosinstance = useAxiosInstance();
  const { role, roleLoading } = useUserRole();
  const [uploadedImage, setUploadedImage] = useState("");
  const { user, loading, updateUserProfile, setLoading } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (role && !roleLoading) {
      navigate(from || "/");
    }
  }, [role, roleLoading, from, navigate]);

  if (roleLoading || loading) return <LoadingPage />;
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

  const handleUpdateUser = (data) => {
    const updateInfo = {
      displayName: data.name,
      photoURL: uploadedImage,
    };

    updateUserProfile(updateInfo)
      .then(() => {
        toast.success(
          from
            ? "SignUp successfully! Redirecting to your previous page..."
            : "SignUp successfully! Redirecting to home page..."
        );
        navigate(`${from || "/"}`);
        // eslint-disable-next-line no-unused-vars
        const { photo, ...userData } = data;

        const userInfoDB = {
          ...userData,
          uid: user?.uid,
          last_log_in: new Date().toISOString(),
          photo: uploadedImage,
        };
        // eslint-disable-next-line no-unused-vars
        const res = axiosinstance.put("/users/profile", userInfoDB);
        // console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.code);
        setLoading(false);
      });
  };

  return (
    <div className="py-12">
      <div className="card mx-auto bg-base-100 border border-gray-200 w-full shadow-2xl">
        <form onSubmit={handleSubmit(handleUpdateUser)} className="card-body">
          <h1 className="text-3xl text-center font-bold mb-4">
            Update Your Profile
          </h1>

          <div className="space-y-3">
            <div>
              <label className="label">Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="input bg-[#2F80ED20] w-full"
                placeholder="Enter Your Name"
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                value={user?.email}
                readOnly
                className="input bg-[#2F80ED20] w-full"
              />
            </div>

            <div>
              <label className="label">Photo Upload</label>
              <input
                {...register("photo", { required: true })}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="input bg-[#2F80ED20] w-full"
              />
            </div>

            <div>
              <label className="label">Role</label>
              <select
                {...register("role", { required: true })}
                className="input bg-[#2F80ED20] w-full"
              >
                <option value="">Select Role</option>
                <option value="Employee">Employee</option>
                <option value="HR">HR</option>
              </select>
              {errors.role && (
                <p className="text-error mt-1 text-sm">Role is required</p>
              )}
            </div>

            <div>
              <label className="label">Bank Account No</label>
              <input
                {...register("bank_account_no", { required: true })}
                type="text"
                className="input bg-[#2F80ED20] w-full"
                placeholder="Bank Account Number"
              />
            </div>

            <div>
              <label className="label">Salary</label>
              <input
                {...register("salary", { required: true })}
                type="number"
                className="input bg-[#2F80ED20] w-full"
                placeholder="Salary"
              />
            </div>

            <div>
              <label className="label">Designation</label>
              <input
                {...register("designation", { required: true })}
                type="text"
                className="input bg-[#2F80ED20] w-full"
                placeholder="Designation"
              />
            </div>

            <button type="submit" className="btn bg-[#2F80ED80] w-full mt-4">
              Update Profile
            </button>
          </div>

          {error && (
            <p className="text-center text-error mt-4 text-sm">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
