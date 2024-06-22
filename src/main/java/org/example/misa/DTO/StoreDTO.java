package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.misa.domain.ImgPath;
import org.example.misa.domain.StoreMember;

import java.util.Set;

//상점의 모든 정보 + 상점 사진
public class StoreDTO {
    @JsonProperty("BuildingName")
    private String buildingName;
    @JsonProperty("Floor")
    private String floor;
    @JsonProperty("BlockName")
    private String blockName;
    @JsonProperty("StoreName")
    private String storeName;
    @JsonProperty("Info")
    private String info;
    @JsonProperty("BusinessHour")
    private String businessHour;
    @JsonProperty("HomePagePath")
    private String homepagePath;
    @JsonProperty("InstaPath")
    private String instaPath;
    @JsonProperty("StoreNumber")
    private String storeNumber;
    @JsonProperty("ImgPaths")
    private Set<ImgPath> imgPaths;

    public StoreDTO(String buildingName,
                    String floor,
                    String blockName,
                    String storeName,
                    String info,
                    String businessHour,
                    String homepagePath,
                    String instaPath,
                    String storeNumber,
                    Set<ImgPath> imgPaths) {
        this.buildingName = buildingName;
        this.floor = floor;
        this.blockName = blockName;
        this.storeName = storeName;
        this.info = info;
        this.businessHour = businessHour;
        this.homepagePath = homepagePath;
        this.instaPath = instaPath;
        this.storeNumber = storeNumber;
        this.imgPaths = imgPaths;
    }

    public static StoreDTO of(String buildingName,
                              String floor,
                              String blockName,
                              String storeName,
                              String info,
                              String businessHour,
                              String homepagePath,
                              String instaPath,
                              String storeNumber,
                              Set<ImgPath> imgPaths) {
        return new StoreDTO(buildingName, floor, blockName, storeName, info,
                businessHour, homepagePath, instaPath, storeNumber, imgPaths);
    }

    public static StoreDTO from(StoreMember storeMember) {
        return new StoreDTO(storeMember.getBlock().getFloor().getBuildingName(),
                storeMember.getBlock().getFloor().getFloor(),
                storeMember.getBlock().getBlockName(),
                storeMember.getStoreName(),
                storeMember.getInfo(),
                storeMember.getBusinessHour(),
                storeMember.getHomePagePath(),
                storeMember.getInstaPath(),
                storeMember.getStoreNumber(),
                storeMember.getImgPaths());
    }
}
