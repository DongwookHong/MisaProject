package org.example.misa.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImgService {
    List<String> upload(List<MultipartFile> files); //check if img is null
    List<String> uploadImg(List<MultipartFile> files); //return url path
    void validateImgExtension(List<MultipartFile> files); //check if img is valid
    List<String> uploadImgToDB(List<MultipartFile> files) throws IOException;
    void deleteImg(List<String> imgPaths);
}
