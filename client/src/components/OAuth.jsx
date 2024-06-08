import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';

const OAuth = () => {
    const handleGoogleClick = async () => {
        try {
            console.log("object")
            const provider = new GoogleAuthProvider();
            console.log(provider, "a")
            const auth = getAuth(app);
            console.log(auth, "b")
            const result = await signInWithPopup(auth, provider);
            console.log(result)
        } catch (error) {
            console.log("could not sign in with google", error)
        }
    }
    return (
        <button onClick={handleGoogleClick} type='button' className=' bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Continue with Google
        </button>
    )
}

export default OAuth
