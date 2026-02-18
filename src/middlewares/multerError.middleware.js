import multer from 'multer';

export const handleMulterError = (error, req, res, next) => {
	if (error instanceof multer.MulterError) {
		// Multer-specific errors
		switch (error.code) {
			case 'LIMIT_FILE_SIZE':
				return res.handler.badRequest({}, 'File too large. Maximum size is 5MB.');
			case 'LIMIT_FILE_COUNT':
				return res.handler.badRequest({}, 'Too many files. Maximum 10 files allowed.');
			case 'LIMIT_UNEXPECTED_FILE':
				return res.handler.badRequest({}, 'Unexpected file field.');
			default:
				return res.handler.badRequest({}, 'File upload error: ' + error.message);
		}
	} else if (error) {
		// Other errors (like file type validation)
		return res.handler.badRequest({}, error.message || 'File upload error');
	}

	next();
};
