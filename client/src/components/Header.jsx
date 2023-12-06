import React, { useState } from 'react'
import { images } from '../constants'
import { MdKeyboardArrowDown } from "react-icons/md"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './../store/actions/user';
import toast from 'react-hot-toast'


const navItem = [
    { name: "Home", type: "link", href: "/" },
    { name: "Blogs", type: "link", href: "/blogs" },
    { name: "Pages", type: "dropdown", items: ["About Us", "Contact Us"] },
]


const NavItem = ({ item }) => {
    const [dropdown, setDrop] = useState(false)

    const handleDrop = () => {
        setDrop(currstate => {
            return !currstate
        })
    }
    return (
        <li className='relative group'>
            {item.type === "link" ? <>
                <NavLink to={item.href} className='px-4 py-2'>
                    {item.name}
                </NavLink>
                <span className='cursor-pointer text-blue-400
             absolute transition-all duration-500 font-bold right-0 top-0
              group-hover:right-[90%] opacity-0 group-hover:opacity-100'>#</span>

            </> :
                <>
                    <button onClick={handleDrop} className='px-4 py-2 flex items-center'>
                        <span>{item.name}</span>
                        {<MdKeyboardArrowDown />}
                    </button>

                    <div className={`${dropdown ? "block" : "hidden"} transition-all duration-500 pt-4 absolute bottom-0 right-0 transform translate-y-full w-max`}>
                        <ul className='flex flex-col shadow-lg gap-2 rounded-lg overflow-hidden backdrop-blur-xl'>
                            {item.items.map(page => (
                                <a key={page} href={`/${page}`} className='hover:bg-dark hover:text-white px-4 py-2 text-white lg:text-dark'>
                                    {page}
                                </a>
                            ))}
                        </ul>
                    </div>
                </>}
        </li>
    )
}

const Header = () => {
    const [navVisible, setVisible] = useState(false);
    const userState = useSelector(state => state.user)
    const navigate = useNavigate()
    const [navIsVisible, setNavIsVisible] = useState(false);
    const dispatch = useDispatch()

    const [profileDrowpdown, setProfileDrowpdown] = useState(false);
    const navVisibilityHandler = () => {
        setNavIsVisible((curState) => {
            return !curState;
        });
    };

    const logoutHandler = () => {
        toast.success("Berhasil logout")
        dispatch(logout())
    }

    const navHandler = () => {
        setVisible((currState) => {
            return !currState
        })
    }
    return (
        <section className='sticky top-0 left-0 z-50 bg-white'>
            <header className='container mx-auto flex px-4 pt-4 pb-2 justify-between items-center'>
                <div>
                    <img src={images.Logo} alt="" />
                </div>
                <div className='lg:hidden z-50'>
                    {navVisible ? <AiOutlineClose className='cursor-pointer w-6 h-6' onClick={navHandler} /> : <AiOutlineMenu className='cursor-pointer w-6 h-6' onClick={navHandler} />}
                </div>
                <div className={`${navVisible ? "right-0" : "-right-full"} 
                fixed top-0 flex-col w-full lg:w-auto mt-[66px] lg:mt-0 bg-dark lg:bg-transparent lg:flex-row justify-center lg:justify-end
                 bottom-0 lg:static flex gap-x-9 transition-all z-50 duration-300`}>
                    <ul className='flex flex-col text-white lg:text-black gap-y-10 lg:flex-row gap-x-5 items-center font-semibold'>
                        {navItem.map((item) => (
                            <NavItem key={item.name} item={item} />
                        ))}
                        {userState.userInfo ? (
                            <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
                                <div className="relative group">
                                    <div className="flex flex-col items-center">
                                        <button
                                            className="flex gap-x-1 items-center mt-5 lg:mt-0 border-2 border-primary px-6 py-2 rounded-full text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                                            onClick={() => setProfileDrowpdown(!profileDrowpdown)}
                                        >
                                            <span>Account</span>
                                            <MdKeyboardArrowDown />
                                        </button>
                                        <div
                                            className={`${profileDrowpdown ? "block" : "hidden"
                                                } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                                        >
                                            <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                                                {userState?.userInfo?.data.admin && (
                                                    <button
                                                        onClick={() => navigate("/admin")}
                                                        type="button"
                                                        className="hover:bg-dark hover:text-white px-4 py-2 text-dark lg:text-dark-soft"
                                                    >
                                                        Admin Dashboard
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => navigate("/profile")}
                                                    type="button"
                                                    className="hover:bg-dark hover:text-white px-4 py-2 text-dark lg:text-dark-soft"
                                                >
                                                    Profile Page
                                                </button>
                                                <button
                                                    onClick={logoutHandler}
                                                    type="button"
                                                    className="hover:bg-dark hover:text-white px-4 py-2 text-dark lg:text-dark-soft"
                                                >
                                                    Logout
                                                </button>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <NavLink to={"/signup"} className='border-2 mt-20 lg:mt-0 flex items-center
                                 border-primary px-6 py-2 rounded-full text-primary font-semibold
                                 hover:bg-primary hover:text-white transition-all duration-300'>
                                Sign Up
                            </NavLink>

                        )}
                    </ul>
                </div>
            </header>
        </section>
    )
}

export default Header
