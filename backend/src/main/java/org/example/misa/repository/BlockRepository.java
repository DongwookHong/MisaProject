package org.example.misa.repository;

import org.example.misa.domain.Block;
import org.example.misa.domain.Floor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlockRepository extends JpaRepository<Block, Long> {
    Optional<Block> findByAreaAndFloorId(Long area, Long floorId);
}
