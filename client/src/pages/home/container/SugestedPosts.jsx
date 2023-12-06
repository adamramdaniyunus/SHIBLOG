import React from 'react'
import { Link } from 'react-router-dom'
import { images, stables } from '../../../constants'

const SugestedPosts = ({ className, header, posts = [], tags }) => {
    return (
        <div className={`w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg p-4 ${className}`}>
            <h2 className="font-robot font-medium text-dark mt-4 md:text-xl">{header}</h2>
            <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
                {posts?.length > 0 ? (
                    posts?.slice(0, 6).map((data, index) => (
                        <Link to={`/blog/${data.slug}`} key={index}
                            className='flex space-x-3 flex-nowrap items-center'>
                            <img className='aspect-square object-cover rounded-lg w-1/5'
                                src={data?.photo ? stables.UPLOAD_FOLDER_BASE_URL + data.photo : images.Sample}
                                alt={data.title}
                            />
                            <div className='text-sm font-roboto text-dark font-medium'>
                                <h3 className='md:text-base text-sm font-roboto text-dark font-medium lg:text-lg'>
                                    {data.title}
                                </h3>
                                <span className='text-xs opacity-60'>
                                    {new Date(data.createdAt).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>
                        </Link>
                    ))

                ) : "Belum ada blog terbaru"}
            </div>
            <h2 className='font-roboto font-medium text-dark mt-8 md:text-xl'>Tags</h2>
            <div className='flex flex-wrap gap-2 mt-4'>
                {tags.map((data, index) => (
                    <Link to={"/"} key={index} className='inline-block rounded-md px-3 py-1.5 bg-primary font-roboto text-xs text-white md:text-sm'>
                        {data}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SugestedPosts
