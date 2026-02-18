import config from '../config/index.js';
import rateLimit from 'express-rate-limit';
import { ipKeyGenerator } from 'express-rate-limit';

// General rate limiter for all routes
const generalRateLimiter = rateLimit({
	windowMs: config.rateLimit.windowMs, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per windowMs
	message: {
		status: 'error',
		message: 'Too many requests from this IP, please try again later.',
		code: 'RATE_LIMIT_EXCEEDED',
	},
	standardHeaders: true,
	legacyHeaders: false,
	keyGenerator: (req) => {
		return ipKeyGenerator(req.ip || req.connection.remoteAddress || 'unknown');
	},
	handler: (req, res) => {
		res.status(429).json({
			status: 'error',
			message: 'Too many requests from this IP, please try again later.',
			code: 'RATE_LIMIT_EXCEEDED',
			retryAfter: Math.ceil(config.rateLimit.windowMs / 1000),
		});
	},
});

// Stricter rate limiter for authentication routes
const authRateLimiter = rateLimit({
	windowMs: config.rateLimit.authWindowMs,
	limit: 10,
	message: {
		status: 'error',
		message: 'Too many authentication attempts, please try again later.',
		code: 'AUTH_RATE_LIMIT_EXCEEDED',
	},
	standardHeaders: true,
	legacyHeaders: false,
	keyGenerator: (req) => {
		return ipKeyGenerator(req.ip || req.connection.remoteAddress || 'unknown');
	},
	handler: (req, res) => {
		res.status(429).json({
			status: 'error',
			message: 'Too many authentication attempts, please try again later.',
			code: 'AUTH_RATE_LIMIT_EXCEEDED',
			retryAfter: Math.ceil(config.rateLimit.authWindowMs / 1000),
		});
	},
});

// API rate limiter for API routes
const apiRateLimiter = rateLimit({
	windowMs: config.rateLimit.windowMs,
	limit: 50,
	message: {
		status: 'error',
		message: 'Too many API requests, please try again later.',
		code: 'API_RATE_LIMIT_EXCEEDED',
	},
	standardHeaders: true,
	legacyHeaders: false,
	keyGenerator: (req) => {
		return ipKeyGenerator(req.ip || req.connection.remoteAddress || 'unknown');
	},
	handler: (req, res) => {
		res.status(429).json({
			status: 'error',
			message: 'Too many API requests, please try again later.',
			code: 'API_RATE_LIMIT_EXCEEDED',
			retryAfter: Math.ceil(config.rateLimit.windowMs / 1000),
		});
	},
});

// Health check rate limiter
const healthRateLimiter = rateLimit({
	windowMs: config.rateLimit.healthWindowMs,
	limit: 30,
	message: {
		status: 'error',
		message: 'Too many health check requests, please try again later.',
		code: 'HEALTH_RATE_LIMIT_EXCEEDED',
	},
	standardHeaders: true,
	legacyHeaders: false,
	keyGenerator: (req) => {
		return ipKeyGenerator(req.ip || req.connection.remoteAddress || 'unknown');
	},
	handler: (req, res) => {
		res.status(429).json({
			status: 'error',
			message: 'Too many health check requests, please try again later.',
			code: 'HEALTH_RATE_LIMIT_EXCEEDED',
			retryAfter: Math.ceil(config.rateLimit.healthWindowMs / 1000),
		});
	},
});

// Development rate limiter
const developmentRateLimiter = rateLimit({
	windowMs: config.rateLimit.windowMs,
	limit: 50000,
	message: {
		status: 'error',
		message: 'Too many requests from this IP, please try again later.',
		code: 'DEV_RATE_LIMIT_EXCEEDED',
	},
	standardHeaders: true,
	legacyHeaders: false,
	handler: (req, res) => {
		res.status(429).json({
			status: 'error',
			message: 'Too many requests from this IP, please try again later.',
			code: 'DEV_RATE_LIMIT_EXCEEDED',
			retryAfter: Math.ceil(config.rateLimit.windowMs / 1000),
		});
	},
});

export {
	generalRateLimiter,
	authRateLimiter,
	apiRateLimiter,
	healthRateLimiter,
	developmentRateLimiter,
};
