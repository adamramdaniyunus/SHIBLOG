import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import { FiSearch } from 'react-icons/fi'
import Blogs from './Blogs'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../../services/index/posts'
import toast from 'react-hot-toast'
import Pagination from '../../components/Pagination'

let isFirstRun = true;

const AllBlogs = () => {
    const [searchKeyword, setSearchKeyword] = useState("")
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const {
        data: postsData,
        isLoading,
        isFetching,
        refetch,
        isError,
    } = useQuery({
        queryFn: () => getAllPosts(searchKeyword, currentPage),
        queryKey: ["posts"],
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        }
    });

    const searchKeywordHandler = e => {
        const { value } = e.target;
        setSearchKeyword(value)
    }

    const submitSearchKeywordHandler = e => {
        e.preventDefault()
        setCurrentPage(1)
        refetch()
    }

    useEffect(() => {
        if (isFirstRun) {
            isFirstRun = false;
            return;
        }
        refetch();
    }, [refetch, currentPage]);

    return (
        <MainLayout>
            <div className='flex flex-col gap-y-2.5 mt-10 z-40 items-center p-4'>
                <div className='relative w-1/2'>
                    <form onSubmit={submitSearchKeywordHandler}>
                        <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959ead]' />
                        <input type="text" className='placeholder:font-bold font-semibold text-dark
                         placeholder:text-[#959ead] pr-3 w-full py-3 focus:outline-none 
                         shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] pl-12 md:py-4' placeholder='Cari blog'
                            onChange={searchKeywordHandler}
                            value={searchKeyword}
                        />
                        <button type='submit' className='bg-primary hover:bg-white text-white hover:text-primary font-semibold rounded-lg px-5 absolute
                    right-2 -translate-1/2 w-fit py-2 mt-2'>Cari</button>
                    </form>
                </div>
            </div>

            <Blogs data={postsData?.data} isLoading={isLoading} isFetching={isFetching} isError={isError} />
            {!isLoading && (
                <Pagination
                    onPageChange={(page) => setCurrentPage(page)}
                    currentPage={currentPage}
                    totalPageCount={JSON.parse(
                        postsData?.headers?.["x-totalpagecount"]
                    )}
                />
            )}

        </MainLayout>
    )
}

export default AllBlogs
