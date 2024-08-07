package org.example.misa.DTO;


/*
{
  "buildingName": "string",
  "buildingDong": "string",
  "floor": "string",
  "storeName": "string",
  "storeNumber": "string",
}
*/

import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.misa.domain.Block;
import org.example.misa.domain.Floor;
import org.example.misa.domain.StoreMember;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


public class StoresDTO {
    @JsonProperty("buildingName")
    private String buildingName;
    @JsonProperty("buildingDong")
    private String buildingDong;
    @JsonProperty("floorNumber")
    private String floorNumber;
    @JsonProperty("data")
    private List<StoresDTO.Data> dataList;


    public StoresDTO(String buildingName, String buildingDong, String floorNumber, List<StoresDTO.Data> dataList) {
        this.buildingName = buildingName;
        this.buildingDong = buildingDong;
        this.floorNumber = floorNumber;
        this.dataList = dataList;
    }

    public static StoresDTO from(Floor floor, List<StoresDTO.Data> dataList) {
        return new StoresDTO(floor.getBuildingName(), floor.getBuildingDong(), floor.getFloor(), dataList);
    }

    public static class Data {
        @JsonProperty("storeName")
        private String storeName;
        @JsonProperty("storeNumber")
        private String storeNumber;

        private Data(String storeName, String storeNumber) {
            this.storeName = storeName;
            this.storeNumber = storeNumber;
        }

        public static StoresDTO.Data from(Block block) {
            return new StoresDTO.Data(block.getStoreMember().getStoreName(), block.getStoreMember().getStoreNumber());
        }

        public static List<StoresDTO.Data> dataList(List<Block> blocks) {
            List<StoresDTO.Data> dataList = new ArrayList<>();
            for (Block block : blocks) {
                if (block.getStoreMember() != null) {
                    dataList.add(Data.from(block));
                }
            }
            return dataList;
        }
    }
}
