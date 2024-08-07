package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.misa.controller.StoreMemberForm;
import org.example.misa.domain.Block;
import org.example.misa.domain.Floor;
import org.example.misa.domain.ImgPath;
import org.example.misa.domain.StoreMember;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

//건물, 층, 상점 이름, 상점 사진
public class MenuDTO {
    @JsonProperty("buildingName")
    private String buildingName;
    @JsonProperty("buildingDong")
    private String buildingDong;
    @JsonProperty("floorNumber")
    private String floorNumber;
    @JsonProperty("data")
    private List<Data> dataList;

    public MenuDTO(String buildingName, String buildingDong, String floorNumber, List<Data> dataList) {
        this.buildingName = buildingName;
        this.buildingDong = buildingDong;
        this.floorNumber = floorNumber;
        this.dataList = dataList;
    }

    public static MenuDTO from(Floor floor, List<Data> dataList) {

        return new MenuDTO(floor.getBuildingName(),
                floor.getBuildingDong(),
                floor.getFloor(),
                dataList);
    }

    public static class Data {
        @JsonProperty("storeName")
        private String storeName;
        @JsonProperty("storeImage")
        private String storeImage;

        private Data (String storeName, String storeImage) {
            this.storeName = storeName;
            this.storeImage = storeImage;
        }

        public static Data from(Block block) {
            List<ImgPath> storeImages = block.getStoreMember().getImgPaths();
            String imgPath = "";
            if (storeImages != null && !storeImages.isEmpty()) {
                imgPath = storeImages.iterator().next().getImgPath();
            }
            return new Data(block.getStoreMember().getStoreName(), imgPath);
        }

        public static List<Data> dataList(List<Block> blocks) {
            List<Data> dataList = new ArrayList<>();
            for (Block block : blocks) {
                if (block.getStoreMember() != null) {
                    dataList.add(from(block));
                }
            }
            return dataList;
        }
    }
}
