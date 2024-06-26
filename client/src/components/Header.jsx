import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, generatePath, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user)
    const [searchTerm, setSearchTerm] = useState('');

    const submitHandler = (e)=>{
        e.preventDefault();
       const urlParams = new URLSearchParams(window.location.search);
       urlParams.set('searchTerm', searchTerm);
       const searchQuey = urlParams.toString();
       console.log(searchQuey)
       navigate(`search?${searchQuey}`);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }
      }, [location.search]);

    return (
        <header className='bg-slate-200 '>
            <div className='flex justify-between items-center p-3 mx-auto max-w-6xl'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flexflex-wrap'>
                        <span className='text-slate-500'>Sahand</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center justify-between w-24 sm:w-64' onSubmit={submitHandler}>
                    <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none' onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm}/>
                    <button>
                    <FaSearch className='text-slate-600'/>
                    </button>
                </form>
                <ul className='flex gap-4'>
                    <Link to={'/home'}>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                    </Link>
                    <Link to={'/home'}>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                    </Link>
                    <Link to={'/profile'}>
                        {
                            currentUser ? <img src={currentUser.avatar} className='rounded-full h-7 w-7 object-cover' /> : <li className='text-slate-700 hover:underline'>Sign in</li>
                        }
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header
