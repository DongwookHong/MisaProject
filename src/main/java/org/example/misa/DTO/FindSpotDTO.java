package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.misa.domain.StoreMember;

// 상점 이름, 상점 위치, 블럭, 층 이미지
public class FindSpotDTO {
    @JsonProperty("Floor")
    private String floor;
    @JsonProperty("FloorImgPath")
    private String floorImgPath;
    @JsonProperty("BlockName")
    private String blockName;
    @JsonProperty("StoreName")
    private String storeName;

    public FindSpotDTO(String floor, String floorImgPath, String blockName, String storeName) {
        this.floor = floor;
        this.floorImgPath = floorImgPath;
        this.blockName = blockName;
        this.storeName = storeName;
    }

    public static FindSpotDTO of(String floor, String floorImgPath, String blockName, String storeName) {
        return new FindSpotDTO(floor, floorImgPath, blockName, storeName);
    }

    public static FindSpotDTO from(StoreMember storeMember) {
        return new FindSpotDTO(storeMember.getBlock().getFloor().getFloor(),
                storeMember.getBlock().getFloor().getFloorImgPath(),
                storeMember.getBlock().getBlockName(),
                storeMember.getStoreName());
    }
}
