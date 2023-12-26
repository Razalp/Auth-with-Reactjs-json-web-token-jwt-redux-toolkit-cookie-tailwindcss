import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart,signInFailer,signInSucces } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../componets/OAuth'
const SignIn = () => {
    const [form,setForm]=useState({})
    const {loading,error}=useSelector((state)=>state.user);
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };
    console.log(form)
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        dispatch(signInSucces())
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        
        if(data.success==false){
          dispatch(signInFailer(data))
          return ;
        }
        dispatch(signInSucces(data))
        navigate('/')
      } catch (error) {
        console.error('Error during signup:', error);
        dispatch(signInFailer(error))
        
      }
    };
    
    
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onClick={handleSubmit}>
      
        <input type="email" placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="password" placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounder-lg uppercase hover:opacity-95 disabled:opacity-30'>{loading ? 'loarding...':'Sign In'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'> 
      <p>Dont an account ?</p>
        <Link to='/signup'>
        <span className='text-blue-950'> Sign in</span>
        </Link>
       
     
    </div> 
    <p className='text-red-700 p-1'>{error ? error.message || 'somthing as wrong' : ''}</p>   
    </div>
  )
}

export default SignIn
