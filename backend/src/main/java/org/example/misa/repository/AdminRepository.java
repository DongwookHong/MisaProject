package org.example.misa.repository;

import org.example.misa.domain.StoreMember;

import java.awt.geom.Area;
import java.util.List;
import java.util.Optional;

public interface AdminRepository {
    StoreMember save(StoreMember storemember);
    Optional<StoreMember> findByStoreName(String storename);
    List<StoreMember> findAll();
}
