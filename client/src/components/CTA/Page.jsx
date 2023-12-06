import React from 'react'
import { images } from '../../constants'

const Page = () => {
    return (
        <section className='relative bg-dark px-5 pb-4'>
            <div className='container grid grid-cols-12 mx-auto md:pb-20 lg:place-items-center'>
                <div className='col-span-12 mt-8 lg:col-span-6 lg:ml-4'>
                    <h2 className='text-white font-roboto font-bold text-2xl md:text-4xl md:text-center md:leading-normal lg:text-left'>Dapatkan berita terbaru dari kami</h2>
                    <div className='w-full max-w-[494px] mt-10 space-y-3 mx-auto md:space-y-0 md:flex md:items-center md:space-x-2 lg:mx-0'>
                        <input type="text"
                            className='px-4 py-3 rounded-lg w-full placeholder:text-[#959ead]' placeholder='Email' />
                        <button className='px-4 py-3 rounded-lg w-full bg-primary text-white font-bold hover:bg-white hover:text-primary'>Submit</button>
                    </div>
                    <p className='text-[#959ead] text-sm leading-7 mt-6 md:text-center md:text-base lg:text-left'>
                        <span className='font-semibold text-[#989797]'>Lorem ipsum</span> dolor sit amet consectetur adipisicing elit. Accusamus, minus! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, ex?
                    </p>
                </div>
                <div className='col-span-12 hidden my-[70px] md:block md:order-first lg:col-span-6 lg:order-last'>
                    <div className='w-3/4 mx-auto relative'>
                        <div className='w-1/2 h-1/2 bg-primary rounded-lg absolute top-[12%] -right-[8%]'>
                        </div>
                        <div className='w-1/2 h-1/2 bg-[#fff] opacity-[.06] rounded-lg absolute -bottom-[12%] -left-[8%]'>
                        </div>
                        <div className="w-full bg-white p-3 z-[1] rounded-xl relative">
                            <img src={images.CTA}
                                alt="post"
                                className='w-full object-cover object-center h-auto md:h-48 lg:h-36 xl:h-60'
                            />
                            <div className='p-5'>
                                <h2 className='font-roboto font-bold text-dark text-xl'>Dapatkan pelajaran dari pengalaman seseorang.</h2>
                                <p className='text-[#959ead] mt-3 text-md font-roboto'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi voluptate labore, ullam consectetur soluta dolores vel perferendis error officiis? Ducimus.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Page
