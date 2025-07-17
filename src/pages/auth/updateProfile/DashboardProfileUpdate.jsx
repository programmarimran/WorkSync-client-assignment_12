import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const DashboardProfileUpdate = () => {
  const axiosinstance = useAxiosInstance();
  const queryClient = useQueryClient();
  const [uploadedImage, setUploadedImage] = useState("");
  const { user, updateUserProfile, setLoading } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [photoUploading, setPhotoUploading] = useState(false);

  const { data } = useQuery({
    queryKey: ["userData", user.email],
    queryFn: async () => {
      const res = await axiosinstance.get(`/users/specific/user/${user.email}`);
      return res.data;
    },
  });

  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleImageUpload = (e) => {
    setPhotoUploading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          setUploadedImage(imgData.data.url);
          toast.success("Image uploaded!");
        }
        setPhotoUploading(false);
      })
      .catch(() => {
        setError("Image upload failed");
        setPhotoUploading(false);
      });
  };

  const handleProfileUpdate = async (data) => {
    const updateInfo = {
      displayName: data.name,
      ...(uploadedImage && { photoURL: uploadedImage }),
    };

    try {
      await updateUserProfile(updateInfo);
      await axiosinstance.patch("/users/profile", {
        name: data.name,
        ...(uploadedImage ? { photo: uploadedImage } : { photo: user?.photoURL }),
        uid: user?.uid,
        email: user?.email,
        bank_account_no: data.bank_account_no,
        salary: data.salary,
        designation: data.designation,
      });
      queryClient.invalidateQueries({ queryKey: ["userData", user.email] });
      Swal.fire("Profile updated successfully! Redirecting...");
      navigate(-1);
      setLoading(false);
    } catch (error) {
      setError(error.code);
    }
  };

  const onFormSubmit = (data) => {
    if (photoUploading) {
      toast.info("Please wait until the photo upload is complete.");
      return;
    }
    handleProfileUpdate(data);
  };

  return (
    <div className="py-12">
      <div className="card mx-auto bg-base-100 border border-gray-200 w-full shadow-2xl">
        <form onSubmit={handleSubmit(onFormSubmit)} className="card-body">
          <h1 className="text-3xl text-center font-bold mb-4">Update Your Profile</h1>

          <div className="space-y-3">
            <div>
              <label className="label">Name</label>
              <input {...register("name", { required: true })} type="text" defaultValue={data?.name || ""} className="input bg-[#2F80ED20] w-full" placeholder="Enter Your Name" />
            </div>

            <div>
              <label className="label">Email</label>
              <input {...register("email", { required: true })} type="email" value={user?.email} readOnly className="input bg-[#2F80ED20] w-full" />
            </div>

            <div>
              <label className="label">Photo Upload</label>
              <input {...register("photo")} type="file" accept="image/*" onChange={handleImageUpload} className="input bg-[#2F80ED20] w-full" />
            </div>

            <div>
              <label className="label">Bank Account No</label>
              <input {...register("bank_account_no", { required: true })} type="text" defaultValue={data?.bank_account_no || ""} className="input bg-[#2F80ED20] w-full" placeholder="Bank Account Number" />
            </div>

            <div>
              <label className="label">Salary</label>
              <input {...register("salary", { required: true })} type="number" defaultValue={data?.salary || ""} className="input bg-[#2F80ED20] w-full" placeholder="Salary" />
            </div>

            <div>
              <label className="label">Designation</label>
              <input {...register("designation", { required: true })} type="text" defaultValue={data?.designation || ""} className="input bg-[#2F80ED20] w-full" placeholder="Designation" />
            </div>

            <button type="submit" className="btn bg-[#2F80ED80] w-full mt-4" disabled={photoUploading}>
              {photoUploading ? "Uploading Photo..." : "Update Profile"}
            </button>

            <Link to={-1}>
              <button type="button" className="btn bg-[#2F80ED80] w-full mt-4">Cancel</button>
            </Link>
          </div>

          {error && <p className="text-center text-error mt-4 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default DashboardProfileUpdate;
