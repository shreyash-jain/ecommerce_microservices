import { CustomError } from './custom-error';


export class NotAutherizedError extends CustomError {
    constructor() {
        super();

        //only because we are extending

        Object.setPrototypeOf(this, NotAutherizedError.prototype);


    }

    serializeErrors() {
        return [
            { message: 'not autherized' }
        ];
    }

    statusCode = 401;

}
