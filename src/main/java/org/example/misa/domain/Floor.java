package org.example.misa.domain;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "floor")
public class Floor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long floorId;

    @Column(name = "floor_number", nullable = false)
    private int floorNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    @Column(name = "floorimg_path", nullable = false)
    private String floorImgPath;

    @OneToMany(mappedBy = "floor", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<StoreMember> storeMembers;
}
