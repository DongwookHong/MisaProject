package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.misa.domain.StoreMember;

//건물, 층, 상점 이름
public class FloorDTO {
    @JsonProperty("buildingName")
    private String buildingName;
    @JsonProperty("buildingDong")
    private String buildingDong;
    @JsonProperty("floorNumber")
    private String floorNumber;
    @JsonProperty("storeName")
    private String storeName;

    public FloorDTO(String buildingName, String buildingDong, String floorNumber, String storeName) {
        this.buildingName = buildingName;
        this.buildingDong = buildingDong;
        this.floorNumber = floorNumber;
        this.storeName = storeName;
    }

    public static FloorDTO of(String buildingName, String buildingDong, String floorNumber, String storeName) {
        return new FloorDTO(buildingName, buildingDong, floorNumber, storeName);
    }

    public static FloorDTO from(StoreMember storeMember) {
        return new FloorDTO(storeMember.getBlock().getFloor().getBuildingName(),
                storeMember.getBlock().getFloor().getBuildingDong(),
                storeMember.getBlock().getFloor().getFloor(),
                storeMember.getStoreName());
    }
}
