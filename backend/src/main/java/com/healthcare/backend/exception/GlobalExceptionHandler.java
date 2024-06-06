package com.healthcare.backend.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

// This class serves as a global exception handler for handling various types of exceptions
// that may occur during API operations.
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({NullPointerException.class})
    public ResponseEntity<ErrorResponse> handleDatabaseExceptions(Exception e, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                e.getClass().getSimpleName(),
                "An error occurred while performing a database operation",
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                new Date(),
                request.getRequestURI()
        );
        // Return an HTTP response with a status code indicating an internal server error.
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

    // Exception handler for handling IllegalArgumentException.
    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(Exception e, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                e.getClass().getSimpleName(),
                "Invalid argument provided",
                HttpStatus.BAD_REQUEST.toString(),
                new Date(),
                request.getRequestURI()
        );
        // Return an HTTP response with a status code indicating a bad request.
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    // Exception handler for handling validation
    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<ErrorResponse> handleValidationException(Exception e, HttpServletRequest request) {
        Set<ConstraintViolation<?>> violations = ((ConstraintViolationException) e).getConstraintViolations();

        String errorMessage = violations.stream()
                .map(violation -> String.format("%s", violation.getMessage()))
                .collect(Collectors.joining(", "));

        ErrorResponse errorResponse = new ErrorResponse(
                e.getClass().getSimpleName(),
                errorMessage,
                HttpStatus.BAD_REQUEST.toString(),
                new Date(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    // Exception handler for handling All custom exceptions.
    @ExceptionHandler({CustomException.class})
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException e, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                e.getExceptionName(),
                e.getMessage(),
                e.getHttpStatus().toString(),
                new Date(),
                request.getRequestURI()
        );
        // Return an HTTP response with a status code indicating a forbidden request.
        return ResponseEntity.status(e.getHttpStatus()).body(errorResponse);
    }
}
