package org.example.misa.domain;

import jakarta.persistence.*;
import lombok.Getter;
import org.example.misa.controller.StoreMemberForm;

import java.util.List;
import java.util.Set;

@Getter
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

}
