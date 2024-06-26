package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.misa.controller.StoreMemberForm;
import org.example.misa.domain.ImgPath;
import org.example.misa.domain.StoreMember;

import java.util.Set;

//건물, 층, 상점 이름, 상점 사진
public class MenuDTO {
    @JsonProperty("buildingName")
    private String buildingName;
    @JsonProperty("buildingDong")
    private String buildingDong;
    @JsonProperty("floorNumber")
    private String floorNumber;
    @JsonProperty("storeName")
    private String storeName;
    @JsonProperty("storeImage")
    private String storeImage;

    public MenuDTO(String buildingName, String buildingDong, String floorNumber, String storeName, String storeImage) {
        this.buildingName = buildingName;
        this.buildingDong = buildingDong;
        this.floorNumber = floorNumber;
        this.storeName = storeName;
        this.storeImage = storeImage;
    }

    public static MenuDTO of(String buildingName, String buildingDong, String floorNumber, String storeName, String storeImage) {
        return new MenuDTO(buildingName, buildingDong, floorNumber, storeName, storeImage);
    }

    public static MenuDTO from(StoreMember storeMember) {
        Set<ImgPath> storeImages = storeMember.getImgPaths();
        String imgPath = "";
        if (storeImages != null && !storeImages.isEmpty()) {
             imgPath = storeImages.iterator().next().getImgPath();
        }
        return new MenuDTO(storeMember.getBlock().getFloor().getBuildingName(),
                storeMember.getBlock().getFloor().getBuildingDong(),
                storeMember.getBlock().getFloor().getFloor(),
                storeMember.getStoreName(),
                imgPath);
    }
}
