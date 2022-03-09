import { logger } from "../../logger/logger.js";
import validation from "../validation/validation.js";
import userService from "../services/user.service.js"
import http from 'http-status';
import httpStatus from "http-status";

class Controller {
    register = async (req, res) => {
        try {
            const registerValidation = validation.registerValidation.validate(req.body);
            if (registerValidation.error) {
                logger.error('Wrong Input Validations');
                return res.status(http.BAD_REQUEST).send({
                    success: false,
                    error: 'Wrong Input Validations',
                    data: registerValidation,
                });
            }
            const data = await userService.register(req.body);
            if (data === "User already Exist") {
                res.status(422).json({
                    message: 'User already Exist',
                    success: false,
                })
            }

            else {
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

    login = async (req, res) => {
        const loginInfo = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const loginValidation = validation.loginValidation.validate(loginInfo);
            if (loginValidation.error) {
                res.status(422).send({
                    success: false,
                    error: "Wrong input validation",
                    data: loginValidation
                })
            }
            const loginData = await userService.login(loginInfo);
            if (!loginData) {
                res.status(400).json({ error: "Invalid login credential" })
            }
            else {
                res.status(200).json({
                    message: "User login successfully",
                    data: loginData
                })
            }
        } catch (error) {
            logger.error(error);
        }
    }

    profile = async (req, res) => {
        const profileData = {
            name: req.body.name,
            dob: req.body.dob,
            interests: req.body.interests,
            location: req.body.location
        }
        console.log("1",req.user);
        const id = req.user.dataForToken.id;
        try {
            const profileValidation = validation.profileValidation.validate(profileData);
            if (profileValidation.error) {
                logger.error('Wrong Input Validations');
                return res.status(422).send({
                    success: false,
                    error: 'Wrong Input Validations',
                    data: profileValidation,
                });
            }
            const data = await userService.profile(profileData, id);
            if (data === "Profile already exist") {
                res.status(http.BAD_REQUEST).json({
                    error: "Profile already exist",
                    success: false
                })
            }
            else {
                res.status(http.CREATED).json({
                    message: "Profile was added successfully",
                    success: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Controller;