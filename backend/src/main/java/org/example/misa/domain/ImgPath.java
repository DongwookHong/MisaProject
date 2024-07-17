package org.example.misa.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "imgpath")
public class ImgPath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private StoreMember storeMember;

    @Column(name = "img_path", nullable = false)
    private String imgPath;

    //Getter && Setter


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
        if(!this.storeMember.getImgPaths().contains(this)) {
            this.storeMember.getImgPaths().add(this);
        }
    }

    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    public static ImgPath create(StoreMember storeMember, String imgPath) {
        ImgPath imgPathObj = new ImgPath();
        imgPathObj.setStoreMember(storeMember);
        imgPathObj.setImgPath(imgPath);
        return imgPathObj;
    }
}
