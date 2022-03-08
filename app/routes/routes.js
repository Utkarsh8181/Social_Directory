import userController from '../controller/user.controller.js';

export default app => {
  // Api for registration
  app.post('/signup', userController.register);
  // Api for login
  app.post('/signin', userController.login);
};
