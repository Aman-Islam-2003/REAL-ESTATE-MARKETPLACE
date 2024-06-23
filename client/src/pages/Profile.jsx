import React, { useRef, useState, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, list, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { Link } from 'react-router-dom';
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutStart, signOutFailure, signOutSuccess } from '../redux/user/userSlice';


const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [listings, setListings] = useState([]);
  const [deleteListingError, setDeleteListingError] = useState(false);

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

  const deleteHandler = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const signOutHandler = async () => {
    try {
      dispatch(signOutStart())
      const res = await fetch(`/api/auth/signout`)
      const data = res.json();

      if (data.success === false) {
        dispatch(signOutFailure(data.message))
        return;
      }
      dispatch(signOutSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  }

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete//${listingId}`,
        {
          method: 'DELETE'
        }
      )
      const data = await res.json();
      if (data.success === false) {
        setDeleteListingError(true)
      }

      setListings((prev) =>
        prev.filter((listing) => listing._id !== listingId))

    } catch (error) {
      setDeleteListingError(true);
    }
  }
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
        <Link className='uppercase w-full bg-green-800 text-white rounded py-2 hover:opacity-95 text-center' to={"/create-listing"}>Create Listing</Link>
      </form>
      <div className='flex justify-between w-2/6 text-red-800 text-sm cursor-pointer'>
        <span onClick={deleteHandler}>Delete Account</span>
        <span onClick={signOutHandler}>Sign out</span>
      </div>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User updated successfully' : ''}
      </p>
      <button className='text-green-800' onClick={handleShowListings}>
        Show Listings
      </button>
      <p className='text-red-700 mt-2'>
        {
          showListingError ? "Error showing listing..." : ''
        }
      </p>
      {
        listings && listings.length > 0 &&
        listings.map((listing) => (
          <div className='flex items-center gap-6 border rounded-lg p-3 justify-between w-2/4' key={listing._id}>
            <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain' />
            </Link>
            <Link to={`/listing/${listing._id}`} className='text-slate-700 font-semibold hover:underline truncate flex-1'>
              <p>
                {listing.name}
              </p>
            </Link>
            <div className='flex flex-col items-center'>
              <button className='uppercase text-red-700' onClick={() => handleDeleteListing(listing._id)}>Delete</button>
              <Link to={`/update-listing/${listing._id}`}> 
              <button className='uppercase text-green-700'>Edit</button>
              </Link>
            </div>


          </div>

        ))
      }
    </div>
  )
}

export default Profile
