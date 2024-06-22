package org.example.misa.repository;

import org.example.misa.domain.Floor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FloorRepository extends JpaRepository<Floor, String> {
    public Floor findByFloorAndBuildingName(String floor, String buildingName);
}
