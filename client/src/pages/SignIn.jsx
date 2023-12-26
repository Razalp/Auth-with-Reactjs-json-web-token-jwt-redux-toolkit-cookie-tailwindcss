import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [form,setForm]=useState({})
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };
    console.log(form)
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        setLoading(false)
        setError(false);
  
        if(data.success==false){
          setError(true)
          return ;
        }
        navigate('/')
      } catch (error) {
        console.error('Error during signup:', error);
        setLoading(true)
        setError(true)
        
      }
    };
    
    
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onClick={handleSubmit}>
      
        <input type="email" placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="password" placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounder-lg uppercase hover:opacity-95 disabled:opacity-30'>{loading ? 'loarding...':'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5'> 
      <p>Dont an account ?</p>
        <Link to='/signup'>
        <span className='text-blue-950'> Sign in</span>
        </Link>
       
     
    </div> 
    {/* <p className='text-red-700 p-1'>{error && 'somthing as wrong'}</p>    */}
    </div>
  )
}

export default SignIn
