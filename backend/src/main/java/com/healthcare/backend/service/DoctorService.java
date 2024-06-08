package com.healthcare.backend.service;

import com.healthcare.backend.dto.AccountCreateDTO;
import com.healthcare.backend.dto.CreateDoctorAccountDTO;
import com.healthcare.backend.dto.ReadDoctorProfileDTO;
import com.healthcare.backend.dto.UpdateDoctorProfileDTO;
import com.healthcare.backend.entity.Certification;
import com.healthcare.backend.entity.Doctor;
import com.healthcare.backend.entity.Qualification;
import com.healthcare.backend.exception.AccessMismatchException;
import com.healthcare.backend.exception.ItemNotFoundException;
import com.healthcare.backend.repository.DoctorRepository;
import com.healthcare.backend.utilities.token.IDExtractor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final AccountService accountService;

    public void register(CreateDoctorAccountDTO createDoctorAccountDTO) {

        Doctor doctor = new Doctor();
        String id = getId(createDoctorAccountDTO.getFirstName(), createDoctorAccountDTO.getLastName());
        doctor.setUserId(id);

        // Mapping fields from DTO to Doctor entity
        doctor.setFirstName(createDoctorAccountDTO.getFirstName());
        doctor.setLastName(createDoctorAccountDTO.getLastName());
        doctor.setGender(createDoctorAccountDTO.getGender());
        doctor.setBio(createDoctorAccountDTO.getBio());
        doctor.setExperience(createDoctorAccountDTO.getExperience());
        doctor.setSpecializations(createDoctorAccountDTO.getSpecialization());
        doctor.setPhoneNumber(createDoctorAccountDTO.getPhoneNumber());
        doctor.setResidence(createDoctorAccountDTO.getResidence());
        doctor.setDateOfBirth(createDoctorAccountDTO.getDateOfBirth());

        List<Qualification> qualifications = createDoctorAccountDTO.getQualifications();
        List<Certification> certifications = createDoctorAccountDTO.getCertifications();

        doctor.setQualifications(qualifications);
        doctor.setCertifications(certifications);

        AccountCreateDTO account = new AccountCreateDTO();
        account.setUserId(id);
        account.setEmail(createDoctorAccountDTO.getEmail());
        account.setPassword(createDoctorAccountDTO.getPassword());
        accountService.createAccount(account);

        doctorRepository.save(doctor);
    }

    private String getId(String firstName, String lastName) {
        // Generate the initial ID pattern using the first letters of the first and last name
        String idPattern = "D" + firstName.toUpperCase().charAt(0) + lastName.toUpperCase().charAt(0);
        long count = doctorRepository.countByUserIdStartingWith(idPattern) + 1;
        return  idPattern + count;
    }

    public Doctor readDoctorProfileInfo(String userId) throws ItemNotFoundException {
        return doctorRepository.findById(userId)
                .orElseThrow(() -> new ItemNotFoundException("Doctor", userId));
    }

    public void update(String userId, UpdateDoctorProfileDTO updateDoctorProfileDTO) throws AccessMismatchException, ItemNotFoundException {
        Doctor doctor = doctorRepository.findById(userId)
                .orElseThrow(() -> new ItemNotFoundException("Doctor", userId));

        if(!userId.equals(IDExtractor.getUserID())) throw new AccessMismatchException("You don't have permission to edit others' profile info.");

        // Update doctor fields based on the DTO
        doctor.setFirstName(updateDoctorProfileDTO.getFirstName());
        doctor.setLastName(updateDoctorProfileDTO.getLastName());
        doctor.setPhoneNumber(updateDoctorProfileDTO.getPhoneNumber());
        doctor.setSpecializations(updateDoctorProfileDTO.getSpecialization());
        doctor.setResidence(updateDoctorProfileDTO.getResidence());
        doctor.setBio(updateDoctorProfileDTO.getBio());
        doctor.setExperience(updateDoctorProfileDTO.getExperience());
        doctor.getQualifications().clear();
        doctor.getCertifications().clear();
        doctor.getQualifications().addAll(updateDoctorProfileDTO.getQualifications());
        doctor.getCertifications().addAll(updateDoctorProfileDTO.getCertifications());

        doctorRepository.save(doctor);
    }

    public List<Doctor> readAll() {
        return doctorRepository.findAll();
    }

    private ReadDoctorProfileDTO doctorToDoctorDTO(Doctor doctor) {
        ReadDoctorProfileDTO profileDTO = new ReadDoctorProfileDTO();

        // Mapping fields from Doctor entity to ReadDoctorProfileDTO
        profileDTO.setDoctorId(doctor.getUserId());
        profileDTO.setFirstName(doctor.getFirstName());
        profileDTO.setLastName(doctor.getLastName());
        profileDTO.setEmail(accountService.findByIdentity(doctor.getUserId()).getEmail());
        profileDTO.setGender(doctor.getGender());
        profileDTO.setBio(doctor.getBio());
        profileDTO.setExperience(doctor.getExperience());
        profileDTO.setSpecializations(doctor.getSpecializations());
        profileDTO.setQualifications(doctor.getQualifications());
        profileDTO.setCertifications(doctor.getCertifications());
        profileDTO.setDateOfBirth(doctor.getDateOfBirth());
        profileDTO.setDateOfBirth(doctor.getDateOfBirth());

        return profileDTO;
    }
}
