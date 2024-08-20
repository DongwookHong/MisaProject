package org.example.misa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import org.example.misa.domain.Block;
import org.example.misa.domain.Floor;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
public class StoresDTO {
    @JsonProperty("buildingName")
    private String buildingName;
    @JsonProperty("buildingDong")
    private String buildingDong;
    @JsonProperty("floorNumber")
    private String floorNumber;
    @JsonProperty("data")
    private List<StoresDTO.Data> dataList;

    public static StoresDTO from(Floor floor, List<StoresDTO.Data> dataList) {
        return new StoresDTO(floor.getBuildingName(), floor.getBuildingDong(), floor.getFloor(), dataList);
    }

    @AllArgsConstructor
    public static class Data {
        @JsonProperty("storeName")
        private String storeName;
        @JsonProperty("storeNumber")
        private String storeNumber;

        private static StoresDTO.Data from(Block block) {
            return new StoresDTO.Data(block.getStoreMember().getStoreName(), block.getStoreMember().getStoreNumber());
        }

        public static List<StoresDTO.Data> dataList(List<Block> blocks) {
            return blocks.stream()
                    .filter(block -> block.getStoreMember() != null)
                    .map(Data::from)
                    .toList();
        }
    }
}
