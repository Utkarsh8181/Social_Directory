import userController from '../controller/user.controller.js';

export default app => {
  // Api for registration
  app.post('/signup', userController.register);
};
