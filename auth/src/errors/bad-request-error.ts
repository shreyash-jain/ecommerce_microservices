
import { CustomError } from './custom-error';
interface ErrorType {
    message: string;
    field: string
}

export class BadRequestError extends CustomError {
    
    statusCode = 400;
    
    
    constructor(public error: ErrorType) {
        super();

        //only because we are extending

        Object.setPrototypeOf(this, BadRequestError.prototype);

       
    }

    serializeErrors() {
        return [
            { message: this.error.message, field: this.error.field }
        ];
    }


}