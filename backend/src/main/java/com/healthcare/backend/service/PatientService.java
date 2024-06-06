package com.healthcare.backend.service;
import com.healthcare.backend.dto.AccountCreateDTO;
import com.healthcare.backend.dto.PatientProfileUpdateDTO;
import com.healthcare.backend.dto.PatientRegisterDTO;
import com.healthcare.backend.entity.Patient;
import com.healthcare.backend.exception.ItemNotFoundException;
import com.healthcare.backend.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final AccountService accountService;

    public void register(PatientRegisterDTO patientRegisterDTO)  {

        String id = getId(patientRegisterDTO.getFirstName(), patientRegisterDTO.getLastName());
        Patient patient = new Patient();
        patient.setUserId(id);

        patient.setFirstName(patientRegisterDTO.getFirstName());
        patient.setLastName(patientRegisterDTO.getLastName());
        patient.setAge(patientRegisterDTO.getAge());
        patient.setGender(patientRegisterDTO.getGender());

        AccountCreateDTO account = new AccountCreateDTO();
        account.setUserId(id);
        account.setEmail(patientRegisterDTO.getEmail());
        account.setPassword(patientRegisterDTO.getPassword());
        accountService.createAccount(account);

        patientRepository.save(patient);
    }

    private String getId(String firstName, String lastName) {
        // Generate the initial ID pattern using the first letters of the first and last name
        String idPattern = "P" + firstName.toUpperCase().charAt(0) + lastName.toUpperCase().charAt(0);
        long count = patientRepository.countByUserIdStartingWith(idPattern) + 1;
        return  idPattern + count;
    }

    public Patient read(String userId) throws ItemNotFoundException {
        return patientRepository.findById(userId)
                .orElseThrow(() -> new ItemNotFoundException("patient", userId));
    }

    private String boolToString(boolean status){
        return status ? "Yes" : "No";
    }

    public void updatePatientProfile(String userId, PatientProfileUpdateDTO request) throws ItemNotFoundException {
        Patient patient = patientRepository.findById(userId)
                .orElseThrow(() -> new ItemNotFoundException("patient", userId));

        // Update properties from the request DTO
        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());
        patient.setGender(request.getGender());
        patient.setAge(request.getAge());
        patient.setHeight(request.getHeight());
        patient.setWeight(request.getWeight());
        patient.setBloodGroup(request.getBloodGroup());
        patient.setOccupation(request.getOccupation());
        patient.setPhone(request.getPhoneNo());
        patient.setAddress(request.getResidence());

        patientRepository.save(patient);
    }

    public List<Patient> getAll() {
        return patientRepository.findAll();
    }
}