const {StatusCodes} = require('http-status-codes');
const CustomAPIError = require('./customError');

class forbiddenError extends CustomAPIError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

module.exports = forbiddenError;