package com.healthcare.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor @RequiredArgsConstructor
public class AccountCreateDTO {
    private String userId;
    private String email;
    private String password;
}
