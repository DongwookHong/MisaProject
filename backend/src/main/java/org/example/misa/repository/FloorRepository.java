package org.example.misa.repository;

import org.example.misa.domain.Floor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FloorRepository extends JpaRepository<Floor, String> {
    Optional<Floor> findByFloorAndBuildingNameAndBuildingDong(String floor, String buildingName, String buildingDong);
}
