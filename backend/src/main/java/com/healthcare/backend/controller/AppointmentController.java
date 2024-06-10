package com.healthcare.backend.controller;

import com.healthcare.backend.entity.Appointment;
import com.healthcare.backend.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/{appointmentId}")
    public ResponseEntity<Appointment> appointmentById(@PathVariable("appointmentId") String appointmentId){
        return ResponseEntity.ok(appointmentService.getById(appointmentId));
    }

    @PutMapping("/approve/{appointmentId}")
    public ResponseEntity<String> approve(@PathVariable("appointmentId") String appointmentId, @RequestBody String dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dt = LocalDateTime.parse(dateTime, formatter);
        appointmentService.approveAppointment(appointmentId, dt);
        return ResponseEntity.ok("Approved");
    }

    @PostMapping("/chat/{appointmentId}/{type}")
    public ResponseEntity<String> sentToChat(@PathVariable("appointmentId") String appointmentId,
                                             @PathVariable("type") int type,
                                             @RequestBody Map<String, String> data) {
        appointmentService.sendToChat(appointmentId, type, data.get("text"));
        return ResponseEntity.ok("Sent");
    }
}
