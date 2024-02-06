const {HTTP_STATUS} = require("../constant/httpStatusConstant");

class ServiceError extends Error {
    constructor(message, status = HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        super(message);
        this.status = status;
    }
}

module.exports = ServiceError