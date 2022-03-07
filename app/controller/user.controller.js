import { logger } from "../../logger/logger.js";
import validation from "../validation/validation.js";
import userService from "../services/user.service.js"

class Controller {
    register = async (req, res) => {
        try {
            const registerValidation = validation.registerValidation.validate(req.body);
            if (registerValidation.error) {
                logger.error('Wrong Input Validations');
                return res.status(422).send({
                    success: false,
                    error: 'Wrong Input Validations',
                    data: registerValidation,
                });
            }
            const data = await userService.register(req.body);
            if (data) {
                res.status(200).json({
                    message: 'User registered Successfully',
                    success: true,
                    data: data
                })
            }
        } catch (error) {
            res.status(500).json({
                message: {
                    error: 'Error while connecting to the server',
                    success: false
                }
            })
            logger.error(error)
        }
    }
}

export default new Controller;