// upload.js
import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
	},
});

// File filter function
const fileFilter = (req, file, cb) => {
	const allowedMimeTypes = [
		'image/jpeg',
		'image/jpg',
		'image/png',
		'image/gif',
		'application/pdf',
		'application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/vnd.ms-excel',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	];

	if (allowedMimeTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type. Only images, PDFs, and Office documents are allowed.'));
	}
};

// Create multer instance
const upload = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB limit
		files: 10,
	},
});

// Export helpers
const uploadSingle = upload.single('file');
const uploadMultiple = upload.array('files', 10);
const uploadFields = upload.fields([
	{ name: 'document', maxCount: 5 },
	{ name: 'image', maxCount: 5 },
]);

export { upload, uploadSingle, uploadMultiple, uploadFields };
