package org.example.misa.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.example.misa.DTO.*;
import org.example.misa.component.DecodeURIUtils;
import org.example.misa.domain.StoreMember;
import org.example.misa.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.*;

@Slf4j
@RestController
@Tag(name = "유저 API", description = "조회(GET)를 담당하는 API")
public class MisaUserController {

    private final UserService userService;
    private final ObjectMapper mapper;

    public MisaUserController(UserService userService, ObjectMapper objectMapper) {
        this.userService = userService;
        this.mapper = objectMapper;
    }

    @GetMapping("/api/stores") //n + 1 수정
    @Operation(summary = "관리자 페이지 에 필요한 전체 상점 조회", description = "전체 상점 조회")
    public List<String> getStores() {

        return userService.findFloors().stream()
                .map(floor -> {
                    try {
                        return mapper.writeValueAsString(StoresDTO.from(floor, StoresDTO.Data.dataList(floor.getBlocks())));
                    } catch (IOException e) {
                        throw new IllegalStateException("Failed to serialize StoresDTO", e);
                    }
                })
                .toList();
    }

    @GetMapping("/api/stores/{name}")
    @Operation(summary = "blog 에 필요한 상점 조회", description = "PathVariable 로 전달된 상점의 전체 정보 조회")
    public String store(@PathVariable("name") String name) {

        name = DecodeURIUtils.decodeParamByBase64(name);
        StoreMember storeMember = userService.findStoreMember(name);

        try {
            return mapper.writeValueAsString(StoreDTO.from(storeMember));
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Failed to serialize StoreDTO", e);
        }
    }

    @GetMapping("/api/menu") //find-stores-sorted-by-building-name, n + 1 수정
    @Operation(summary = "storelist 에 필요한 정보 조회", description = "모든 상점에 대해 각 상점의 이미지 URL 과 일부 정보 조회")
    public List<String> menu() {

        return userService.findFloors().stream()
                .map(floor -> {
                    try {
                        return mapper.writeValueAsString(MenuDTO.from(floor, MenuDTO.Data.dataList(floor.getBlocks())));
                    } catch (IOException e) {
                        throw new IllegalStateException("Failed to serialize MenuDTO", e);
                    }
                })
                .toList();

    }

    @GetMapping("/api/qr-page") //n + 1 수정
    @Operation(summary = "qr-page 에 필요한 정보 조회", description = "층 별 이미지의 URL 및 상점 정보와 편의시설 정보 조회")
    public List<String> qrPage() {

        return userService.findFloors().stream()
                .map(floor -> {
                    try {
                        return mapper.writeValueAsString(QrDTO.from(floor, QrDTO.Data.dataList(floor.getBlocks())));
                    } catch (IOException e) {
                        throw new IllegalStateException("Failed to serialize QrDTO", e);
                    }
                })
                .toList();
    }

    @GetMapping("/api/find-spot/{name}") //상점 이름, 상점 위치, 블럭, 층 이미지
    @Operation(summary = "find-spot 에 필요한 정보 조회", description = "PathVariable로 전달된 상점의 위치 정보(건물 명, 층수 등) 조회")
    public String findSpot(@PathVariable("name") String name) {
        name = DecodeURIUtils.decodeParamByBase64(name);
        StoreMember storeMember = userService.findStoreMember(name);

        try {
            return mapper.writeValueAsString(FindSpotDTO.from(storeMember));
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Failed to serialize FindSpotDTO", e);
        }
    }

    @GetMapping("/api/floor") //n + 1 수정
    @Operation(summary = "floor 에 필요한 정보 조회", description = "각 건물의 층을 기준으로 정렬괸 상점 정보 조회")
    public List<String> floor() {

        return userService.findFloors().stream()
                .map(floor -> {
                    try {
                        return mapper.writeValueAsString(FloorDTO.from(floor));
                    } catch (IOException e) {
                        throw new IllegalStateException("Failed to serialize FloorDTO", e);
                    }
                })
                .toList();

    }

    @GetMapping("/api/building/{buildingName}/{buildingDong}") //n + 1 수정
    @Operation(summary = "building 에 필요한 정보 조회", description = "PathValiable 로 전달된 정보에 속하는 모든 상점 조회")
    public List<String> building(@PathVariable("buildingName") String buildingName, @PathVariable("buildingDong") String buildingDong) {

        String finalBuildingName = DecodeURIUtils.decodeParamByBase64(buildingName);
        return userService.findFloors().stream()
                .filter(floor -> floor.getBuildingName().equals(finalBuildingName) && floor.getBuildingDong().equals(buildingDong))
                .map(floor -> {
                    try {
                        return mapper.writeValueAsString(BuildingDTO.from(floor, BuildingDTO.Data.dataList(floor.getBlocks())));
                    } catch (IOException e) {
                        throw new IllegalStateException("Failed to serialize FloorDTO", e);
                    }
                })
                .toList();

    }



}
