package org.example.misa.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table
public class ImgPath {

    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private StoreMember storeMember;

    @Column(name = "img_path", nullable = false)
    private String imgPath;

    public void update(String imgPath) {
        this.imgPath = imgPath;
    }

    public static ImgPath create(StoreMember storeMember, String imgPath) {
        ImgPath imgPathObj = new ImgPath();
        imgPathObj.setStoreMember(storeMember);
        imgPathObj.setImgPath(imgPath);
        return imgPathObj;
    }
}
