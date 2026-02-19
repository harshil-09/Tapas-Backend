import jwt from 'jsonwebtoken';
import config from '../config/index.js';
// SERVICES
import AuthService from '../services/auth.service.js';

const authService = new AuthService();

const validateToken = async (req, res, next) => {
	const userId = req.headers.userid;
	const roleId = req.headers.roleid;
	const token = req.headers.authorization?.split(' ')[1];

	try {
		if (!token) return res.handler.unauthorized({}, 'Token is required');
		if (!roleId) return res.handler.unauthorized({}, 'Role ID is required');
		if (!userId) return res.handler.unauthorized({}, 'User ID is required');

		const payload = jwt.verify(token, config.jwt.secret);

		if (!payload) return res.handler.unauthorized({}, 'Invalid token');

		const result = await authService.checkUserSession(parseInt(userId), token || '');

		if (!result || !result.token) return res.handler.unauthorized({}, 'Session expired');

		if (userId !== String(payload.userId)) return res.handler.unauthorized({}, 'Invalid token');

		req.user = {
			userId: parseInt(payload.userId),
			roleId: parseInt(roleId),
			userName: result.userName,
			roleName: result.roleName,
			token: token,
		};

		return next();
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return res.handler.unauthorized({}, 'Token expired');
		}

		return res.handler.unauthorized({}, 'Invalid token');
	}
};

export default validateToken;
