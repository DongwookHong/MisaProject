package org.example.misa.controller;

import org.example.misa.domain.StoreMember;
import org.example.misa.service.AdminService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Optional;

@Controller
public class MisaAdminController {

    private final AdminService adminService; //관리자 페이지 접속 후 로그인 성공시 객체 생성

    public MisaAdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/admin")
    public String home() {
        return "admin/home";
    }

    @GetMapping("/admin/create")
    public String CreateForm() {
        return "admin/createStoreMemberForm";
    }

    @PostMapping("/admin/create")
    public String createStoreMember(StoreMemberForm form) {
        Long id = adminService.join(form);
        return "admin/createStoreMemberForm";
    }
}
