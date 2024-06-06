package com.healthcare.backend.dto;
import lombok.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class PatientProfileUpdateDTO {
    private String firstName;
    private String lastName;
    private String gender;
    private int age;
    private int height;
    private int weight;
    private String bloodGroup;
    private String occupation;
    private String phoneNo;
    private String residence;
}
