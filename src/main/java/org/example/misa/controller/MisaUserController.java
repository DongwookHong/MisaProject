package org.example.misa.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.misa.DTO.*;
import org.example.misa.domain.Floor;
import org.example.misa.domain.StoreMember;
import org.example.misa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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

    @GetMapping("/api/store/{name}")// 상점의 모든 정보
    public String store(@PathVariable("name") String name) {
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
        List<Floor> floors = userService.findFloors();
        List<String> jsonSet = new ArrayList<>();
        if (!floors.isEmpty()) {
            ObjectMapper mapper = new ObjectMapper();
            for (Floor floor : floors) {
                try {
                    String json = mapper.writeValueAsString(MenuDTO.from(floor, MenuDTO.Data.dataList(floor.getBlocks())));
                    jsonSet.add(json);
                } catch (JsonProcessingException e) {
                    throw new IllegalStateException("Failed to serialize store", e);
                }
            }
            return jsonSet;
        }
        return jsonSet;
    }

    @GetMapping("/api/qr-page") // 건물, 층, 상점 이름, 상점 위치 (추후 작업)
    public List<String> qrPage() {
        List<Floor> floors = userService.findFloors();
        List<String> jsonSet = new ArrayList<>();

        if (!floors.isEmpty()) {
            ObjectMapper mapper = new ObjectMapper();
            for (Floor floor : floors) {
                try {
                    String json = mapper.writeValueAsString(QrDTO.from(floor, QrDTO.Data.dataList(floor.getBlocks())));
                    jsonSet.add(json);
                } catch (IOException e) {
                    throw new IllegalStateException("Failed to serialize floor", e);
                }
            }
            for (String json : jsonSet) {
                System.out.println(json);
            }
            return jsonSet;
        }
        return jsonSet;
    }

    @GetMapping("/api/find-spot/{name}") //상점 이름, 상점 위치, 블럭, 층 이미지
    public String findSpot(@PathVariable("name") String name) {
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
        List<Floor> floors = userService.findFloors();
        List<String> jsonSet = new ArrayList<>();
        if (!floors.isEmpty()) {
            ObjectMapper mapper = new ObjectMapper();
            for (Floor floor : floors) {
                try {
                    String json = mapper.writeValueAsString(FloorDTO.from(floor));
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
