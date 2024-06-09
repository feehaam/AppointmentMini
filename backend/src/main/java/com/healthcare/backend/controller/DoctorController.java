package com.healthcare.backend.controller;

import com.healthcare.backend.dto.CreateDoctorAccountDTO;
import com.healthcare.backend.dto.UpdateDoctorProfileDTO;
import com.healthcare.backend.entity.Doctor;
import com.healthcare.backend.exception.AccessMismatchException;
import com.healthcare.backend.exception.ItemNotFoundException;
import com.healthcare.backend.service.DoctorService;
import com.healthcare.backend.utilities.token.IDExtractor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequiredArgsConstructor
@RequestMapping("/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    @PostMapping("/register")
    public ResponseEntity<String> registerDoctor(@RequestBody CreateDoctorAccountDTO createDoctorAccountDTO) {
        doctorService.register(createDoctorAccountDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Doctor registered successfully");
    }

    @PutMapping("/edit-profile")
    public ResponseEntity<String> updateDoctorProfile(@RequestBody UpdateDoctorProfileDTO updateDoctorProfileDTO)
            throws AccessMismatchException, ItemNotFoundException {
        doctorService.update(IDExtractor.getUserID(), updateDoctorProfileDTO);
        return ResponseEntity.ok("Doctor profile updated successfully");
    }

    @GetMapping("/{userId}/profile-info")
    public ResponseEntity<Doctor> getProfileInfo(@PathVariable("userId") String userId) throws ItemNotFoundException {
        Doctor profileInfo = doctorService.readDoctorProfileInfo(userId);
        return ResponseEntity.ok(profileInfo);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.readAll());
    }
}
