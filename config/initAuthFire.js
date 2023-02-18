

import {appFirebase} from "./initAppFire";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  
  const auth = getAuth(appFirebase);
  
  const createAt = async (email, password) => {
    return  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("crate", userCredential);
        return userCredential;
      })
      .catch((error) => {
        console.log(error)
        return error;
      });
  };
  
  const signIn = async (email, password) => {
    return  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("sign/in", userCredential);
        return userCredential;
      })
      .catch((error) => {
        console.log(error)
        return error;
      });
  };
  
  export { createAt, signIn };