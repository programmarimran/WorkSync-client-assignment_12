import React, { useState } from "react";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.init";
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile=(userInfo)=>{
    return updateProfile(auth.currentUser,userInfo)
  }
  const userInfo = {
    createUser,
    updateUserProfile,
    loading,
    setLoading,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
