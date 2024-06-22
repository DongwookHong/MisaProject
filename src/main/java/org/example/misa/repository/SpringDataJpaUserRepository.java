package org.example.misa.repository;

import org.example.misa.domain.StoreMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataJpaUserRepository extends JpaRepository<StoreMember, Long>, UserRepository {
}
