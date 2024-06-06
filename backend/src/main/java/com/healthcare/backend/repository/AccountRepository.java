package com.healthcare.backend.repository;

import com.healthcare.backend.entity.Account;
import com.healthcare.backend.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByEmail(String email);
    Page<Account> findByRole(Role role, Pageable pageable);
}
