package com.healthcare.backend.repository;

import com.healthcare.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, String> {
    long countByAppointmentIdStartingWith(String idPattern);
}
