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
    AdminService adminService; //관리자 페이지 접속 후 로그인 성공시 객체 생성

    public MisaAdminController(AdminService adminService) {
        this.adminService = adminService;
    }

//    @GetMapping("/")
//    public String home() {
//        return "home";
//    }

    @GetMapping("/admin/create")
    public String CreateForm() {
        return "admin/createStoreMemberForm";
    }

    @PostMapping("/admin/create")
    public String createStoreMember(StoreMemberForm form) {
        System.out.println("\nfile count: " + form.getFiles().size());
        String storename = adminService.joinStoreMember(form);
        return "admin/home";
    }

    @GetMapping("user/storelist")
    public String listStoreMember(Model model) {
        List<StoreMember> stores = adminService.findAllStoreMember();
        model.addAttribute("stores", stores);
        return "user/storelist";
    }

    @GetMapping("user/findstorebystorename")
    public String findStoreByStoreName() {
        return "user/findstorebystorename";
    }

    @GetMapping("user/store")
    public String viewStoreMember(Model model, StoreMemberForm form) {
        Optional<StoreMember> stores = adminService.findStoreMemberByStoreName(form.getStoreName());
        if (stores.isPresent()) {
            StoreMember storeMember = stores.get();
            model.addAttribute("stores", storeMember);
            return "user/store";
        }
        else
            return "redirect:/user/read";
    }
}
