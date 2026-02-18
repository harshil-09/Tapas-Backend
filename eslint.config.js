module.exports = {
	env: {
		browser: false,
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'no-unused-vars': 'warn',
		'no-console': 'off',
		'prefer-const': 'error',
		'no-var': 'error',
		'object-shorthand': 'error',
		'prefer-template': 'error',
	},
};
