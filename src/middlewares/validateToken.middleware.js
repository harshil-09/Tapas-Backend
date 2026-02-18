import jwt from 'jsonwebtoken';
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

		const payload = jwt.verify(token, process.env.JWT_SECRET || '');

		if (!payload) return res.handler.unauthorized({}, 'Invalid token');

		const result = await authService.checkUserSession(
			parseInt(userId),
			parseInt(roleId),
			token || ''
		);

		if (!result.isSessionValid) return res.handler.unauthorized({}, 'Session expired');

		if (userId !== String(payload.userId)) return res.handler.unauthorized({}, 'Invalid token');

		req.user = {
			userId: parseInt(payload.userId),
			userName: result.userName,
			userEmail: result.userEmail,
			entityId: result.entityId,
			roleName: result.roleName,
		};

		return next();
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			await authService.updateUserSession(parseInt(userId), token || '', 'token-expired');
		}

		return res.handler.unauthorized({}, 'Invalid token');
	}
};

export default validateToken;
