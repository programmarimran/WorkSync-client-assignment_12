import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { toast } from "react-toastify";
const provider = new GoogleAuthProvider();
let token = null;
// eslint-disable-next-line react-refresh/only-export-components
export const getToken = () => token;

const AuthProvider = ({ children }) => {
  const [footerEmail, setFooterEmail] = useState("");
  const [user, setUser] = useState(null);
  // console.log(user);
  const [loading, setLoading] = useState(true);
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (userInfo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, userInfo);
  };
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logoutUser = () => {
    return signOut(auth).then(() => {
      toast.info("Logout Successfully!");
    });
  };
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        currentUser.getIdToken().then((idToken) => {
          // console.log(idToken);
          token = idToken;
        });
      } else {
        token = null;
      }
    });

    return () => {
      unsubscribe();
      setLoading(false);
    };
  }, []);

  const userInfo = {
    loginWithGoogle,
    createUser,
    updateUserProfile,
    loginUser,
    logoutUser,
    loading,
    setLoading,
    user,
    setUser,
    setFooterEmail,
    footerEmail,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
