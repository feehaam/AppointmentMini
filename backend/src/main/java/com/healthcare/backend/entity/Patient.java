package com.healthcare.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;

import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Patient {
    @Id
    private String userId;

    // Patient bio properties
    @NotBlank(message = "First name cannot be blank")
    @Size(min = 2, message = "First name must be at least 2 characters long.")
    private String firstName;

    @NotBlank(message = "Last name cannot be blank")
    @Size(min = 2, message = "Last name must be at least 2 characters long.")
    private String lastName;

    private String phone;

    private String address;
    @NotBlank(message = "Gender cannot be blank")
    private String gender;
    private String bloodGroup;

    // Patient health-related properties
    private int weight;
    private int age;
    private int height;
    private String occupation;
}
