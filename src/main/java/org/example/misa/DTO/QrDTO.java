package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

//건물, 층, 상점 이름, 현재위치 (qr 파라미터로 받음)
public class QrDTO {
    @JsonProperty("type")
    private String type;
    @JsonProperty("blockId")
    private String blockId;
    @JsonProperty("buildingName")
    private String buildingName;
    @JsonProperty("buildingDong")
    private String buildingDong;
    @JsonProperty("floorNumber")
    private String floorNumber;
    @JsonProperty("floorImage")
    private String floorImage;
    @JsonProperty("storeName")
    private String storeName;
    @JsonProperty("facilityName")
    private String facilityName;

}
