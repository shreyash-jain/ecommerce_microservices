
import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
    reason = 'resource not found';
    statusCode = 404 ; 
    constructor() {
        super();

        //only because we are extending

        Object.setPrototypeOf(this, NotFoundError.prototype);

       
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }


}