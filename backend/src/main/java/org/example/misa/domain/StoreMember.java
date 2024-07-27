package org.example.misa.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.example.misa.DTO.StoreDTO;
import org.example.misa.controller.StoreMemberForm;

import java.util.*;

import static org.example.misa.domain.StoreHours.storeHoursList;

@NamedEntityGraph(name = "StoreMember.imgPaths", attributeNodes = {
        @NamedAttributeNode("imgPaths")
})

@Entity
@Table
@AllArgsConstructor
@Getter
@Setter
public class StoreMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter(AccessLevel.NONE)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "block_id", nullable = false)
    private Block block;

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "storeMember", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImgPath> imgPaths = new ArrayList<>();

    @OneToMany(mappedBy = "storeMember", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StoreHours> storeHours = new ArrayList<>();

    @Column(name = "store_name", nullable = false ,unique = true, length = 20)
    private String storeName;
    @Column(name = "info", length = 1000)
    private String info;
    @Column(name = "store_number")
    private String storeNumber;
    @Column(name = "homepage_path")
    private String homePagePath;
    @Column(name = "insta_path")
    private String instaPath;

    //getter && setter


    public StoreMember(String storeName,  List<StoreDTO.StoreHoursData> storeHoursData, String info, String storeNumber, String homePagePath, String instaPath) {
        this.storeName = storeName;
        this.setStoreHours(storeHoursData);
        this.info = info;
        this.storeNumber = storeNumber;
        this.homePagePath = homePagePath;
        this.instaPath = instaPath;
    }

    public StoreMember() {

    }

    public void setImgPaths(List<ImgPath> imgPaths) {
        if (imgPaths == null) return;
        this.imgPaths = imgPaths;
    }

    public void removeAllImgPaths() {
        if (!this.imgPaths.isEmpty()) {
            for (ImgPath imgPath : this.imgPaths) {
                imgPath.setImgPath(null);
            }
        }
    }

    public void updateImgPaths(List<String> urlList) {
        if (imgPaths == null) return;

        int i = 0;

        removeAllImgPaths();

        for (String url : urlList) {
            if (this.imgPaths.size() <= i) {
                this.imgPaths.add(ImgPath.create(this, url));
                i++;
            }
            else {
                this.imgPaths.get(i++).update(url);
            }
        }
    }

    public void setBlock(Block block) {
        this.block = block;
        block.setStoreMember(this);
    }

    public static StoreMember create(StoreMemberForm form) {
        return new StoreMember(form.getStoreName(), form.getStoreHours(), form.getInfo(), form.getStoreNumber(), form.getHomePagePath(), form.getInstaPath());
    }

    public void setStoreHours(List<StoreDTO.StoreHoursData> storeHoursData) {
        this.storeHours = StoreHours.storeHoursList(this, storeHoursData);
    }

    public void updateStoreHours(List<StoreDTO.StoreHoursData> storeHoursData) {
        int i = 0;
        for (StoreHours storeHour : this.storeHours) {
            storeHour.update(storeHoursData.get(i++));
        }
    }

    public void update(StoreMemberForm form) {
        this.setStoreName(form.getStoreName());
        this.setStoreNumber(form.getStoreNumber());
        this.setInfo(form.getInfo());
        this.updateStoreHours(form.getStoreHours());
        this.setHomePagePath(form.getHomePagePath());
        this.setInstaPath(form.getInstaPath());
    }

    public List<String> getImgPathsAsString() {
        List<String> imgPaths = new ArrayList<>();
        for (ImgPath imgPath : this.imgPaths) {
            imgPaths.add(imgPath.getImgPath());
        }
        return imgPaths;
    }

}
