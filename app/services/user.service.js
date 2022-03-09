import bcrypt from 'bcryptjs';
import Profile from '../model/profile.model.js';
import user from '../model/user.model.js'
import helper from '../utilities/helper.js'

class userService {

    register = async (body) => {
        const userData = await user.findOne({ email: body.email });
        if (userData) {
            return "User already Exist"
        }
        const data = await user.create(body);
        return data;
    }

    login = async (loginInfo) => {
        const data = await user.findOne({ email: loginInfo.email })
        if (!data) {
            return data;
        }
        else if (data) {
            const dataResult = await bcrypt.compare(loginInfo.password, data.password);
            if (dataResult) {
                const loginData = helper.token(data);
                if (!loginData) {
                    return "Invalid credential / check your secret key"
                }
                return loginData;
            }
            else {
                return "Password is incorrect"
            }
        }
    }

    profile = async (body, id) => {
        const exist = await Profile.findOne({ userId: id });
        if (exist) {
            return "Profile already exist"
        }
        else {
            const userData = {
                userId: id,
                name: body.name,
                dob: body.dob,
                location: body.location,
                interests: body.interests
            }
            const data = Profile.create(userData);
            return data;
        }
    }
}

export default new userService;
