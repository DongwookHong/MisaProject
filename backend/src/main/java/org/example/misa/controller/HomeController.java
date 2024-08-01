package org.example.misa.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.example.misa.component.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {
    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/test")
    public String test(HttpServletRequest request) {
        return jwtUtils.getExpirationDateFromToken(request.getHeader("Authorization"));
    }
}