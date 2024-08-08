package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import org.example.misa.domain.Block;
import org.example.misa.domain.Floor;
import org.example.misa.domain.StoreMember;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

//건물, 층, 상점 이름, 현재위치 (qr 파라미터로 받음)
@AllArgsConstructor
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

    public static QrDTO from(Floor floor, List<Data> dataList) {
        return new QrDTO(floor.getBuildingName(),
                floor.getBuildingDong(),
                floor.getFloor(),
                floor.getFloorImgPath(),
                dataList);
    }

    @AllArgsConstructor
    public static class Data {
        @JsonProperty("blockId")
        private String blockId;
        @JsonProperty("type")
        private String type;
        @JsonProperty("name")
        private String name;

        private static Data from(Block block) {
            return new Data(block.getArea().toString(), block.getType(), block.getName());
        }

        public static List<Data> dataList(List<Block> blocks) {
            List<Data> dataList = new ArrayList<>();
            for (Block block : blocks) {
                if (block.getStoreMember() != null || block.getFacility() != null)
                    dataList.add(from(block));
            }
            return dataList;
        }
    }

}
