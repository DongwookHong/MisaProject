package org.example.misa.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class LoginController {
    @Autowired
    private AuthenticationManager authenticationManager;

    public LoginController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

//    @PostMapping("/login")
//    public String loginPost(@RequestParam String username, @RequestParam String password, HttpServletRequest request, HttpSession session) {
//        Authentication auth = new UsernamePasswordAuthenticationToken(username, password);
//        Authentication authenticated = authenticationManager.authenticate(auth);
//        SecurityContextHolder.getContext().setAuthentication(authenticated);
//        if (authenticated != null) {
//            System.out.println("request: " + request.getRequestURL());
//            return "redirect:admin/home";
//        }
//        return "null";
//    }
}
