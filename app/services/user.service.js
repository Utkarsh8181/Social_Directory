import bcrypt from 'bcryptjs';
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
}

export default new userService;
