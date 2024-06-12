package com.healthcare.backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
@Entity @ToString
public class Appointment {
    @Id
    private String appointmentId;
    private LocalDateTime dateTime;
    private int type;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Chat> chats;
    private String doctorId;
    private String patientId;
    private String url;
    private int status;
}
