import React from 'react'
import { BsCheckLg } from "react-icons/bs"
import { Link } from 'react-router-dom'
import { images, stables } from '../../constants'

const BlogCard = ({ className, blog }) => {
    return (
        <Link to={`/blog/${blog.slug}`} className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}>
            <div>
                <img src={blog.photo ? stables.UPLOAD_FOLDER_BASE_URL + blog.photo : images.Sample}
                    alt="post"
                    className='w-full object-cover object-center h-auto md:h-53 lg:h-48 xl:h-60'
                />
                <div className='p-5'>
                    <h2 className='font-roboto font-bold text-xl text-dark md:text-2xl'>{blog.title}</h2>
                    <p className='text-[#959ead] mt-3 text-sm font-roboto md:text-lg'>{blog.caption}</p>
                    <div className='flex gap-x-2 justify-between flex-nowrap items-center mt-6'>
                        <div className='flex items-center gap-x-2 md:gap-x-2.5'>
                            <img src={blog.user.avatar ? stables.UPLOAD_FOLDER_BASE_URL + blog.user.avatar : images.ProfileImage} alt="" className='w-9 h-9 md:w-10 md:h-10 rounded-full' />
                            <div className='flex flex-col'>
                                {blog.user.verified ? <div className='flex items-center gap-x-2'>
                                    <div className='flex flex-col'>
                                        <div className='flex items-center gap-x-2'>
                                            <h4 className='font-bold text-dark text-sm md:text-sm'>{blog.user.name}</h4>
                                            <span className='bg-[#36B37e] w-fit bg-opacity-20 p-1 rounded-full'>
                                                <BsCheckLg className="w-2.5 h-2.5 text-[#36B37e]" />
                                            </span>
                                        </div>
                                        <span className='italic text-[#959ead] text-xs md:text-base'>
                                            Penulis Handal
                                        </span>
                                    </div>
                                </div> : <h4 className='font-bold text-dark text-xs md:text-base'>{blog.user.name}</h4>}
                            </div>
                        </div>
                        <span className='font-roboto italic text-[#959ead] text-xs md:text-sm'>
                            {new Date(blog.createdAt).getDate()}{" "}
                            {new Date(blog.createdAt).toLocaleString("default", {
                                month: "long",
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard
