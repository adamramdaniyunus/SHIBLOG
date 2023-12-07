import React from 'react'
import { PiCardholderFill } from "react-icons/pi";
import { AiOutlineNumber } from "react-icons/ai";
import { allPost, getAllPosts } from '../../../../../services/index/posts';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getAllCategories } from '../../../../../services/index/postCategories';
import { getAllTags } from '../../../../../services/index/tags';
import { FaTags } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { getAllComments } from '../../../../../services/index/comments';



const DataDashboard = () => {
    const {
        data: postsComment,
        isLoading,
    } = useQuery({
        queryFn: () => getAllComments(),
        queryKey: ["comments"],
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        }
    });


    const {
        data: postCategory,
        isLoading: isLoadingCategory,
    } = useQuery({
        queryFn: () => getAllCategories(),
        queryKey: ["categories"],
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        }
    });


    const {
        data: postTags,
        isLoading: isLoadingTags,
    } = useQuery({
        queryFn: () => getAllTags(),
        queryKey: ["tags"],
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        }
    });

    return (
        <div className='flex justify-center w-full gap-4 flex-wrap'>
            <div className='w-64 bg-gradient-to-r from-[#FFBCBC] to-[#FFEBD8] gap-y-4 p-4 rounded-xl text-white font-opensans items-center flex flex-col'>
                <h1 className='font-bold md:text-xl text-md flex items-center gap-4'>Data Comments <PiCardholderFill className='text-2xl' /></h1>
                {isLoading ? <h1 className='font-bold md:text-xl text-md flex items-center gap-4'>Loading... <AiOutlineNumber className='text-2xl' /></h1>
                    : <h1 className='font-bold md:text-xl text-md flex items-center gap-4'>Total: {postsComment.data?.length} <AiOutlineNumber className='text-2xl' /></h1>}
            </div>
            <div className='w-64 bg-gradient-to-r from-primary to-[#B7EFCD] gap-y-4 p-4 rounded-xl text-white font-opensans items-center flex flex-col'>
                <h1 className='font-bold md:text-xl text-md flex items-center gap-4'>Data Categories <TbCategoryFilled className='text-2xl' /></h1>
                {isLoadingCategory ? <h1 className='font-bold md:text-xl text-md flex items-center gap-4'>Loading... <AiOutlineNumber className='text-2xl' /></h1>
                    : <h1 className='font-bold md:text-xl text-md flex items-center gap-4'>Total: {postCategory?.data?.length} <AiOutlineNumber className='text-2xl' /></h1>}
            </div>
            <div className='w-64 bg-gradient-to-r from-[#EC8F5E] to-[#F3B664] gap-y-4 p-4 rounded-xl text-white font-opensans items-center flex flex-col'>
                <h1 className='font-bold md:text-xl text-md flex items-center gap-4'>Data Tags <FaTags className='text-2xl' /></h1>
                {isLoadingTags ? <h1 className='font-bold md:text-xl text-md flex items-center gap-4'>Loading... <AiOutlineNumber className='text-2xl' /></h1>
                    : <h1 className='font-bold md:text-xl text-md flex items-center gap-4'>Total: {postTags.data?.length} <AiOutlineNumber className='text-2xl' /></h1>}
            </div>
        </div>
    )
}

export default DataDashboard
