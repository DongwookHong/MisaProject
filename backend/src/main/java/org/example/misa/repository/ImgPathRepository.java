package org.example.misa.repository;

import org.example.misa.domain.ImgPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImgPathRepository extends JpaRepository<ImgPath, Long> {
    ImgPath findByImgPath(String imgPath);
}
