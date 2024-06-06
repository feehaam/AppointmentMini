package com.healthcare.backend.exception;

import org.springframework.http.HttpStatus;

public class ItemNotFoundException extends CustomException{
    public ItemNotFoundException(String entityName, String entityId) {
        super("ItemNotFoundException",
                "A record of " + entityName + " with ID " + entityId + " was not found!", "entity",
                HttpStatus.NOT_FOUND);
    }
}
