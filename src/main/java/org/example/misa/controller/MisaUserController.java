package org.example.misa.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.misa.DTO.FindSpotDTO;
import org.example.misa.DTO.FloorDTO;
import org.example.misa.DTO.MenuDTO;
import org.example.misa.DTO.StoreDTO;
import org.example.misa.domain.StoreMember;
import org.example.misa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class MisaUserController {

    private final UserService userService;

    @Autowired
    public MisaUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/store")// 상점의 모든 정보
    public String store(@RequestParam(value = "name") String name) {
        StoreMember storeMember = userService.findStoreMember(name);
        String json = "";
        if (storeMember != null) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                json = mapper.writeValueAsString(StoreDTO.from(storeMember));
                return json;
            } catch (JsonProcessingException e) {
                throw new IllegalStateException("Failed to serialize store", e);
            }
        }
        return json;
    }

    @GetMapping("/api/menu") // 건물, 층, 상점 이름, 상점 사진
    public List<String> menu() {
        List<StoreMember> storeMembers = userService.findStoreMembers();
        List<String> jsonSet = new ArrayList<>();
        if (!storeMembers.isEmpty()) {
            ObjectMapper mapper = new ObjectMapper();
            for (StoreMember storeMember : storeMembers) {
                try {
                    String json = mapper.writeValueAsString(MenuDTO.from(storeMember));
                    jsonSet.add(json);
                } catch (JsonProcessingException e) {
                    throw new IllegalStateException("Failed to serialize store", e);
                }
            }
            return jsonSet;
        }
        return jsonSet;
    }

    @GetMapping("/api/qrpage") // 건물, 층, 상점 이름, 상점 위치 (추후 작업)
    public String qrpage(Model model) {
        return "qrpage";
    }

    @GetMapping("/api/findspot") //상점 이름, 상점 위치, 블럭, 층 이미지
    public String findSpot(@RequestParam(value = "name") String name) {
        StoreMember storeMember = userService.findStoreMember(name);
        String json = "";
        if (storeMember != null) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                json = mapper.writeValueAsString(FindSpotDTO.from(storeMember));
                return json;
            } catch (JsonProcessingException e) {
                throw new IllegalStateException("Failed to serialize store", e);
            }
        }
        return json;
    }

    @GetMapping("/api/floor") //건물, 층, 상점 이름
    public List<String> floor() {
        List<StoreMember> storeMembers = userService.findStoreMembers();
        List<String> jsonSet = new ArrayList<>();
        if (!storeMembers.isEmpty()) {
            ObjectMapper mapper = new ObjectMapper();
            for (StoreMember storeMember : storeMembers) {
                try {
                    String json = mapper.writeValueAsString(FloorDTO.from(storeMember));
                    jsonSet.add(json);
                } catch (JsonProcessingException e) {
                    throw new IllegalStateException("Failed to serialize store", e);
                }
            }
            return jsonSet;
        }
        return jsonSet;
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
