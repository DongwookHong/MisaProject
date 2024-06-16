package org.example.misa.service;

import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

public class ServerImgService implements ImgService {

    @Value("${filedir}")
    private String dir;
    @Override
    public List<String> upload(List<MultipartFile> files) {
        for (MultipartFile file : files) {
            if (Objects.isNull(file) || file.isEmpty()) {
//                throw new IllegalStateException("Empty or invalid file name");
                return Collections.emptyList();
            }
        }
        return this.uploadImg(files);
    }

    @Override
    public List<String> uploadImg(List<MultipartFile> files) {
        this.validateImgExtension(files);
        try {
            return this.uploadImgToDB(files);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to upload image", e);
        }
    }

    @Override
    public void validateImgExtension(List<MultipartFile> files) {
        List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "gif");

        for (MultipartFile file : files) {
            int extensionIndex = file.getOriginalFilename().lastIndexOf(".");

            if (extensionIndex == -1) {
                throw new IllegalStateException("No image extension");
            }

            String extension = file.getOriginalFilename().substring(extensionIndex + 1).toLowerCase();

            if (!ALLOWED_EXTENSIONS.contains(extension)) {
                throw new IllegalStateException("Unsupported image extension: " + extension);
            }
        }
    }

    @Override
    public List<String> uploadImgToDB(List<MultipartFile> files) throws IOException {
        List<String> urlList = new ArrayList<>();
        for (MultipartFile file : files) {
            String orinalFileName = file.getOriginalFilename();
            String newFileName = UUID.randomUUID().toString() + "_" + orinalFileName;

            File uploadDir = new File(dir);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            try {
                String filePath = uploadDir + "/" + newFileName;
                File dest = new File(filePath);
                file.transferTo(dest);
                urlList.add(filePath);
            } catch (IOException e) {
                throw new IllegalStateException("Failed to upload image", e);
            }
        }
        return urlList;
    }

    @Override
    public void deleteImg(List<String> imgPaths) {
        for (String imgPath : imgPaths) {
            File file = new File(imgPath);
            if (file.exists()) {
                file.delete();
            }
        }
    }
}
