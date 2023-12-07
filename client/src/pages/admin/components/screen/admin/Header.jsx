import React from 'react'
import { useSelector } from 'react-redux'
import { images, stables } from '../../../../../constants'

const Header = () => {

    const userState = useSelector(state => state.user)

    return (
        <header>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="w-full px-4 mx-auto">
                <div className="py-8">
                    <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                        <div className="leading-tight border-2 w-full h-auto rounded-xl shadow border-primary p-4 mx-4">
                            <div className='flex flex-wrap items-center gap-x-10 relative'>
                                <div className='hidden md:block'>
                                    <img className='rounded-full w-24 h-24' src={userState.userInfo.data.avatar ? stables.UPLOAD_FOLDER_BASE_URL + userState.userInfo?.data.avatar : images.ProfileImage} alt="" />
                                </div>

                                <div className='text-md md:text-2xl text-dark'>
                                    <h1>Selamat datang {userState.userInfo?.data.name}</h1>
                                    <p className='text-xs md:text-sm'>Selamat beraktivitas kembali!</p>
                                </div>

                                <div className='absolute -right-7  md:right-0 -bottom-7 md:bottom-0'>
                                    <img src={images.Logo} alt="logo" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
