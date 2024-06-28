import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const navigate = useNavigate();
   const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const {loading , error} = useSelector((state)=>state.user)

  const notify = () => toast.error(error);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success == false) {
        // setError(data.message);
        // setLoading(false);
        dispatch(signInFailure(data.message));
        return
      }
      dispatch(signInSuccess(data))
      // setLoading(false);
      // setError(null);
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>Sign In</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='email' placeholder='email' id='email' className='border p-3 rounded-lg' onChange={handleChange} />
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700  text-white p-3 rounded-lg uppercase hover:opacity-95' onClick={notify}>{loading ? "loading..." : "Sign In"}</button>
        <OAuth/>
        <ToastContainer />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-red-800'>Sign up</span>
        </Link>
      </div>

    </div>
  )
}

export default SignIn 
