import userController from '../controller/user.controller.js';
import helper from '../utilities/helper.js';

export default app => {
  // Api for registration
  app.post('/signup', userController.register);
  // Api for login
  app.post('/signin', userController.login);
  // Api for adding Profile
  app.post('/profile', helper.tokenValidation, userController.profile)
  // Api for adding Profile
  app.get('/search', helper.tokenValidation, userController.search)
};
