package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.misa.controller.StoreMemberForm;
import org.example.misa.domain.ImgPath;
import org.example.misa.domain.StoreMember;

import java.util.Set;

//건물, 층, 상점 이름, 상점 사진
public class MenuDTO {
    @JsonProperty("BuildingName")
    private String buildingName;
    @JsonProperty("Floor")
    private String floor;
    @JsonProperty("StoreName")
    private String storeName;
    @JsonProperty("StoreImgPath")
    private String storeImgPath;

    public MenuDTO(String buildingName, String floor, String storeName, String storeImgPath) {
        this.buildingName = buildingName;
        this.floor = floor;
        this.storeName = storeName;
        this.storeImgPath = storeImgPath;
    }

    public static MenuDTO of(String buildingName, String floor, String storeName, String storeImgPath) {
        return new MenuDTO(buildingName, floor, storeName, storeImgPath);
    }

    public static MenuDTO from(StoreMember storeMember) {
        Set<ImgPath> storeImages = storeMember.getImgPaths();
        String imgPath = "";
        if (storeImages != null && !storeImages.isEmpty()) {
             imgPath = storeImages.iterator().next().getImgPath();
        }
        return new MenuDTO(storeMember.getBlock().getFloor().getBuildingName(),
                storeMember.getBlock().getFloor().getFloor(),
                storeMember.getStoreName(),
                imgPath);
    }
}
