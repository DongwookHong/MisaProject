package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.misa.domain.ImgPath;
import org.example.misa.domain.StoreMember;

import java.util.List;
import java.util.Set;

//상점의 모든 정보 + 상점 사진
public class StoreDTO {
    @JsonProperty("buildingName")
    private String buildingName;
    @JsonProperty("buildingDong")
    private String buildingDong;
    @JsonProperty("floorNumber")
    private String floorNumber;
    @JsonProperty("blockId")
    private String blockId;
    @JsonProperty("storeName")
    private String storeName;
    @JsonProperty("storeInfo")
    private String storeInfo;
    @JsonProperty("storeTime")
    private String storeTime;
    @JsonProperty("homePagePath")
    private String homepagePath;
    @JsonProperty("instaPath")
    private String instaPath;
    @JsonProperty("storePhone")
    private String storePhone;
    @JsonProperty("storeImages")
    private List<String> storeImages;

    public StoreDTO(String buildingName,
                    String buildingDong,
                    String floorNumber,
                    String blockId,
                    String storeName,
                    String storeInfo,
                    String storeTime,
                    String homepagePath,
                    String instaPath,
                    String storePhone,
                    List<String> storeImages) {
        this.buildingName = buildingName;
        this.buildingDong = buildingDong;
        this.floorNumber = floorNumber;
        this.blockId = blockId;
        this.storeName = storeName;
        this.storeInfo = storeInfo;
        this.storeTime = storeTime;
        this.homepagePath = homepagePath;
        this.instaPath = instaPath;
        this.storePhone = storePhone;
        this.storeImages = storeImages;
    }

    public static StoreDTO from(StoreMember storeMember) {
        return new StoreDTO(storeMember.getBlock().getFloor().getBuildingName(),
                storeMember.getBlock().getFloor().getBuildingDong(),
                storeMember.getBlock().getFloor().getFloor(),
                storeMember.getBlock().getArea().toString(),
                storeMember.getStoreName(),
                storeMember.getInfo(),
                storeMember.getBusinessHour(),
                storeMember.getHomePagePath(),
                storeMember.getInstaPath(),
                storeMember.getStoreNumber(),
                storeMember.getImgPathsAsString());
    }
}
