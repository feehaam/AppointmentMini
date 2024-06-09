package com.healthcare.backend.controller;

import com.healthcare.backend.entity.Appointment;
import com.healthcare.backend.service.AppointmentService;
import com.healthcare.backend.utilities.token.IDExtractor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;
    @PostMapping("/request/{doctorId}/{type}")
    public ResponseEntity<String> request(@PathVariable("doctorId") String doctorId, @PathVariable("type") int type) {
        appointmentService.createAppointment(doctorId, type);
        return ResponseEntity.ok("Appointment booked");
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointment(){
        return ResponseEntity.ok(appointmentService.getAll());
    }

    @PutMapping("/approve/{appointmentId}")
    public ResponseEntity<String> approve(@PathVariable("appointmentId") String appointmentId, @RequestBody String dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dt = LocalDateTime.parse(dateTime, formatter);
        appointmentService.approveAppointment(appointmentId, dt);
        return ResponseEntity.ok("Approved");
    }
}
