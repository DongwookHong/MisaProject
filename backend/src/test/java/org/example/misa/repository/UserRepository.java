package org.example.misa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.misa.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
