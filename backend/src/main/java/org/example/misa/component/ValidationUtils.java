package org.example.misa.component;

import org.example.misa.domain.Block;
import org.example.misa.domain.Floor;
import org.example.misa.repository.BlockRepository;
import org.example.misa.repository.FloorRepository;
import org.example.misa.repository.StoreMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public final class ValidationUtils {
    @Autowired private FloorRepository floorRepository;
    @Autowired private BlockRepository blockRepository;
    @Autowired private StoreMemberRepository storeMemberRepository;

    public Floor validateExistFloorAndBuilding(String floorName, String buildingName, String buildingDong) {

        return floorRepository.findByFloorAndBuildingNameAndBuildingDong(floorName, buildingName, buildingDong)
                .orElseThrow(()->new IllegalStateException("해당 건물 혹은 층이 존재하지 않습니다."));

    }

    public Block validateDuplicateBlockId(Long area, Floor floor) {

        Block block = blockRepository.findByAreaAndFloorId(area, floor.getId())
                .orElseGet(()-> new Block(floor, area, "store"));

        try {
            block = blockRepository.save(block);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to add block", e);
        }

        return block;
    }

    public void validateDuplicateStoreMember(String storeName) {

        storeMemberRepository.findByStoreName(storeName).orElseThrow(()->new IllegalStateException("이미 존재하는 상점입니다."));

    }
}
