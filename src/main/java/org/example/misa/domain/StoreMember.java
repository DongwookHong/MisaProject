package org.example.misa.domain;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.lang.NonNull;

import java.util.Set;

@Entity
@Table(name = "storemember")
public class StoreMember {

    @Id
    @Column(name = "store_name", nullable = false ,unique = true, length = 20)
    private String storeName;
    @OneToOne(mappedBy = "storeMember", cascade = CascadeType.ALL, orphanRemoval = true)
    private StoreLocation storeLocation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "floor_Number", nullable = false)
    private Floor floor;

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
    @Column(name = "store_address", nullable = false)
    private String storeAddress;
    @OneToMany(mappedBy = "storeMember", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ImgPath> imgPaths;

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        if (storeName == null || storeName.isEmpty()) {
            throw new IllegalArgumentException("storeName cannot be null");
        }
        this.storeName = storeName;
    }

    public StoreLocation getStoreLocation() {
        return storeLocation;
    }

    public void setStoreLocation(StoreLocation storeLocation) {
        this.storeLocation = storeLocation;
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

    public String getStoreAddress() {
        return storeAddress;
    }

    public void setStoreAddress(String storeAddress) {
        this.storeAddress = storeAddress;
    }

    public Set<ImgPath> getImgPaths() {
        return imgPaths;
    }

    public void setImgPaths(Set<ImgPath> imgPaths) {
        this.imgPaths = imgPaths;
    }

}

//private StoreLocationInfo storeLocationInfo;

//public void setStoreLocationInfo(StoreLocationInfo storeLocationInfo) {
//    this.storeLocationInfo = storeLocationInfo;
//}

//public static class StoreLocationInfo {
//    private int x;
//    private int y;
//    private int width;
//    private int height;
//
//    public int getX() {
//        return x;
//    }
//
//    public void setX(int x) {
//        this.x = x;
//    }
//
//    public int getY() {
//        return y;
//    }
//
//    public void setY(int y) {
//        this.y = y;
//    }
//
//    public int getWidth() {
//        return width;
//    }
//
//    public void setWidth(int width) {
//        this.width = width;
//    }
//
//    public int getHeight() {
//        return height;
//    }
//
//    public void setHeight(int height) {
//        this.height = height;
//    }
//}
