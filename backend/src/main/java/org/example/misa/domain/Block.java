package org.example.misa.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table
@NoArgsConstructor
public class Block {

    @Setter(AccessLevel.NONE)
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "floor_id", nullable = false)
    private Floor floor;

    @Column(name = "area", nullable = false)
    private Long area;

    @Column(nullable = false)
    private String type;

    @OneToOne(mappedBy = "block", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private StoreMember storeMember;

    @OneToOne(mappedBy = "block", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Facility facility;

    public Block(Floor floor, Long area, String type) {
        setFloor(floor);
        setArea(area);
        setType(type);
    }

    public void setFloor(Floor floor) {
        if (this.floor != null) {
            this.floor.getBlocks().remove(this);
        }
        this.floor = floor;
        this.floor.getBlocks().add(this);
    }

    public String getName() {
        if (this.storeMember != null) {
            return this.getStoreMember().getStoreName();
        }
        return this.getFacility().getFacilityName();
    }
}

