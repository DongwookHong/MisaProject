package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.misa.domain.Block;
import org.example.misa.domain.StoreMember;
import org.example.misa.domain.StoreHours;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

//상점의 모든 정보 + 상점 사진
public class StoreDTO {
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
    @JsonProperty("storeInfo")
    private String storeInfo;
    @JsonProperty("storeHours")
    private List<StoreHoursData> storeHoursData;
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
                    String floorImage,
                    String blockId,
                    String storeName,
                    String storeInfo,
                    List<StoreHoursData> storeHoursData,
                    String homepagePath,
                    String instaPath,
                    String storePhone,
                    List<String> storeImages) {
        this.buildingName = buildingName;
        this.buildingDong = buildingDong;
        this.floorNumber = floorNumber;
        this.floorImage = floorImage;
        this.blockId = blockId;
        this.storeName = storeName;
        this.storeInfo = storeInfo;
        this.storeHoursData = storeHoursData;
        this.homepagePath = homepagePath;
        this.instaPath = instaPath;
        this.storePhone = storePhone;
        this.storeImages = storeImages;
    }

    public static StoreDTO from(StoreMember storeMember) {
        return new StoreDTO(storeMember.getBlock().getFloor().getBuildingName(),
                storeMember.getBlock().getFloor().getBuildingDong(),
                storeMember.getBlock().getFloor().getFloor(),
                storeMember.getBlock().getFloor().getFloorImgPath(),
                storeMember.getBlock().getArea().toString(),
                storeMember.getStoreName(),
                storeMember.getInfo(),
                StoreHoursData.from(storeMember.getStoreHours()),
                storeMember.getHomePagePath(),
                storeMember.getInstaPath(),
                storeMember.getStoreNumber(),
                storeMember.getImgPathsAsString());
    }

    @NoArgsConstructor
    @Getter
    public static class StoreHoursData {
        @JsonProperty
        private String dayOfWeek;

        @JsonProperty
        private boolean isOpen;

        @JsonProperty
        private String openTime;

        @JsonProperty
        private String closeTime;

        @JsonProperty
        private String breakStartTime;

        @JsonProperty
        private String breakEndTime;

        @JsonProperty
        private String lastOrder;

        public StoreHoursData(String dayOfWeek, boolean isOpen, String openTime, String closeTime, String breakStartTime, String breakEndTime, String lastOrder) {
            this.dayOfWeek = dayOfWeek;
            this.isOpen = isOpen;
            this.openTime = openTime;
            this.closeTime = closeTime;
            this.breakStartTime = breakStartTime;
            this.breakEndTime = breakEndTime;
            this.lastOrder = lastOrder;
        }

        public static List<StoreDTO.StoreHoursData> from(List<StoreHours> storeHours) {
            List<StoreDTO.StoreHoursData> dataList = new ArrayList<>();
            for (StoreHours storeHour : storeHours) {
                dataList.add(new StoreDTO.StoreHoursData(storeHour.getDayOfWeek(),
                        storeHour.isOpen(),
                        storeHour.getOpenTime(),
                        storeHour.getCloseTime(),
                        storeHour.getBreakStartTime(),
                        storeHour.getBreakEndTime(),
                        storeHour.getLastOrder()));
            }
            return dataList;
        }
    }
}
