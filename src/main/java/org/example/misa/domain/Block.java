package org.example.misa.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "block")
public class Block {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "block", cascade = CascadeType.ALL, orphanRemoval = true)
    private StoreMember storeMember;

    @OneToOne(mappedBy = "block", cascade = CascadeType.ALL, orphanRemoval = true)
    private Facility facility;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "floor_id", nullable = false)
    private Floor floor;

    @Column(nullable = false)
    private String blockId;

    @Column(nullable = false)
    private String type;

    //constructor

    public Block(Floor floor, String blockId, String type) {
        this.setFloor(floor);
        this.blockId = blockId;
        this.type = type;
    }

    public Block() {

    }

    //getter && setter

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StoreMember getStoreMember() {
        return storeMember;
    }

    public void setStoreMember(StoreMember storeMember) {
        this.storeMember = storeMember;
    }

    public Facility getFacility() {
        return facility;
    }

    public void setFacility(Facility facility) {
        this.facility = facility;
    }

    public Floor getFloor() {
        return floor;
    }

    public void setFloor(Floor floor) {
        if (this.floor != null) {
            this.floor.getBlocks().remove(this);
        }
        this.floor = floor;
        this.floor.getBlocks().add(this);
    }

    public String getBlockId() {
        return blockId;
    }

    public void setBlockId(String blockId) {
        this.blockId = blockId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
