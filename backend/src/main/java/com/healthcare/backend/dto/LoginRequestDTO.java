package com.healthcare.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class LoginRequestDTO {
    private String identity;
    private String password;
    private Integer otp;
    private String deviceCode;
}
