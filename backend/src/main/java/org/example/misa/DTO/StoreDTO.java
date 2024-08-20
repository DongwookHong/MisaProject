package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.misa.domain.StoreMember;
import org.example.misa.domain.StoreHours;
import java.util.ArrayList;
import java.util.List;

//상점의 모든 정보 + 상점 사진
@AllArgsConstructor
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
    @JsonProperty("homePagePath")
    private String homepagePath;
    @JsonProperty("instaPath")
    private String instaPath;
    @JsonProperty("storePhone")
    private String storePhone;
    @JsonProperty("storeImages")
    private List<String> storeImages;

    public static StoreDTO from(StoreMember storeMember) {
        return new StoreDTO(storeMember.getBlock().getFloor().getBuildingName(),
                storeMember.getBlock().getFloor().getBuildingDong(),
                storeMember.getBlock().getFloor().getFloor(),
                storeMember.getBlock().getFloor().getFloorImgPath(),
                storeMember.getBlock().getArea().toString(),
                storeMember.getStoreName(),
                storeMember.getInfo(),
                StoreHoursData.dataList(storeMember.getStoreHours()),
                storeMember.getHomePagePath(),
                storeMember.getInstaPath(),
                storeMember.getStoreNumber(),
                storeMember.getImgPathsAsString());
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
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

        private static StoreDTO.StoreHoursData from(StoreHours storeHour) {
            return new StoreDTO.StoreHoursData(storeHour.getDayOfWeek(),
                    storeHour.isOpen(),
                    storeHour.getOpenTime(),
                    storeHour.getCloseTime(),
                    storeHour.getBreakStartTime(),
                    storeHour.getBreakEndTime(),
                    storeHour.getLastOrder());
        }

        public static List<StoreDTO.StoreHoursData> dataList(List<StoreHours> storeHours) {
            return storeHours.stream()
                    .map(StoreHoursData::from)
                    .toList();
        }
    }

}
