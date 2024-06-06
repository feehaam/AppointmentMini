package com.healthcare.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

@Validated
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Entity
public class Account {
    @Id
    private String userId;
    // User info
    @Email(message = "Please provide a valid email address")
    private String email;
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;
    @Enumerated
    private Role role;
}
