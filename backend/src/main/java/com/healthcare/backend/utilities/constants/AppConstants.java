package com.healthcare.backend.utilities.constants;

public class AppConstants {
    public static final String TOKEN_SECRET = "PAKHI_PAKA_PEPE_KHAY";
    // Setting for 30 days.
    public static final long TOKEN_EXPIRATION_TIME = 1000L * 60L * 60L * 24L * 30L;
    // Setting for 10 years.
    public static final long INTERNAL_TOKEN_EXPIRATION_TIME = 1000L * 60L * 60L * 24L * 365L * 10L;
    public static final String TOKEN_HEADER_STRING = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final Integer MAX_LOGIN_ATTEMPTS_LIMIT = 3;
    public static final String TOKEN_ALPHABETS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    public static final String EMAIL_URL = "http://localhost:5300/v1/email/send";
    public static final String DEVICE_INFO_URL = "http://localhost:7600/preferences/device";
    public static final String INTERNAL_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJTlRFUk5BTCIsInJvbGVzIjpbIlJPTEVfSU5URVJOQUwiXSwiZXhwIjoyMDE1MjE2Mzg0fQ.GpRoQRcjHJjk6DHaT-qpV0dkvJF_7GGsiaq6pTmc_Fk";
    // APIs
    public static final String SIGN_IN = "/access/login";
    public static final String SIGN_UP = "/account/create-account";
}
