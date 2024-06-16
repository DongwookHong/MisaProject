package org.example.misa.controller;

import org.example.misa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MisaUserController {

    UserService userService;

    @Autowired
    public MisaUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/user/read")
    public String read() {
        return "user/read";
    }

    @GetMapping("/admin/home")
    public String adminHome() {
        return "admin/home";
    }
}
