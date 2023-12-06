import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

const Ttitle = ({ submitSearchKeywordHandler, searchKeyword, searchKeywordHandler }) => {
    return (
        <div className='mt-10 lg:ml-4 lg:w-1/2'>
            <h1 className='font-roboto text-3xl text-center font-bold text-primary md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]'>Dapatkan artikel-artikel menarik disini</h1>
            <p className='text-dark mt-4 text-center md:text-xl lg:text-left'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Neque ipsa possimus itaque, quibusdam eius modi provident ut quae sit esse!
            </p>
            <div className='flex flex-col gap-y-2.5 mt-10 z-40 relative'>
                <div className='relative'>
                    <form onSubmit={submitSearchKeywordHandler}>
                        <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959ead]' />
                        <input type="text" className='placeholder:font-bold font-semibold text-dark
                         placeholder:text-[#959ead] pr-3 w-full py-3 focus:outline-none 
                         shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] pl-12 md:py-4' placeholder='Cari blog'
                            onChange={searchKeywordHandler}
                            value={searchKeyword}
                        />
                        <button type='submit' className='w-full bg-primary hover:bg-white text-white hover:text-primary font-semibold rounded-lg px-5 py-3 md:absolute
                    md:right-2 md:-translate-1/2 md:w-fit md:py-2 md:mt-2'>Cari</button>
                    </form>
                </div>
            </div>
            <div className='flex mt-4 items-center flex-col lg:flex-row lg:flex-nowrap lg:gap-x-4 lg:mt-7'>
                <span className='text-dark font-semibold italic mt-2'>Blog terpopuler:</span>
                <ul className='flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3'>
                    <li className='rounded-lg bg-primary bg-opacity-10 px-3 py-1 text-primary font-semibold italic'>Design</li>
                    <li className='rounded-lg bg-primary bg-opacity-10 px-3 py-1 text-primary font-semibold italic'>Game</li>
                    <li className='rounded-lg bg-primary bg-opacity-10 px-3 py-1 text-primary font-semibold italic'>AI</li>
                </ul>
            </div>
        </div>
    )
}

export default Ttitle
