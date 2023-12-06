import User from "../models/user";
import express from 'express';
import uploadPicture from "../middlewares/uploadPicture";
import jwt from "jsonwebtoken";
import { fileRemover } from "../utils/fileRemover";

interface CustomError extends Error {
    statusCode?: number;
}


export const registerUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            throw new Error("User sudah digunakan");
        }

        const newUser = await User.create({
            name,
            email,
            password
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // 30 hari
        });

        return res.status(201).json({
            data: {
                _id: newUser._id,
                avatar: newUser.avatar,
                name: newUser.name,
                email: newUser.email,
                verified: newUser.verified,
                admin: newUser.admin,
                token: token
            }
        })


    } catch (error) {
        next(error)
    }
}

export const userLogin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            throw new Error("Email not found");
        }

        if (await user.comparePassword(password)) {

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });


            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // 30 hari
            });

            return res.status(200).json({
                data: {
                    _id: user._id,
                    avatar: user.avatar,
                    name: user.name,
                    email: user.email,
                    verified: user.verified,
                    admin: user.admin,
                    token: token,
                }
            });
        } else {
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        next(error)
    }
}


export const userProfile = async (req: express.Request & { user?: { _id: string } }, res: express.Response, next: express.NextFunction) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            return res.status(200).json({
                data: {
                    _id: user._id,
                    avatar: user.avatar,
                    name: user.name,
                    email: user.email,
                    verified: user.verified,
                    admin: user.admin,
                }
            });
        } else {
            let error: CustomError = new Error("User not found");
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req: express.Request & { user?: { _id: string } }, res: express.Response, next: express.NextFunction) => {
    try {
        let user = await User.findById(req.user._id);

        if (!user) {
            throw new Error("User not found");
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password && req.body.password.length < 6) {
            throw new Error("Password length must be at least 6 character");
        } else if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUserProfile = await user.save();

        res.json({
            data: {
                _id: updatedUserProfile._id,
                avatar: updatedUserProfile.avatar,
                name: updatedUserProfile.name,
                email: updatedUserProfile.email,
                verified: updatedUserProfile.verified,
                admin: updatedUserProfile.admin,
                token: await updatedUserProfile.generateJWT(),
            }
        });
    } catch (error) {
        next(error);
    }
};

export const updateProfilePicture = async (req: express.Request & { user?: { admin: boolean, _id: string } }, res: express.Response, next: express.NextFunction) => {
    try {
        const upload = uploadPicture.single("profilePicture");

        upload(req, res, async function (err) {
            if (err) {
                const error = new Error(
                    "An unknown error occured when uploading " + err.message
                );
                next(error);
            } else {
                // every thing went well
                if (req.file) {
                    let filename;
                    let updatedUser = await User.findById(req.user._id);
                    filename = updatedUser.avatar;
                    if (filename) {
                        fileRemover(filename);
                    }
                    updatedUser.avatar = req.file.filename;
                    await updatedUser.save();
                    res.json({
                        data: {
                            _id: updatedUser._id,
                            avatar: updatedUser.avatar,
                            name: updatedUser.name,
                            email: updatedUser.email,
                            verified: updatedUser.verified,
                            admin: updatedUser.admin,
                            token: await updatedUser.generateJWT(),
                        }
                    });
                } else {
                    let filename;
                    let updatedUser = await User.findById(req.user._id);
                    filename = updatedUser.avatar;
                    updatedUser.avatar = "";
                    await updatedUser.save();
                    fileRemover(filename);
                    res.json({
                        data: {
                            _id: updatedUser._id,
                            avatar: updatedUser.avatar,
                            name: updatedUser.name,
                            email: updatedUser.email,
                            verified: updatedUser.verified,
                            admin: updatedUser.admin,
                            token: await updatedUser.generateJWT(),
                        }
                    });
                }
            }
        });
    } catch (error) {
        next(error);
    }
};