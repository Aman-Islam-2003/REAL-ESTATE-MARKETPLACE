import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({ listing }) => {
  const [Landlord, setLandlord] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeHandler = (event)=>{
    setMessage(event.target.value);
  }
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true)
        }
        setLandlord(data);

      } catch (error) {
        setError(true);
      }
    }

    fetchLandlord();

  }, [listing.userRef])
  return (
    <>
    {
      Landlord && (
        <div className='flex flex-col gap-2'>
          <p>Contact <span className='font-semibold'>{Landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
          <textarea name="message" id="message" rows={2} value={message} onChange={onChangeHandler} placeholder='Enter your message here' className='w-full border p-3 rounded-lg'/>
          <Link to={`mailto:${Landlord.email}?subject=Regarding ${listing.name}&body=${message}`}className='bg-slate-700 text-white text-center uppercase rounded-lg hover:opacity-95 p-3'>
            Send Message
          </Link>
        </div>
      )
    }
    </>
  )
}

export default Contact
