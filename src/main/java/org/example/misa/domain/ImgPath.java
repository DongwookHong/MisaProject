package org.example.misa.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "imgpath")
public class ImgPath {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imgId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_name", nullable = false)
    private StoreMember storeMember;

    @Column(name = "img_path", nullable = false)
    private String imgPath;

    //Getter && Setter


    public Long getImgId() {
        return imgId;
    }

    public void setImgId(Long imgId) {
        this.imgId = imgId;
    }

    public StoreMember getStoreMember() {
        return storeMember;
    }

    public void setStoreMember(StoreMember storeMember) {
        this.storeMember = storeMember;
    }

    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }
}
