package org.example.misa.domain;

import jakarta.persistence.*;
import org.example.misa.controller.StoreMemberForm;

import java.util.Set;

@NamedEntityGraph(name = "StoreMember.imgPaths", attributeNodes = {
        @NamedAttributeNode("imgPaths")
})

@Entity
@Table(name = "storemember")
public class StoreMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "block_id", nullable = false)
    private Block block;

    @OneToMany(mappedBy = "storeMember", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ImgPath> imgPaths;

    @Column(name = "store_name", nullable = false ,unique = true, length = 20)
    private String storeName;

    @Column(name = "business_hour")
    private String businessHour;
    @Column(name = "info", length = 1000)
    private String info;
    @Column(name = "store_number")
    private String storeNumber;
    @Column(name = "homepage_path")
    private String homePagePath;
    @Column(name = "insta_path")
    private String instaPath;

    //getter && setter


    public StoreMember(String storeName, String businessHour, String info, String storeNumber, String homePagePath, String instaPath) {
        this.storeName = storeName;
        this.businessHour = businessHour;
        this.info = info;
        this.storeNumber = storeNumber;
        this.homePagePath = homePagePath;
        this.instaPath = instaPath;
    }

    public StoreMember() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Block getBlock() {
        return block;
    }

    public void setBlock(Block block) {
        this.block = block;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        if (storeName == null || storeName.isEmpty()) {
            throw new IllegalArgumentException("storeName cannot be null");
        }
        this.storeName = storeName;
    }

    public Block getStoreLocation() {
        return block;
    }

    public void setStoreLocation(Block block) {
        this.block = block;
    }

    public String getBusinessHour() {
        return businessHour;
    }

    public void setBusinessHour(String businessHour) {
        this.businessHour = businessHour;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getStoreNumber() {
        return storeNumber;
    }

    public void setStoreNumber(String storeNumber) {
        this.storeNumber = storeNumber;
    }

    public String getHomePagePath() {
        return homePagePath;
    }

    public void setHomePagePath(String homePagePath) {
        this.homePagePath = homePagePath;
    }

    public String getInstaPath() {
        return instaPath;
    }

    public void setInstaPath(String instaPath) {
        this.instaPath = instaPath;
    }

    public Set<ImgPath> getImgPaths() {
        return imgPaths;
    }

    public void setImgPaths(Set<ImgPath> imgPaths) {
        this.imgPaths = imgPaths;
    }

    public static StoreMember from(StoreMemberForm form) {
        return new StoreMember(form.getStoreName(), form.getBusinessHour(), form.getInfo(), form.getStoreNumber(), form.getHomePagePath(), form.getInstaPath());
    }
}
