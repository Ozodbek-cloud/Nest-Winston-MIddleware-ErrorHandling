import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { logger } from "./logger";

@Catch(HttpException)
export class ErrorHandler implements ExceptionFilter {
    catch(exception:HttpException, host: ArgumentsHost) {
        let context = host.switchToHttp()
        let req = context.getRequest()
        let res = context.getResponse()
        let status = exception.getStatus()
        let message = exception.message

        logger.error(`${req.url}__${req.method}`)

        res.status(status).json({
            status: status,
            path: req.url,
            timestamp: new Date().toISOString()
        })
    }
}