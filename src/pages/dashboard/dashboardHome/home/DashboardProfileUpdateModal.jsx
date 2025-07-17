// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";

// import { toast } from "react-toastify";

// import Swal from "sweetalert2";
// import useAxiosInstance from "../../../../hooks/useAxiosInstance";
// import useAuth from "../../../../hooks/useAuth";

// const DashboardProfileUpdateModal = ({ isOpen, setIsOpen }) => {
//   const axiosinstance = useAxiosInstance();
//   const { user, updateUserProfile, setLoading } = useAuth();
//   const [uploadedImage, setUploadedImage] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const { register, handleSubmit } = useForm();

//   const handleImageUpload = (e) => {
//     const image = e.target.files[0];
//     const formData = new FormData();
//     formData.append("image", image);

//     fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
//       method: "POST",
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((imgData) => {
//         if (imgData.success) {
//           setUploadedImage(imgData.data.url);
//           toast.success("Image uploaded!");
//         }
//       })
//       .catch(() => {
//         setError("Image upload failed");
//         setLoading(false);
//       });
//   };

//   const handleProfileUpdate = async (data) => {
//     const updateInfo = {
//       displayName: data.name,
//       ...(uploadedImage && { photoURL: uploadedImage }),
//     };

//     try {
//       await updateUserProfile(updateInfo);
//       Swal.fire("Profile Updated Successfully!");
//       navigate(-1);
//       setLoading(false);

//       const userInfoDB = {
//         name: data.name,
//         ...(uploadedImage ? { photo: uploadedImage } : { photo: user?.photoURL }),
//         uid: user?.uid,
//       };

//       await axiosinstance.patch("/users/profile", userInfoDB);
//       setIsOpen(false);
//     } catch (error) {
//       setError(error.code);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed w-full inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
//       <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
//         <form onSubmit={handleSubmit(handleProfileUpdate)} className="space-y-4">
//           <h1 className="text-2xl font-bold text-center">Update Your Profile</h1>

//           <div className="space-y-2">
//             <label className="block">Name</label>
//             <input
//               {...register("name", { required: true })}
//               type="text"
//               className="w-full border rounded p-2 bg-transparent"
//               placeholder="Enter Your Name"
//             />

//             <label className="block">Email</label>
//             <input
//               {...register("email", { required: true })}
//               type="email"
//               value={user?.email}
//               readOnly
//               className="w-full border rounded p-2 bg-gray-200"
//             />

//             <label className="block">Photo Upload</label>
//             <input
//               {...register("photo")}
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="w-full border rounded p-2 bg-transparent"
//             />

//             <label className="block">Bank Account No</label>
//             <input
//               {...register("bank_account_no", { required: true })}
//               type="text"
//               className="w-full border rounded p-2 bg-transparent"
//               placeholder="Bank Account Number"
//             />

//             <label className="block">Salary</label>
//             <input
//               {...register("salary", { required: true })}
//               type="number"
//               className="w-full border rounded p-2 bg-transparent"
//               placeholder="Salary"
//             />

//             <label className="block">Designation</label>
//             <input
//               {...register("designation", { required: true })}
//               type="text"
//               className="w-full border rounded p-2 bg-transparent"
//               placeholder="Designation"
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <div className="flex justify-between gap-3 pt-4">
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//             >
//               Update Profile
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsOpen(false)}
//               className="w-full bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DashboardProfileUpdateModal;
