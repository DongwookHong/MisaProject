package org.example.misa.repository;

import org.example.misa.DTO.StoreDTO;
import org.example.misa.domain.StoreMember;

import java.util.List;
import java.util.Optional;

//조회만 가능한 user용 repo
public interface UserRepository {
    Optional<StoreMember> findByStoreName(String storename);
    List<StoreMember> findAll();
}
