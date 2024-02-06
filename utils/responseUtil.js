const {HTTP_STATUS} = require("../constant/httpStatusConstant");

exports.sendResponse = (res, data = null, status = HTTP_STATUS.OK, error = null) => {
    let errorResponse = null

    if (error != null) {
        errorResponse = {
            message: null,
            details: null
        }
        switch (typeof error) {
            case "string":
                errorResponse.message = error
                errorResponse.details = []
                break;
            case "object":
                errorResponse.message = error.name
                errorResponse.details = error.stack
                break;
            default:
                errorResponse.message = "unknown error occurred"
                errorResponse.details = error
                break;
        }
    }

    return res.status(status).json({
        data: data,
        error: errorResponse
    })
}