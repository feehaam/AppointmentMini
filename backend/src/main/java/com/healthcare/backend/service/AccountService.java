package com.healthcare.backend.service;

import com.healthcare.backend.dto.AccountCreateDTO;
import com.healthcare.backend.dto.LoginRequestDTO;
import com.healthcare.backend.dto.LoginResponseDTO;
import com.healthcare.backend.entity.Account;
import com.healthcare.backend.entity.Role;
import com.healthcare.backend.exception.AccountNotFoundException;
import com.healthcare.backend.exception.CustomException;
import com.healthcare.backend.exception.DuplicateEntityException;
import com.healthcare.backend.exception.PasswordMismatchException;
import com.healthcare.backend.repository.AccountRepository;
import com.healthcare.backend.utilities.token.JWTUtils;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service @RequiredArgsConstructor
public class AccountService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;

    public Account findByIdentity(String identity) {
        Optional<Account> accountOp = accountRepository.findByEmail(identity);
        if (accountOp.isEmpty()) accountOp = accountRepository.findById(identity);
        if (accountOp.isEmpty()) throw new AccountNotFoundException(identity);
        return accountOp.get();
    }

    public LoginResponseDTO login(LoginRequestDTO loginDTO) throws CustomException {
        Account account = findByIdentity(loginDTO.getIdentity());

        // Check if the provided password matches the stored password.
        if (!passwordEncoder.matches(loginDTO.getPassword(), account.getPassword())) {
            throw new PasswordMismatchException();
        }

        // Generate and return the login response.
        return generateLoginResponse(account, loginDTO.getDeviceCode());
    }

    // Generates a login response with a JWT token.
    private LoginResponseDTO generateLoginResponse(Account account, String deviceCode) {
        LoginResponseDTO response = new LoginResponseDTO();
        response.setEmail(account.getEmail());
        response.setUserId(account.getUserId());
        response.setRole(account.getRole().toString());

        // Generate JWT token.
        List<String> roles = Collections.singletonList("ROLE_" + account.getRole().toString());
        String token = JWTUtils.generateToken(account.getUserId(), roles);
        response.setBearerToken(token);
        return response;
    }

    // Loads user details for Spring Security.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = findByIdentity(username);
        List<GrantedAuthority> roles = Collections.singletonList(new SimpleGrantedAuthority(account.getRole().toString()));
        return new User(account.getUserId(),
                account.getPassword(),
                true,
                true,
                true,
                false,
                roles);
    }

    // Creates a new account and saves it to the database.
    public void createAccount(AccountCreateDTO accountCreateDTO) throws DuplicateEntityException {
        // Check if the email already exists to prevent duplicates
        if (accountRepository.findByEmail(accountCreateDTO.getEmail()).isPresent()) {
            throw new DuplicateEntityException("Account", "email", accountCreateDTO.getEmail());
        }

        // Create a new account entity and save it to the database
        Account newAccount = new Account();
        newAccount.setUserId(accountCreateDTO.getUserId());
        newAccount.setEmail(accountCreateDTO.getEmail());
        newAccount.setPassword(passwordEncoder.encode(accountCreateDTO.getPassword()));

        // Validate and set the role
        if (newAccount.getUserId().startsWith("P")) newAccount.setRole(Role.PATIENT);
        else if (newAccount.getUserId().startsWith("D")) newAccount.setRole(Role.DOCTOR);
        else if (newAccount.getUserId().startsWith("A")) newAccount.setRole(Role.ADMIN);
        else throw new CustomException("ItemNotFoundException", "Account", "Given role doesn't exist!", HttpStatus.NOT_FOUND);

        accountRepository.save(newAccount);
    }
}
