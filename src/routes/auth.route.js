import express from "express";
//MIDDLEWARES
import validateSchema from '../middlewares/validateSchema.middleware.js';
import validateToken from '../middlewares/validateToken.middleware.js';
//CONTROLLER
import AuthController from '../controllers/auth.controller.js';
//VALIDATIONS
import * as authValidation from '../validations/auth.validation.js';

const router = express.Router();
const authController = new AuthController();

router.post('/login', validateSchema(authValidation.login), authController.login);
router.post('/logout', validateToken, authController.logout);

export default router;