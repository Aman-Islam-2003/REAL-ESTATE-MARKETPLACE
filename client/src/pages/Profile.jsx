import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
  const { currentUser } = useSelector(state => state.user)
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(formData, fileUploadError, filePerc, file)

  useEffect(()=>{
   if(file){
    handleFileUpload(file);
   }
  },[file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  return (
    <div className='flex flex-col justify-center items-center mt-7 gap-y-4'>
      <h1 className='font-bold text-2xl'>Profile</h1>
      <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
      <form className='flex flex-col w-2/6 gap-y-3'>
        <input type='file' ref={fileRef} className='hidden' accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/> 
        <input type='text' id='username' placeholder='username' className='rounded py-2 px-1' />
        <input type='email' id='email' placeholder='email' className='rounded py-2 px-1' />
        <input type='password' id='password' placeholder='password' className='rounded py-2 px-1' />
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
