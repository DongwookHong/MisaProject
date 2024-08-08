package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import org.example.misa.domain.Block;
import org.example.misa.domain.Floor;
import org.example.misa.domain.StoreMember;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

//건물, 층, 상점 이름
@AllArgsConstructor
public class FloorDTO {
    @JsonProperty("buildingName")
    private String buildingName;
    @JsonProperty("buildingDong")
    private String buildingDong;
    @JsonProperty("floorNumber")
    private String floorNumber;
    @JsonProperty("storeName")
    private List<String> storeNames;

    public static FloorDTO from(Floor floor) {
        List<String> storeNames = new ArrayList<>();
        List<Block> blocks = floor.getBlocks();

        for (Block block : blocks) {
            if (block.getStoreMember() != null) {
                storeNames.add(block.getStoreMember().getStoreName());
            }
        }

        return new FloorDTO(floor.getBuildingName(),
                floor.getBuildingDong(),
                floor.getFloor(),
                storeNames);
    }
}
