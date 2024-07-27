package org.example.misa.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.misa.domain.StoreMember;
import org.example.misa.service.AdminService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
public class MisaAdminController {

    private final AdminService adminService; //관리자 페이지 접속 후 로그인 성공시 객체 생성

    public MisaAdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping(value = "/api/stores", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public String postStore(@RequestPart("storeMemberForm") StoreMemberForm storeMemberForm, @RequestPart("files") List<MultipartFile> files) throws IOException, JsonProcessingException {
        System.out.println("postStore");
        String storeName = adminService.join(storeMemberForm, files);
        return "new store: " + storeName;
    }

    @PutMapping(value = "/api/stores/{name}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public String updateStore(@PathVariable("name") String name, @RequestPart("storeMemberForm") StoreMemberForm storeMemberForm, @RequestPart("files") List<MultipartFile> files) {

        System.out.println("updateStore");
        String storeName = adminService.update(name, storeMemberForm, files);
        return "update store: " + storeName;
    }

    @DeleteMapping("/api/stores/{name}")
    public String deleteStore(@PathVariable("name") String name) {
        System.out.println("delete store");
        String storeName = adminService.delete(name);
        return "delete store: " + storeName;
    }
}
