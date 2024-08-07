package org.example.misa.service;

import jakarta.transaction.Transactional;
import org.example.misa.DTO.LoginDTO;
import org.example.misa.DTO.StoreDTO;
import org.example.misa.component.JwtUtils;
import org.example.misa.controller.StoreMemberForm;
import org.example.misa.domain.Block;
import org.example.misa.domain.Floor;
import org.example.misa.domain.ImgPath;
import org.example.misa.domain.StoreMember;
import org.example.misa.repository.BlockRepository;
import org.example.misa.repository.FloorRepository;
import org.example.misa.repository.StoreMemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class AdminServiceTest {

    @Autowired private JwtUtils jwtUtils;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private StoreMemberRepository storeMemberRepository;
    @Autowired private FloorRepository floorRepository;
    @Autowired private BlockRepository blockRepository;
    @Autowired private ImgService imgService;

    @Test
    void update() {
        //given
        List<StoreDTO.StoreHoursData> storeHoursData = new ArrayList<>();
        for (int i = 0; i < 7; i++)
        {
            storeHoursData.add(new StoreDTO.StoreHoursData("test", true, "test", "test", "test", "test", "test"));
        }
        List<MultipartFile> files = new ArrayList<>();
        files.add(new MockMultipartFile("file", "test.jpg", "image/jpeg", "test".getBytes()));
        StoreMemberForm form = new StoreMemberForm();
        form.setBlockId("999999");
        form.setStoreName("test");
        form.setInfo("test");
        form.setBuildingDong("A");
        form.setBuildingName("힐스테이트");
        form.setFloor("1");
        form.setStoreHours(storeHoursData);

        Floor floor = validateExistFloorAndBuilding(form.getFloor(), form.getBuildingName(), form.getBuildingDong());
        Block block = validateDuplicateBlockId(Long.parseLong(form.getBlockId()), floor);

        StoreMember storeMember = storeMemberRepository.findByStoreName("test");

        storeMember.update(form);
        storeMember.setBlock(block);

        if (!files.isEmpty()) {
            imgService.deleteImg(convertToImagePaths(storeMember.getImgPaths()));
            saveImgPaths(files, storeMember);
        }

        try {
            storeMember = storeMemberRepository.save(storeMember);
        } catch (Exception e) {
            imgService.deleteImg(convertToImagePaths(storeMember.getImgPaths()));
            throw new IllegalStateException("Could not save storeMember", e);
        }

    }

    private Floor validateExistFloorAndBuilding(String floorName, String buildingName, String buildingDong) {
        Floor floor = floorRepository.findByFloorAndBuildingNameAndBuildingDong(floorName,buildingName, buildingDong);

        if (floor == null) {
            throw new IllegalStateException("해당 건물 혹은 층이 존재하지 않습니다.");
        }

        return floor;
    }

    private Block validateDuplicateBlockId(Long area, Floor floor) {
        Block block = blockRepository.findByAreaAndFloorId(area, floor.getId());

        if (block == null) {
            block = new Block(floor, area, "store");
            try {
                block = blockRepository.save(block);
            } catch (Exception e) {
                throw new IllegalStateException("Failed to add block", e);
            }
        }

        return block;
    }

    private void validateDuplicateStoreMember(StoreMember storeMember) {
        storeMember = storeMemberRepository.findByStoreName(storeMember.getStoreName());
        if (storeMember != null) {
            throw new IllegalStateException("이미 존재하는 상점입니다.");
        }
    }

    private void saveImgPaths(List<MultipartFile> files, StoreMember storeMember) {
        storeMember.setImgPaths(makeImgPaths(imgService.upload(files), storeMember));
    }

    public List<String> convertToImagePaths(List<ImgPath> imgPaths) {
        return imgPaths.stream()
                .map(ImgPath::getImgPath)  // StoreImage 객체의 imagePath 필드를 추출
                .collect(Collectors.toList()); // 리스트로 수집
    }

    public List<ImgPath> makeImgPaths(List<String> urlList, StoreMember storeMember) {
        List<ImgPath> imgPaths = new ArrayList<>();
        for (String url : urlList) {
            ImgPath imgPath = ImgPath.create(storeMember, url);
            imgPaths.add(imgPath);
        }
        return imgPaths;
    }
}