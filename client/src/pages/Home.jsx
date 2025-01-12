import React from 'react'

const Home = () => {
  return (
    <div>
     {/* top */}
     <div className='flex flex-col max-w-6xl mx-auto px-3 border border-black p-28 gap-6'>
      <h1 className='font-bold text-slate-700 text-3xl lg:text-6xl'>Find your next <span className='text-slate-500'>perfect</span> place with ease</h1>
      <div className='text-gray-400 text-xs sm:text-sm'> Sahand Estate is the best place to find your next perfect place to
      live.
      <br/>
      We have a wide range of properties for you to choose from.
      </div>
      <Link to={'/search'} className='text-blue0800 font-bold hover:underline text-sm'>Let's start now</Link>
     </div>

     {/* swiper */}

     {/* listing results */}
    </div>

  )
}

export default Home
