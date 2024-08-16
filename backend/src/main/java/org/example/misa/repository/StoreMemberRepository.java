package org.example.misa.repository;

import org.example.misa.domain.StoreMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreMemberRepository extends JpaRepository<StoreMember, Long> {
    Optional<StoreMember> findByStoreName(String storeName);
}
