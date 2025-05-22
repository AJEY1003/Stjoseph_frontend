import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider } from "firebase/auth";
export const doCreateUserWithEmailAndPassword = async (email, password) =>{
    return createUserWithEmailAndPassword(auth, email, password);
}
export const doSignInWithEmailAndPassword = async (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password);
}
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth,provider);
    return result;
}
export const doSignOut = async () => auth.signOut();
export const doPasswordReset = async (email) => sendPasswordResetEmail(auth,email);
export const doPasswordChange = async (password) => updatePassword(auth.currentUser,password);
export const doSendEmailVerification = async () =>{ return sendEmailVerification(auth.currentUser,{
    url:`${window.location.origin}/login`,
});
};