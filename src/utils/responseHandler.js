import { STATUS_CODES } from './statusCodes.js';

class ResponseHandler {
	constructor(req, res) {
		this.req = req;
		this.res = res;
	}

	sender(code, message, data, sendData = true) {
		this.res.status(code).json({ message, data: sendData ? data : {} });
	}

	/** Custom Response */
	custom(code, message, data) {
		this.sender(code, message, data);
	}

	/** Status Code - 200 */
	success(data, message) {
		this.sender(STATUS_CODES.SUCCESS, message || 'Success', data);
	}

	/** Status Code - 201 */
	created(data, message) {
		this.sender(STATUS_CODES.CREATED, message || 'Created Successfully', data);
	}

	/** Status Code - 400 */
	badRequest(data, message) {
		this.sender(STATUS_CODES.BAD_REQUEST, message || 'Bad Request', data);
	}

	/** Status Code - 401 */
	unauthorized(data, message) {
		this.sender(STATUS_CODES.UNAUTHORIZED, message || 'Unauthorized', data);
	}

	/** Status Code - 403 */
	forbidden(data, message) {
		this.sender(STATUS_CODES.FORBIDDEN, message || 'Forbidden', data);
	}

	/** Status Code - 404 */
	notFound(data, message) {
		this.sender(STATUS_CODES.NOT_FOUND, message || 'Requested resource not found!', data);
	}

	/** Status Code - 405 */
	notAllowed(data, message) {
		this.sender(STATUS_CODES.NOT_ALLOWED, message || 'Method is not allowed!', data);
	}

	/** Status Code - 409 */
	conflict(data, message) {
		this.sender(STATUS_CODES.CONFLICT, message || 'Provided information already exist!', data);
	}

	/** Status Code - 412 */
	preconditionFailed(data, message) {
		this.sender(
			STATUS_CODES.PRECONDITION_FAILED,
			message || 'Please complete other steps first',
			data
		);
	}

	/** Status Code - 422 */
	validationError(data, message) {
		this.sender(STATUS_CODES.VALIDATION_ERROR, message || 'Validation error!', data);
	}

	/** Status Code - 500 */
	serverError(data, message, sendData = false) {
		this.sender(STATUS_CODES.SERVER_ERROR, message || 'Internal Server Error!', data, sendData);
	}
}

export default ResponseHandler;
