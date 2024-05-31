import React from 'react';
import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <header>
        <div className='bg-slate-200 flex justify-between items-center p-3 mx-auto'>
            <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flexflex-wrap'>
                <span className='text-slate-500'>Sahand</span>
                <span className='text-slate-700'>Estate</span>
            </h1>
            </Link>
            <form className='bg-slate-100 p-3 rounded-lg flex items-center justify-between w-24 sm:w-64'>
                <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none'/>
                <FaSearch/>
            </form>
            <ul className='flex gap-2'>
                <Link to={'/home'}>
                <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to={'/home'}>
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>
                <Link to={'/sign-in'}>
                <li className='text-slate-700 hover:underline'>Sign in</li>
                </Link>
            </ul>
        </div>
        </header>
    )
}

export default Header
