package org.example.misa.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImgService {
    public List<String> upload(List<MultipartFile> files); //check if img is null
    public List<String> uploadImg(List<MultipartFile> files); //return url path
    public void validateImgExtension(List<MultipartFile> files); //check if img is valid
    public List<String> uploadImgToDB(List<MultipartFile> files) throws IOException;
    public void deleteImg(List<String> imgPaths);
}
