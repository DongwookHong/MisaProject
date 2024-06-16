package org.example.misa.service;

import org.example.misa.controller.StoreMemberForm;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ServerImgServiceTest {
    @Autowired
    private ImgService imageService;

    @Test
    void upload() {
        List<MultipartFile> files = new ArrayList<>();
        imageService.upload(files);
    }

    @Test
    void uploadImg() {
    }

    @Test
    void validateImgExtension() {
    }

    @Test
    void uploadImgToDB() {
    }

    @Test
    void deleteImg() {
    }
}