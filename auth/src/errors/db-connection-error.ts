
import { CustomError } from './custom-error';

export class DbConnectionError extends CustomError {
    reason = 'error connecting to db';
    statusCode = 500 ; 
    constructor() {
        super();

        //only because we are extending

        Object.setPrototypeOf(this, DbConnectionError.prototype);

       
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }


}