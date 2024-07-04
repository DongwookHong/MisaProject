package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.misa.domain.StoreMember;

// 상점 이름, 상점 위치, 블럭, 층 이미지
public class FindSpotDTO {
    @JsonProperty("buildingName")
    private String buildingName;
    @JsonProperty("buildingDong")
    private String buildingDong;
    @JsonProperty("floorNumber")
    private String floorNumber;
    @JsonProperty("floorImage")
    private String floorImage;
    @JsonProperty("blockId")
    private String blockId;
    @JsonProperty("storeName")
    private String storeName;

    private FindSpotDTO(String buildingName, String buildingDong, String floorNumber, String floorImage, String blockId, String storeName) {
        this.buildingName = buildingName;
        this.buildingDong = buildingDong;
        this.floorNumber = floorNumber;
        this.floorImage = floorImage;
        this.blockId = blockId;
        this.storeName = storeName;
    }

    //만약 findspot도 편의시설을 포함한다면 수정 필요 (storemember 뿐만 아니라 facility도 추가, blocktype 확인)
    public static FindSpotDTO from(StoreMember storeMember) {
        return new FindSpotDTO(storeMember.getBlock().getFloor().getBuildingName(),
                storeMember.getBlock().getFloor().getBuildingDong(),
                storeMember.getBlock().getFloor().getFloor(),
                storeMember.getBlock().getFloor().getFloorImgPath(),
                storeMember.getBlock().getArea().toString(),
                storeMember.getStoreName());
    }
}
