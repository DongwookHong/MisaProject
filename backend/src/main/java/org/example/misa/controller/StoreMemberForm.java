package org.example.misa.controller;

import lombok.Getter;
import lombok.Setter;
import org.example.misa.DTO.StoreDTO;
import org.example.misa.domain.StoreHours;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class StoreMemberForm {
    private String buildingName;
    private String buildingDong;
    private String floor;
    private String blockId;
    private String storeName;
    private String info;
    private String storeNumber;
    private String homePagePath;
    private String instaPath;
    private String storeAddress;
    private List<StoreDTO.StoreHoursData> storeHours;
}
