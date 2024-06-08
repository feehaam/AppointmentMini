package com.healthcare.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Doctor {
    @Id
    @NotNull(message = "User ID cannot be null")
    private String userId;

    @NotBlank(message = "First name cannot be blank")
    @Size(min = 2, message = "First name must have at least 2 characters")
    private String firstName;

    @NotBlank(message = "Last name cannot be blank")
    @Size(min = 2, message = "Last name must have at least 2 characters")
    private String lastName;

    @NotNull(message = "Gender cannot be null")
    private String gender;

    @Size(min = 10, max = 1000, message = "Bio must be between 10 and 1000 characters")
    private String bio;

    @NotNull(message = "Experience cannot be null")
    private Integer experience;

    @NotNull(message = "Date of birth cannot be null")
    private String dateOfBirth;

    @NotNull(message = "Specializations cannot be null")
    private String specializations;

    @NotNull(message = "Phone number cannot be null")
    private String phoneNumber;

    @NotNull(message = "Residence cannot be null")
    private String residence;

    // Doctor Personal Info
    @OneToMany(cascade = CascadeType.ALL)
    private List<Qualification> qualifications;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Certification> certifications;
}
