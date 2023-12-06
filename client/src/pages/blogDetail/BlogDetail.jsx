import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import { images, stables } from '../../constants'
import BreadCrumbs from '../../components/Detail/BreadCrumbs'
import { Link } from 'react-router-dom'
import SugestedPosts from '../home/container/SugestedPosts'
import CommentContainer from '../../components/Comments/CommentContainer'
import SocialShareButtons from '../../components/SocialShareButtons'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import parseJsonToHtml from '../../utils/parseJsonToHtml'
import { getAllPosts, getSinglePost } from '../../services/index/posts'
import ErrorMessage from '../../components/Error/ErrorMessage'
import Editor from '../../components/editor/Editor'
import BlogDetailSkeleton from '../../components/Blogs/BlogDetailSkeleton'


const BlogDetail = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { slug } = useParams()
    const userState = useSelector(state => state.user);
    const [breadCrumbs, setBreadCrumbs] = useState([])
    const [body, setBody] = useState(null);

    const { data, isLoading, isError, isFetching } = useQuery({
        queryFn: () => getSinglePost({ slug }),
        queryKey: ["blog", slug],
        onSuccess: (data) => {
            setBreadCrumbs([
                { name: "Home", link: "/" },
                { name: "Blog", link: "/blog" },
                { name: `${data?.data.title}`, link: `/blog/${data?.data.slug}` },
            ]);
            setBody(parseJsonToHtml(data?.data.body))
        }
    })
    const { data: postData } = useQuery({
        queryFn: () => getAllPosts(),
        queryKey: ["posts"]
    })

    const tags = [
        "AI",
        "Programming",
        "Game",
        "Sports"
    ]

    return (
        <MainLayout>
            {isLoading ? (
                <BlogDetailSkeleton />
            ) : isError ? (
                <ErrorMessage message={"Tidak bisa mengambil data blog"} />
            ) : (
                <section className='container mx-auto max-w-5xl flex flex-col p-5 lg:flex-row lg:gap-x-5 lg:items-start'>
                    <article className='flex-1'>
                        <BreadCrumbs data={breadCrumbs} />
                        <img src={data?.data.photo ? stables.UPLOAD_FOLDER_BASE_URL + data.data.photo : images.Sample} alt="post" className='rounded-xl w-full' />
                        <div className="mt-4 flex gap-2">
                            {data?.data?.categories.map((category) => (
                                <Link
                                    to={`/blog?category=${category.name}`}
                                    className="text-primary text-sm font-roboto inline-block md:text-base"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                        <h1 className='text-xl font-medium font-roboto text-dark mt-4 md:text-[26px]'>{data?.data.title}</h1>
                        <div className="w-full">
                            {!isLoading && !isError && (
                                <Editor content={data?.data.body} editable={false} />
                            )}
                        </div>
                        <CommentContainer
                            className={"mt-10"}
                            logginedUser={userState?.userInfo?.data._id}
                            comments={data?.data.comments}
                            postSlug={slug}
                            load={isFetching}
                            postId={data?.data.user._id}
                        />
                    </article>
                    <div>
                        <SugestedPosts
                            header={"Blog Terbaru"}
                            posts={postData?.data}
                            tags={tags}
                            className={"mt-8 lg:mt-0 lg:max-w-xs"}
                        />
                        <div className='mt-7'>
                            <h2 className="font-roboto font-medium text-dark mb-4 md:text-xl">
                                Share on:
                            </h2>
                            <SocialShareButtons
                                url={encodeURI(window.location.href)}
                                title={encodeURIComponent(data?.data.title)}
                            />
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    )
}

export default BlogDetail
