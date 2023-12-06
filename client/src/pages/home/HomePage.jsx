import React, { useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Hero from './container/Hero'
import Blogs from './container/Blogs'
import CTA from './container/CTA'
import { useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../services/index/posts'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

const HomePage = () => {
    const queryClient = useQueryClient()
    const userState = useSelector(state => state.user);
    const [searchKeyword, setSearchKeyword] = useState("")


    const {
        data: postsData,
        isLoading,
        isFetching,
        refetch,
        isError,
    } = useQuery({
        queryFn: () => getAllPosts(searchKeyword),
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
        refetch()
    }
    return (
        <MainLayout>
            <Hero searchKeyword={searchKeyword} searchKeywordHandler={searchKeywordHandler} submitSearchKeywordHandler={submitSearchKeywordHandler} />
            <Blogs data={postsData?.data} isLoading={isLoading} isFetching={isFetching} isError={isError} />
            <CTA />
        </MainLayout>
    )
}

export default HomePage
