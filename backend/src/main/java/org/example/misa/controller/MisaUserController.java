package org.example.misa.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.io.Decoders;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.example.misa.DTO.*;
import org.example.misa.component.DecodeURIUtils;
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
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;

@Slf4j
@RestController
@Tag(name = "유저 API", description = "조회(GET)를 담당하는 API")
public class MisaUserController {

    private final UserService userService;

    public MisaUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/stores") //n + 1 수정
    @Operation(summary = "관리자 페이지 에 필요한 전체 상점 조회", description = "전체 상점 조회")
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
    @Operation(summary = "blog 에 필요한 상점 조회", description = "PathVariable 로 전달된 상점의 전체 정보 조회")
    public String store(@PathVariable("name") String name) {

//        name = DecodeURIUtils.decodeParamByBase64(name);

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

    @GetMapping("/api/menu") //find-stores-sorted-by-building-name, n + 1 수정
    @Operation(summary = "storelist 에 필요한 정보 조회", description = "모든 상점에 대해 각 상점의 이미지 URL 과 일부 정보 조회")
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

    @GetMapping("/api/qr-page") //n + 1 수정
    @Operation(summary = "qr-page 에 필요한 정보 조회", description = "층 별 이미지의 URL 및 상점 정보와 편의시설 정보 조회")
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
    @Operation(summary = "find-spot 에 필요한 정보 조회", description = "PathVariable로 전달된 상점의 위치 정보(건물 명, 층수 등) 조회")
    public String findSpot(@PathVariable("name") String name) {
//        name = DecodeURIUtils.decodeParamByBase64(name);
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

    @GetMapping("/api/floor") //n + 1 수정
    @Operation(summary = "floor 에 필요한 정보 조회", description = "각 건물의 층을 기준으로 정렬괸 상점 정보 조회")
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

    @GetMapping("/api/building/{buildingName}/{buildingDong}") //n + 1 수정
    @Operation(summary = "building 에 필요한 정보 조회", description = "PathValiable 로 전달된 정보에 속하는 모든 상점 조회")
    public List<String> building(@PathVariable("buildingName") String buildingName, @PathVariable("buildingDong") String buildingDong) {
//        buildingName = DecodeURIUtils.decodeParamByBase64(buildingName);
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
