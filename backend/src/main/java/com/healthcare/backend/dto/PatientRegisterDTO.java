package com.healthcare.backend.dto;
import lombok.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class PatientRegisterDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private String password;
    private int age;
}

