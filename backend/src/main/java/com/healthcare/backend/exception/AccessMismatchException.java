package com.healthcare.backend.exception;

import org.springframework.http.HttpStatus;

public class AccessMismatchException extends CustomException{
    public AccessMismatchException(String message){
        super("AccessMismatchException", "access", message, HttpStatus.BAD_REQUEST);
    }

    public AccessMismatchException(String message, HttpStatus status){
        super("AccessMismatchException", "access", message, status);
    }
}
