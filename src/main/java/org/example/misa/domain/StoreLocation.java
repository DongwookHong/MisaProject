package org.example.misa.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "storelocation")
public class StoreLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long blockId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_name", nullable = false)
    private StoreMember storeMember;

    @Column(nullable = false)
    private String block;
    @Column(name = "x", nullable = false)
    private double x;
    @Column(name = "y", nullable = false)
    private double y;
    @Column(name = "width")
    private double width;
    @Column(name = "height")
    private double height;
}
