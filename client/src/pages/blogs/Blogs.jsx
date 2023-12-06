import React, { useEffect } from 'react'
import BlogCard from '../../components/Blogs/BlogCard';
import BlogSkeleton from '../../components/Blogs/BlogSkeleton';
import ErrorMessage from '../../components/Error/ErrorMessage';

const Blogs = ({ data, isLoading, isFetching, isError }) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <section className='container mx-auto flex flex-col px-5 py-10'>
            <div className='flex flex-wrap md:gap-x-5 gap-y-5 pb-10'>
                {isLoading || isFetching ? (
                    [...Array(3)].map((item, index) => (
                        <BlogSkeleton key={index}
                            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
                    ))
                ) : isError ? (
                    <ErrorMessage message={"Tidak bisa mengambil data blog"} />
                ) : (
                    data?.length > 0 ? data?.map((blog, i) => (
                        <BlogCard key={i} className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]" blog={blog} />
                    )) : <>
                        <h1 className='text-center w-full font-roboto font-semibold'>Belum ada blog</h1>
                    </>
                )
                }
            </div>
        </section>
    )
}

export default Blogs
