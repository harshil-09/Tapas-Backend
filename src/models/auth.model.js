import sql from 'mssql';
// DATABASE
import { executeStoredProcedure } from '../database/index.js';
// UTILS
import logger from '../utils/logger.js';

class AuthModel {
    async login(userName) {
        try {
            const result = await executeStoredProcedure('SP_GetUserName', [
                { name: 'UserName', type: sql.VarChar(30), value: userName }
            ]);
            return result;
        } catch (error) {
            logger.error(`Error in login: ${error.message}`);
            throw error;
        }
    }

    async createSession(userId, token, ipAddress) {
        try {
            const result = await executeStoredProcedure('SP_CreateSession', [
                { name: 'userId', type: sql.BigInt, value: userId },
                { name: 'token', type: sql.VarChar(512), value: token },
                { name: 'ipAddress', type: sql.VarChar(25), value: ipAddress },
            ]);
            return result;
        } catch (error) {
            logger.error(`Error in createSession: ${error.message}`);
            throw error;
        }
    }

    async checkUserSession(userId, token) {
        try {
            const result = await executeStoredProcedure('SP_CheckUserSession', [
                { name: 'userId', type: sql.BigInt, value: userId },
                { name: 'token', type: sql.VarChar(512), value: token },
            ]);
            return result;
        } catch (error) {
            logger.error(`Error in checkUserSession: ${error.message}`);
            throw error;
        }
    }

    async updateUserSession(userId, token) {
        try {
            const result = await executeStoredProcedure('SP_UpdateSession', [
                { name: 'userId', type: sql.BigInt, value: userId },
                { name: 'token', type: sql.VarChar(512), value: token },
            ]);
            return result;
        } catch (error) {
            logger.error(`Error in updateUserSession: ${error.message}`);
            throw error;
        }
    }
}

export default AuthModel;