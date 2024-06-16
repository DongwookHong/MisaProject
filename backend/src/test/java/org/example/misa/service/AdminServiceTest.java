package org.example.misa.service;

import org.example.misa.controller.StoreMemberForm;
import org.example.misa.domain.StoreMember;
import org.example.misa.repository.AdminRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class AdminServiceTest {

    @Autowired AdminRepository adminRepository;
    @Autowired AdminService adminService;


    List<String> urlList = new ArrayList<>();
    List<MultipartFile> fileList = new ArrayList<>();

    @Test
    void 상점등록() {
        //given
//        StoreMemberForm form = new StoreMemberForm();
//        form.setStoreName("Hello");
//        form.setFiles(fileList);
        StoreMember storeMember = new StoreMember();
        storeMember.setStoreName("hello");
        storeMember.setImgPaths(adminService.makeImgPaths(urlList));
        try {
            adminRepository.save(storeMember);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        //when
//        adminService.joinStoreMember(form);
        //then
//        StoreMember findMember = adminService.findStoreMemberById(saveId).get();
//        assertThat(storeMember.getStoreName()).isEqualTo(findMember.getStoreName());
    }


    @Test
    void 모든상점조회() {
    }

    @Test
    void findStoreMemberById() {
    }
}