package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import org.example.misa.domain.Block;
import org.example.misa.domain.Floor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
public class BuildingDTO {
    @JsonProperty("floorNumber")
    private String floorNumber;
    @JsonProperty("floorImage")
    private String floorImage;
    @JsonProperty("data")
    private List<BuildingDTO.Data> dataList;

    public static BuildingDTO from(Floor floor, List<BuildingDTO.Data> dataList) {
        return new BuildingDTO(floor.getFloor(),
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

        private static BuildingDTO.Data from(Block block) {
            return new BuildingDTO.Data(block.getArea().toString(), block.getType(), block.getName());
        }

        public static List<BuildingDTO.Data> dataList(List<Block> blocks) {
            List<BuildingDTO.Data> dataList = new ArrayList<>();
            for (Block block : blocks) {
                if (block.getFacility() != null || block.getStoreMember() != null)
                    dataList.add(from(block));
            }
            return dataList;
        }
    }
}
