import mongoose from "mongoose";
import { hash, compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface UserDocument extends Document {
    avatar: string;
    name: string;
    email: string;
    password: string;
    verified: boolean;
    verificationCode?: string;
    admin: boolean;

    generateJWT: () => Promise<string>;
    comparePassword: (enteredPassword: string) => Promise<boolean>;
}


const userSchema = new mongoose.Schema({
    avatar: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, required: false },
    admin: { type: Boolean, default: false },
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await hash(this.password, 10);
        return next();
    }
    return next();
});

userSchema.methods.generateJWT = async function () {
    return sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

userSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await compare(enteredPassword, this.password);
};

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;