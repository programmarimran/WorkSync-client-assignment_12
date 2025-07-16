import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const GoogleLogin = ({ from }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginWithGoogle, setLoading, setUser } = useAuth();
  // console.log(user);
  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        // console.log(result.user);
        if (result) {
          setUser(result.user);
          toast.success(
            `${
              from
                ? "Logged in with Google successfully! Redirecting to your previous page..."
                : "Logged in with Google successfully! Redirecting to home page..."
            }`
          );
          navigate(`${from || "/"}`);
          return;
        }
      })
      .catch((error) => {
        setError(error.code);
      })
      .finally(() => {
        setLoading(false);
      });
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
