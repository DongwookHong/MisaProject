package org.example.misa.service;

import org.example.misa.controller.StoreMemberForm;
import org.example.misa.domain.Block;
import org.example.misa.domain.Floor;
import org.example.misa.domain.ImgPath;
import org.example.misa.domain.StoreMember;
import org.example.misa.repository.BlockRepository;
import org.example.misa.repository.FloorRepository;
import org.example.misa.repository.StoreMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminService {

    @Autowired private StoreMemberRepository storeMemberRepository;
    @Autowired private FloorRepository floorRepository;
    @Autowired private BlockRepository blockRepository;
    @Autowired private ImgService imgService;

    public Long join(StoreMemberForm form) {
        Floor floor = validateExistFloorAndBuilding(form.getFloor(), form.getBuildingName(), form.getBuildingDong());
        validateDuplicateBlockId(Long.parseLong(form.getBlockId()), floor);
        Block block = new Block(floor, Long.parseLong(form.getBlockId()), "store");
        try {
            block = blockRepository.save(block);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to add block", e);
        }

        StoreMember storeMember = StoreMember.create(form);
        validateDuplicateStoreMember(storeMember);
        storeMember.setBlock(block);
        saveImgPaths(form, storeMember);

        try {
            storeMember = storeMemberRepository.save(storeMember);
        } catch (Exception e) {
            imgService.deleteImg(convertToImagePaths(storeMember.getImgPaths()));
            throw new IllegalStateException("Could not save storeMember", e);
        }
        return storeMember.getId();
    }

    private Floor validateExistFloorAndBuilding(String floorName, String buildingName, String buildingDong) {
        Floor floor = floorRepository.findByFloorAndBuildingNameAndBuildingDong(floorName,buildingName, buildingDong);

        if (floor == null) {
            throw new IllegalStateException("해당 건물 혹은 층이 존재하지 않습니다.");
        }

        return floor;
    }

    private void validateDuplicateBlockId(Long area, Floor floor) {
        Block block = blockRepository.findByAreaAndFloorId(area, floor.getId());

        if (block != null) {
            throw new IllegalStateException("이미 등록된 구역 이름입니다.");
        }

    }

    private void validateDuplicateStoreMember(StoreMember storeMember) {
        storeMember = storeMemberRepository.findByStoreName(storeMember.getStoreName());
        if (storeMember != null) {
            throw new IllegalStateException("이미 존재하는 상점입니다.");
        }
    }

    private void saveImgPaths(StoreMemberForm form, StoreMember storeMember) {
        storeMember.setImgPaths(makeImgPaths(imgService.upload(form.getFiles()), storeMember));
    }

    public List<String> convertToImagePaths(List<ImgPath> imgPaths) {
        return imgPaths.stream()
                .map(ImgPath::getImgPath)  // StoreImage 객체의 imagePath 필드를 추출
                .collect(Collectors.toList()); // 리스트로 수집
    }

    public List<ImgPath> makeImgPaths(List<String> urlList, StoreMember storeMember) {
        List<ImgPath> imgPaths = new ArrayList<>();
        for (String url : urlList) {
            imgPaths.add(ImgPath.create(storeMember, url));
        }
        return imgPaths;
    }

    public List<StoreMember> findStoreMembers() {
        return storeMemberRepository.findAll();
    }
    public StoreMember findStoreMember(String storeName) {
        return storeMemberRepository.findByStoreName(storeName);
    }

}
