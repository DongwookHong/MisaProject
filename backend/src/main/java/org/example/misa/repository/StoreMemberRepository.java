package org.example.misa.repository;

import org.example.misa.domain.StoreMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreMemberRepository extends JpaRepository<StoreMember, Long> {
    StoreMember findByStoreName(String storeName);

}
