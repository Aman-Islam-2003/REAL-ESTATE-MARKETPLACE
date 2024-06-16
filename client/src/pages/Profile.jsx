import React from 'react'
import { useSelector } from 'react-redux'


const Profile = () => {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className='flex flex-col justify-center items-center mt-7 gap-y-4'>
        <h1 className='font-bold text-2xl'>Profile</h1>
        <img className='rounded-full w-16 h-16 mt-2' src={currentUser.avatar}/>
        <form className='flex flex-col w-2/6 gap-y-3'>
          <input type='text' id='username' placeholder='username' className='rounded py-2 px-1'/>
          <input type='email'id='email' placeholder='email' className='rounded py-2 px-1'/>
          <input type='password' id='password' placeholder='password' className='rounded py-2 px-1'/>
          <button className='uppercase w-full bg-slate-700 text-white rounded py-2 hover:opacity-95'>Update</button>
          <button className='uppercase w-full bg-green-800 text-white rounded py-2 hover:opacity-95'>Create Listing</button>
        </form>
        <div className='flex justify-between w-2/6 text-red-800 text-sm cursor-pointer'>
          <span>Delete Account</span>
          <span>Sign out</span>
        </div>
        <div className='text-green-800'>
          Show Listings
        </div>
    </div>
  )
}

export default Profile
