// src/common/filters/all-exceptions.filter.ts
import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const status = exception?.status || 500; // Default to 500 if no status is provided

    // Log error details for debugging
    console.error('Error Message:', exception?.message);
    console.error('Error Stack:', exception?.stack);
    console.error('Request Path:', request?.url);

    // Send a detailed error response
    response.status(status).json({
      statusCode: status,
      message: exception?.message || 'Internal server error',
      error: exception?.response || 'Unknown error',
      stack: exception?.stack, // Include stack trace for debugging
    });
  }
}
