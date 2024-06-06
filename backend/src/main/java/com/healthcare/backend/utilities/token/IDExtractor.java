package com.healthcare.backend.utilities.token;

import org.springframework.security.core.context.SecurityContextHolder;

public class IDExtractor {
    public static String getUserID() {
        return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
    }
}
