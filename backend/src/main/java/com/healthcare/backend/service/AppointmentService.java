package com.healthcare.backend.service;

import com.healthcare.backend.entity.Appointment;
import com.healthcare.backend.exception.ItemNotFoundException;
import com.healthcare.backend.repository.AppointmentRepository;
import com.healthcare.backend.utilities.token.IDExtractor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository repository;

    public void createAppointment(String doctorId, int type){
        Appointment appointment = Appointment.builder()
                .appointmentId(getId(doctorId))
                .type(type)
                .dateTime(LocalDateTime.now())
                .status(0)
                .doctorId(doctorId)
                .patientId(IDExtractor.getUserID())
                .chats(new ArrayList<>())
                .build();
        repository.save(appointment);
    }

    public void approveAppointment(String appointmentId, LocalDateTime localDateTime) {
        Appointment appointment = repository.findById(appointmentId)
                .orElseThrow(() -> new ItemNotFoundException("appointment", appointmentId));
        appointment.setStatus(1);
        appointment.setDateTime(localDateTime);
    }
    private String getId(String doctorId) {
        String prefix = doctorId + IDExtractor.getUserID();
        long count = repository.countByAppointmentIdStartingWith(prefix) + 1;
        return prefix + String.valueOf(count);
    }

    public List<Appointment> getAll() {
        String userId = IDExtractor.getUserID();
        if (userId.startsWith("D")) return repository.findAll().stream()
                .filter(appointment -> appointment.getDoctorId().equals(userId))
                .collect(Collectors.toList());
        else return repository.findAll().stream()
                .filter(appointment -> appointment.getPatientId().equals(userId))
                .collect(Collectors.toList());
    }
}
