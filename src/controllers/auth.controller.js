//SERVICES
import AuthService from "../services/auth.service.js";
// UTILS
import logger from '../utils/logger.js';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const authService = new AuthService();

class AuthController {
    async login(req, res) {
        try {
            const { userName, passWord } = req.body;
            const ipAddress = req.ip;

            const user = await authService.login(userName, passWord);

            const token = jwt.sign({ userId: user.userId }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
            const session = await authService.createSession(user.userId, token, ipAddress);
            return res.handler.success(session, 'Login successful');

        } catch (error) {
            logger.error(`Error in login: ${error.message}`);
            return res.handler.serverError({}, error.message || 'Error in login');
        }
    }

    async logout(req, res) {
        try {
            const userId = req.user.userId;
            const token = req.headers.authorization?.split(' ')[1];

            console.log(userId, token);

            await authService.logout(userId, token);

            return res.handler.success({}, 'Logged out successfully');
        } catch (error) {
            logger.error('Error in logout controller', { error });
            return res.handler.serverError({}, error.message || 'Error in logout controller');
        }
    }
}

export default AuthController;