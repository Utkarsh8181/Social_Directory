import user from '../model/user.model.js'

class userService {

    register = async (body) => {
        const data = await user.create(body);
        if (data) {
            return data;
        }
        return null;
    }
}
export default new userService;
