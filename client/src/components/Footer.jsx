import React from "react";
import {
    AiFillInstagram,
    AiFillHeart,
} from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import images from './../constants/images';


const Footer = () => {
    return (
        <section className="bg-dark">
            <footer className="container mx-auto grid grid-cols-10 px-5 py-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
                <div className="col-span-5 md:col-span-4 lg:col-span-2">
                    <h3 className="text-primary font-bold md:text-lg">Product</h3>
                    <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base">
                        <li>
                            <span>Landingpage</span>
                        </li>
                        <li>
                            <span>Features</span>
                        </li>
                        <li>
                            <span>API</span>
                        </li>
                    </ul>
                </div>
                <div className="col-span-5 md:col-span-4 lg:col-span-2">
                    <h3 className="text-primary font-bold md:text-lg">Services</h3>
                    <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base">
                        <li>
                            <span>Membuat API</span>
                        </li>
                        <li>
                            <span>Web development</span>
                        </li>
                    </ul>
                </div>
                <div className="col-span-5 md:col-span-4 lg:col-span-2">
                    <h3 className="text-primary font-bold md:text-lg">Information</h3>
                    <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base">
                        <li>
                            <span>Portfolio</span>
                        </li>
                    </ul>
                </div>
                <div className="col-span-5 md:col-span-4 lg:col-span-2">
                    <h3 className="text-primary font-bold md:text-lg">More</h3>
                    <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base">
                        <li>
                            <span>Dokumentasi API</span>
                        </li>
                        <li>
                            <span>My Blog</span>
                        </li>
                        <li>
                            <span>Games</span>
                        </li>
                    </ul>
                </div>
                <div className="col-span-10 md:order-first md:col-span-4 lg:col-span-2">
                    <img
                        src={images.Logo}
                        alt="logo"
                        className="brightness-10 invert mx-auto md:mx-0"
                    />
                    <p className="text-sm text-[#959ead] text-center mt-4 md:text-left md:text-base lg:text-sm">
                        Butuh bantuan saya?.
                    </p>
                    <ul className="flex justify-center items-center mt-5 space-x-4 text-gray-300 md:justify-start">
                        <li>
                            <a href="/">
                                <AiFillInstagram className="w-6 h-auto" />
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <FaWhatsapp className="w-6 h-auto" />
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <BsTelegram className="w-6 h-auto" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="hidden md:flex flex-col items-center space-y-4 md:col-span-12 lg:col-span-10">
                    <div className="bg-primary text-white p-3 rounded-full">
                        <AiFillHeart className="w-7 h-auto" />
                    </div>
                    <p className="font-bold italic text-[#959ead]">
                        Copyright © 2023. Crafted with love.
                    </p>
                </div>
            </footer>
        </section>
    );
};

export default Footer;