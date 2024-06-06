package com.healthcare.backend.controller;

import com.healthcare.backend.dto.LoginRequestDTO;
import com.healthcare.backend.dto.LoginResponseDTO;
import com.healthcare.backend.exception.CustomException;
import com.healthcare.backend.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/access") @RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    // Handles user login requests.
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) throws CustomException {
        return ResponseEntity.ok(accountService.login(loginRequestDTO));
    }
}
