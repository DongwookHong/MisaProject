package org.example.misa.repository;

import org.example.misa.domain.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByUsername(String username);
}
