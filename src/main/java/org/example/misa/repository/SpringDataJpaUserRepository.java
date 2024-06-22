package org.example.misa.repository;

import org.example.misa.DTO.StoreDTO;
import org.example.misa.domain.StoreMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SpringDataJpaUserRepository extends JpaRepository<StoreMember, Long>, UserRepository {

    @Override
    Optional<StoreMember> findByStoreName(String storename);


}
