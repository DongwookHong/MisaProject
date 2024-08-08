package org.example.misa.controller;

import org.example.misa.DTO.LoginDTO;
import org.example.misa.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class LoginController {

    @Autowired private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<String> loginPost(@RequestBody LoginDTO request) {
        System.out.println("hello post login");
        String token = adminService.login(request);
        return ResponseEntity.ok(token);
    }

}
