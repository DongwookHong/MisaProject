package org.example.misa.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import org.example.misa.DTO.*;
import org.example.misa.domain.Floor;
import org.example.misa.domain.StoreMember;
import org.example.misa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "https://misarodeo.com, https://www.misarodeo.com, https://api.misarodeo.com, http://api.misarodeo.com")
@RestController("/api")
public class MisaUserController {

    private final UserService userService;

    @Autowired
    public MisaUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/stores")
    public List<String> getStores() {
        List<Floor> floors = userService.findFloors();
        List<String> jsonSet = new ArrayList<>();

        if (!floors.isEmpty()) {
            ObjectMapper mapper = new ObjectMapper();
            for (Floor floor : floors) {
                try {

                    String json = mapper.writeValueAsString(StoresDTO.from(floor, StoresDTO.Data.dataList(floor.getBlocks())));
                    jsonSet.add(json);

                } catch (IOException e) {
                    throw new IllegalStateException("Failed to serialize building", e);
                }
            }
            return jsonSet;
        }
        return jsonSet;
    }

    @GetMapping("/api/stores/{name}")
    public String store(@PathVariable("name") String name) {
        StoreMember storeMember = userService.findStoreMember(name);
        String json = "상점 " + name + " 이(가) 존재하지 않습니다.";
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

    @GetMapping("/api/menu")
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

    @GetMapping("/api/qr-page")
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
            return jsonSet;
        }
        return jsonSet;
    }

    @GetMapping("/api/find-spot/{name}") //상점 이름, 상점 위치, 블럭, 층 이미지
    public String findSpot(@PathVariable("name") String name) {
        StoreMember storeMember = userService.findStoreMember(name);
        String json = "상점 " + name + " 이(가) 존재하지 않습니다.";
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

    @GetMapping("/api/floor")
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

    @GetMapping("/api/building/{buildingName}/{buildingDong}")
    public List<String> building(@PathVariable("buildingName") String buildingName, @PathVariable("buildingDong") String buildingDong) {
        List<Floor> floors = userService.findFloors();
        List<String> jsonSet = new ArrayList<>();

        if (!floors.isEmpty()) {
            ObjectMapper mapper = new ObjectMapper();
            for (Floor floor : floors) {
                try {

                    if (!floor.getBuildingName().equals(buildingName) || !floor.getBuildingDong().equals(buildingDong)) {
                        continue;
                    }

                    String json = mapper.writeValueAsString(BuildingDTO.from(floor, BuildingDTO.Data.dataList(floor.getBlocks())));
                    jsonSet.add(json);

                } catch (IOException e) {
                    throw new IllegalStateException("Failed to serialize building", e);
                }
            }
            return jsonSet;
        }
        return jsonSet;
    }
}
