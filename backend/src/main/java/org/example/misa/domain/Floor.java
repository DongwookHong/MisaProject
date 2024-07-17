package org.example.misa.domain;

import jakarta.persistence.*;
import org.example.misa.controller.StoreMemberForm;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "floor")
public class Floor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "floor", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("area asc")
    private List<Block> blocks;

    @Column(nullable = false)
    private String buildingName;

    @Column(nullable = false)
    private String buildingDong;

    @Column(nullable = false)
    private String floor;

    @Column(name = "floor_img_path", nullable = false)
    private String floorImgPath;

    //getter && setter

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Block> getBlocks() {
        return blocks;
    }

    public void setBlocks(List<Block> blocks) {
        this.blocks = blocks;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public String getBuildingDong() {
        return buildingDong;
    }

    public void setBuildingDong(String buildingDong) {
        this.buildingDong = buildingDong;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public String getFloorImgPath() {
        return floorImgPath;
    }

    public void setFloorImgPath(String floorImgPath) {
        this.floorImgPath = floorImgPath;
    }
}
