import mongoose from 'mongoose'
const profileSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    dob: {
        type: String,
        required: true,
        minlength: 2
    },
    interests:[ 
         
    ],
    location: {
        type: String,
        required: true,
        minlength: 2
    }
},
    {
        timestamp: true
    }
)

const Profile = mongoose.model("profile", profileSchema)

export default Profile;