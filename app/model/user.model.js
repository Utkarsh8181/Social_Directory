import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamp: true
    },
)

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    return next();
})

const User = mongoose.model("user", userSchema)

export default User;