import React from 'react'
import BlogCard from '../../../components/Blogs/BlogCard'
import { FaArrowRight } from "react-icons/fa"
import BlogSkeleton from '../../../components/Blogs/BlogSkeleton';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { useNavigate } from 'react-router-dom';

const Blogs = ({ data, isLoading, isFetching, isError }) => {
    const navigate = useNavigate()
    return (
        <section className='container mx-auto flex flex-col px-5 py-10'>
            <div className='flex flex-wrap md:gap-x-5 gap-y-5 pb-10'>
                {isLoading ? (
                    [...Array(3)].map((item, index) => (
                        <BlogSkeleton key={index}
                            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
                    ))
                ) : isError ? (
                    <ErrorMessage message={"Tidak bisa mengambil data blog"} />
                ) : (
                    data?.length > 0 ? data?.slice(0, 6).map((blog, i) => (
                        <BlogCard key={i} className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]" blog={blog} />
                    )) : <>
                        <h1 className='text-center w-full font-roboto font-semibold'>Belum ada blog</h1>
                    </>
                )
                }
            </div>
            <button onClick={() => navigate("/blogs")} className='mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg
             hover:bg-primary hover:text-white transition-all duration-300'>
                <span className=''>Blog Lainnya</span>
                <FaArrowRight className='w-3 h-3' />
            </button>
        </section>
    )
}

export default Blogs
