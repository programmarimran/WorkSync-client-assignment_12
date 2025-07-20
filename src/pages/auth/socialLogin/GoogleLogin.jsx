import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import Swal from "sweetalert2";
const GoogleLogin = () => {
  // const location = useLocation();
  // const from = location.pathname;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axiosinstance = useAxiosInstance();
  const { loginWithGoogle, setLoading, setUser } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      if (result) {
        setUser(result.user);

        const userInfoDB = {
          name: result?.user.displayName,
          email: result?.user.email,
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
          uid: result?.user.uid,
        };

        try {
          await axiosinstance.post(`/users`, userInfoDB);
        } catch (err) {
          if (err.response?.status === 409) {
            // console.log("User already exists.");
          } else {
            console.error(err);
          }
        }

        const patchInfoDB = {
          email: result?.user.email,
          last_log_in: new Date().toISOString(),
        };

        await axiosinstance.patch(`/users/profile`, patchInfoDB);

        const roleRes = await axiosinstance.get(
          `/users/user-role/${result?.user.email}`
        );
        // console.log("Role check:", roleRes.data.role);

        if (!roleRes.data.role) {
          // New user: role nai
          Swal.fire("Please update your profile information");
          navigate("/update-profile");
        } else {
          // Role ase: direct home e pathai
          navigate("/");
          setLoading(false)
        }
      }
    } catch (error) {
      setError(error.code);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <fieldset className=" fieldset">
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="btn bg-[#2F80ED20] mt-4"
        >
          {" "}
          <FcGoogle size={30} />
          Login with Google!!
        </button>
      </fieldset>
      <p className=" text-error">{error && error}</p>
    </div>
  );
};

export default GoogleLogin;
