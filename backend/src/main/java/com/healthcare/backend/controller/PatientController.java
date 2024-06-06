package com.healthcare.backend.controller;
import com.healthcare.backend.dto.PatientProfileUpdateDTO;
import com.healthcare.backend.dto.PatientRegisterDTO;
import com.healthcare.backend.entity.Patient;
import com.healthcare.backend.exception.ItemNotFoundException;
import com.healthcare.backend.service.PatientService;
import com.healthcare.backend.utilities.token.IDExtractor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerPatient(@RequestBody PatientRegisterDTO patientRegisterDTO) {
        patientService.register(patientRegisterDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Patient registered successfully");
    }

    @GetMapping("/{userId}/patient")
    public ResponseEntity<Patient> read(@PathVariable String userId) throws ItemNotFoundException {
        return ResponseEntity.ok(patientService.read(userId));
    }

    @PutMapping("/update-profile")
    public ResponseEntity<String> updatePatientProfile(@RequestBody PatientProfileUpdateDTO request) throws ItemNotFoundException {
        patientService.updatePatientProfile(IDExtractor.getUserID(), request);
        return ResponseEntity.ok("Patient profile updated successfully");
    }

    @GetMapping("/list")
    public ResponseEntity<List<Patient>> getAllPatients(){
        return ResponseEntity.ok(patientService.getAll());
    }
}
