package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.misa.domain.Block;
import org.example.misa.domain.Floor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class BuildingDTO {
    @JsonProperty("floorNumber")
    private String floorNumber;
    @JsonProperty("floorImage")
    private String floorImage;
    @JsonProperty("data")
    private List<BuildingDTO.Data> dataList;

    private BuildingDTO(String floorNumber, String floorImage, List<BuildingDTO.Data> dataList) {
        this.floorNumber = floorNumber;
        this.floorImage = floorImage;
        this.dataList = dataList;
    }

    public static BuildingDTO from(Floor floor, List<BuildingDTO.Data> dataList) {
        return new BuildingDTO(floor.getFloor(),
                floor.getFloorImgPath(),
                dataList);
    }

    public static class Data {
        @JsonProperty("blockId")
        private String blockId;
        @JsonProperty("type")
        private String type;
        @JsonProperty("name")
        private String name;

        private Data(String blockId, String type, String name) {
            this.blockId = blockId;
            this.type = type;
            this.name = name;
        }

        public static BuildingDTO.Data from(Block block) {
            String type = block.getType();
            String name = "";
            if (Objects.equals(type, "facility")) {
                name = block.getFacility().getFacilityName();
            }
            else if (Objects.equals(type, "store") && !Objects.isNull(block.getStoreMember())) {
                name = block.getStoreMember().getStoreName();
            }
            if (Objects.isNull(name)) {
                name = "";
            }
            return new BuildingDTO.Data(block.getArea().toString(), type, name);
        }

        public static List<BuildingDTO.Data> dataList(List<Block> blocks) {
            List<BuildingDTO.Data> dataList = new ArrayList<>();
            for (Block block : blocks) {
                dataList.add(from(block));
            }
            return dataList;
        }
    }
}
