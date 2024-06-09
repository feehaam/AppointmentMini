package com.healthcare.backend.exception;

import org.springframework.http.HttpStatus;

public class LocalFileHandlingException extends CustomException{
    public LocalFileHandlingException(String message) {
        super("LocalFileHandlingException", "file", message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
