package org.example.misa.repository;

import org.example.misa.domain.StoreHours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreHoursRepository extends JpaRepository<StoreHours, Long> {
//    public List<StoreHours> findByStoreId(Long storeId);
}
