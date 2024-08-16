package org.example.misa.service;

import jakarta.transaction.Transactional;
import org.example.misa.DTO.LoginDTO;
import org.example.misa.DTO.StoreDTO;
import org.example.misa.component.ImgUtils;
import org.example.misa.component.JwtUtils;
import org.example.misa.component.ValidationUtils;
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

    @Autowired private ValidationUtils validationUtils;
    @Autowired private ImgUtils imgUtils;
    @Autowired private StoreMemberRepository storeMemberRepository;
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

        Floor floor = validationUtils.validateExistFloorAndBuilding(form.getFloor(), form.getBuildingName(), form.getBuildingDong());
        Block block = validationUtils.validateDuplicateBlockId(Long.parseLong(form.getBlockId()), floor);

        StoreMember storeMember = storeMemberRepository.findByStoreName("test")
                .orElseThrow(()-> new IllegalStateException("Store does not exist"));

//        storeMember.update(form);
//        storeMember.setBlock(block);
//
//        if (!files.isEmpty()) {
//            imgService.deleteImg(imgUtils.convertToImagePaths(storeMember.getImgPaths()));
//            imgUtils.saveImgPaths(files, storeMember);
//        }
//
//        try {
//            storeMember = storeMemberRepository.save(storeMember);
//        } catch (Exception e) {
//            imgService.deleteImg(imgUtils.convertToImagePaths(storeMember.getImgPaths()));
//            throw new IllegalStateException("Could not save storeMember", e);
//        }

    }
}