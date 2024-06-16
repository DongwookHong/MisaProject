package org.example.misa.repository;

import org.example.misa.domain.StoreMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.geom.Area;
import java.util.List;
import java.util.Optional;

public interface SpringDataJpaAdminRepository extends JpaRepository<StoreMember, Long>, AdminRepository {

    @Override
    Optional<StoreMember> findByStoreName(String storename);
}
