// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {addDoc, collection, getFirestore} from 'firebase/firestore';
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJcgGomZWKdmhPq6tBBY5iC2-V0znCJMo",
  authDomain: "netflix-clone-4011c.firebaseapp.com",
  projectId: "netflix-clone-4011c",
  storageBucket: "netflix-clone-4011c.firebasestorage.app",
  messagingSenderId: "781963072632",
  appId: "1:781963072632:web:17f58f11e6b4621b28498d",
  measurementId: "G-Y9K4LT3X6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);

const signUp = async(name,email,password)=>{
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        });

    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(""));

    }

}

const login = async(email,password)=>{
    try{
       await signInWithEmailAndPassword(auth, email, password);

    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(""));

    }

}
const logout=()=>{
    signOut(auth);
}

export{
    auth, db, login, signUp, logout
};