const {StatusCodes} = require('http-status-codes');
const CustomAPIError = require('./customError');

class invalidError extends CustomAPIError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY
    }
}

module.exports = invalidError;