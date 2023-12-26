import React from 'react'
import {GoogleAuthProvider, signInWithPopup ,getAuth} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSucces } from '../redux/userSlice'
const OAuth = () => {
    const dispatch=useDispatch()
    const handleGoogleClick = async() =>{
        try{
            const provider = new GoogleAuthProvider()
            const auth=getAuth(app)
            const result = await signInWithPopup(auth,provider)
            console.log(result)
            const res=await fetch ('/api/auth/google',{
                method:'POST',
                 headers: {
                    'Content-Type': 'application/json',
                  },
                  body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                  }),
            });
            const data =await res.json()
            console.log(data)
            dispatch(signInSucces(data))
        }catch(error){
            console.log("could not logi with google" ,error)
        }
    }
  return (
    <button onClick={handleGoogleClick} className='bg bg-red-700 text-cyan-50 rounded-lg p-3 uppercase hover:opacity-90'>Continue With google</button>
  )
}

export default OAuth
