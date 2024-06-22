package org.example.misa.domain;

import jakarta.persistence.*;
import org.example.misa.controller.StoreMemberForm;

import java.util.Set;

@Entity
@Table(name = "floor")
public class Floor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "floor", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Block> blocks;

    @Column(nullable = false)
    private String buildingName;

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

    public Set<Block> getBlocks() {
        return blocks;
    }

    public void setBlocks(Set<Block> blocks) {
        this.blocks = blocks;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
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
