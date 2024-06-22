package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.misa.domain.StoreMember;

//건물, 층, 상점 이름
public class FloorDTO {
    @JsonProperty("BuildingName")
    private String buildingName;
    @JsonProperty("Floor")
    private String floor;
    @JsonProperty("StoreName")
    private String storeName;

    public FloorDTO(String buildingName, String floor, String storeName) {
        this.buildingName = buildingName;
        this.floor = floor;
        this.storeName = storeName;
    }

    public static FloorDTO of(String buildingName, String floor, String storeName) {
        return new FloorDTO(buildingName, floor, storeName);
    }

    public static FloorDTO from(StoreMember storeMember) {
        return new FloorDTO(storeMember.getBlock().getFloor().getBuildingName(),
                storeMember.getBlock().getFloor().getFloor(),
                storeMember.getStoreName());
    }
}
