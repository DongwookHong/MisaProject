package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.misa.domain.Block;
import org.example.misa.domain.Floor;
import org.example.misa.domain.StoreMember;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

//건물, 층, 상점 이름, 현재위치 (qr 파라미터로 받음)
public class QrDTO {
    @JsonProperty("buildingName")
    private String buildingName;
    @JsonProperty("buildingDong")
    private String buildingDong;
    @JsonProperty("floorNumber")
    private String floorNumber;
    @JsonProperty("floorImage")
    private String floorImage;
    @JsonProperty("data")
    private List<Data> dataList;

    private QrDTO(String buildingName, String buildingDong, String floorNumber, String floorImage, List<Data> dataList) {
        this.buildingName = buildingName;
        this.buildingDong = buildingDong;
        this.floorNumber = floorNumber;
        this.floorImage = floorImage;
        this.dataList = dataList;
    }

    public static QrDTO from(Floor floor, List<Data> dataList) {
        return new QrDTO(floor.getBuildingName(),
                floor.getBuildingDong(),
                floor.getFloor(),
                floor.getFloorImgPath(),
                dataList);
    }

    public static class Data {
        @JsonProperty("type")
        private String type;
        @JsonProperty("blockId")
        private String blockId;
        @JsonProperty("name")
        private String name;

        private Data(String type, String blockId, String name) {
            this.type = type;
            this.blockId = blockId;
            this.name = name;
        }

        public static Data from(Block block) {
            String type = block.getType();
            String name = "";
            if (Objects.equals(type, "facility")) {
                name = block.getFacility().getFacilityName();
            }
            else if (Objects.equals(type, "store")) {
                name = block.getStoreMember().getStoreName();
            }
            if (Objects.isNull(name)) {
                name = "";
            }
            return new Data(type, block.getArea().toString(), name);
        }

        public static List<Data> dataList(List<Block> blocks) {
            List<Data> dataList = new ArrayList<>();
            for (Block block : blocks) {
                dataList.add(from(block));
            }
            return dataList;
        }
    }

}
