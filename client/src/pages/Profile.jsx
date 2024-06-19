import React, { useRef, useState, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserFailure, updateUserSuccess } from '../redux/user/userSlice';


const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  console.log(currentUser)

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file])

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

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };

  console.log(currentUser)
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  return (
    <div className='flex flex-col justify-center items-center mt-7 gap-y-4'>
      <h1 className='font-bold text-2xl'>Profile</h1>
      <img
        mg
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
      <form className='flex flex-col w-2/6 gap-y-3' onSubmit={submitHandler}>
        <input type='file' ref={fileRef} className='hidden' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
        <input type='text' id='username' defaultValue={currentUser.username} placeholder='username' className='rounded py-2 px-1' onChange={changeHandler} />
        <input type='email' id='email' defaultValue={currentUser.email} placeholder='email' onChange={changeHandler} className='rounded py-2 px-1' />
        <input type='password' id='password' onChange={changeHandler} placeholder='password' className='rounded py-2 px-1' />
        <button disabled={loading} className='uppercase w-full bg-slate-700 text-white rounded py-2 hover:opacity-95'>{loading ? 'loading...' : 'Update'}</button>
        <button className='uppercase w-full bg-green-800 text-white rounded py-2 hover:opacity-95'>Create Listing</button>
      </form>
      <div className='flex justify-between w-2/6 text-red-800 text-sm cursor-pointer'>
        <span>Delete Account</span>
        <span>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User updated successfully' : ''}
      </p>
      <div className='text-green-800'>
        Show Listings
      </div>
    </div>
  )
}

export default Profile
