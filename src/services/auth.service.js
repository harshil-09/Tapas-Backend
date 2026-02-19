//MODEL
import AuthModel from "../models/auth.model.js";
//UTILS
import logger from "../utils/logger.js";
import bcrypt from 'bcrypt';

const authModel = new AuthModel();

class AuthService {
    async login(userName, passWord) {
        try {
            if (!userName || !passWord) {
                throw new Error("All fields are required");
            }

            const login = await authModel.login(userName);

            if (!login || !login.passWord) {
                throw new Error('Invalid UserId or Password');
            }

            const isPasswordValid = await bcrypt.compare(passWord, login.passWord);
            if (!isPasswordValid) {
                throw new Error('Invalid UserId or Password');
            }

            return {
                userId: login.userId,
                userName: login.userName,
                passWord: login.passWord,
                roleId: login.roleId,
            };
        } catch (error) {
            logger.error(`Error in login: ${error.message}`);
            throw error;
        }
    }

    async createSession(userId, token, ipAddress) {
        return await authModel.createSession(userId, token, ipAddress);
    }

    async checkUserSession(userId, token) {
        return await authModel.checkUserSession(userId, token);
    }

    async logout(userId, token) {
        return await authModel.updateUserSession(userId, token);
    }
}

export default AuthService;