package org.example.misa.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.*;
/*
상점 이미지와 지도 이미지는 다른 폴더로 관리?
 */
public class S3ImgService implements ImgService {

    private final AmazonS3 S3Client;

    public S3ImgService(AmazonS3 s3Client) {
        S3Client = s3Client;
    }

    @Value("${cloud.aws.s3.bucketName}")
    private String bucketName;

    @Value("${cloud.aws.s3.folderName}")
    private String folderName;

    @Value("${cloud.aws.cloudfront.domain}")
    private String cloudFrontDomain;

    @Override
    public List<String> upload(List<MultipartFile> files) {
        if (Objects.isNull(files) || files.isEmpty()) {
            throw new IllegalStateException("Empty or invalid file name");
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
            String originalFileName = file.getOriginalFilename();
            String extension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
            String S3FileName = folderName + "/" + UUID.randomUUID().toString() + "_" + originalFileName;

            InputStream inputStream = file.getInputStream();
            byte[] bytes = IOUtils.toByteArray(inputStream);
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

            ObjectMetadata objectMetadata = new ObjectMetadata();
//            objectMetadata.setContentType("img/" + extension);
            objectMetadata.setContentType(extension);
            objectMetadata.setContentLength(bytes.length);

            try {
                PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, S3FileName, byteArrayInputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.Private);
                S3Client.putObject(putObjectRequest); //send to S3
            } catch (Exception e) {
                throw new AmazonS3Exception("Failed to upload image", e);
            } finally {
                inputStream.close();
                byteArrayInputStream.close();
            }
            urlList.add(cloudFrontDomain + "/" + S3FileName);
        }
        return urlList;
    }

    @Override
    public void deleteImg(List<String> imgPaths) {
        for (String imgPath : imgPaths) {
            String key = getKeyFromImgUrl(imgPath);
            try {
                S3Client.deleteObject(bucketName, key);
            } catch (AmazonS3Exception e) {
                throw new AmazonS3Exception("Failed to delete image " + imgPath, e);
            }
        }
    }

    public String getKeyFromImgUrl(String imgPath) {
        try {
            URL url = new URL(imgPath);
            String key = URLDecoder.decode(url.getPath(), "UTF-8");
            return key.substring(1);
        } catch (MalformedURLException | UnsupportedEncodingException e) {
            throw new AmazonS3Exception("Invalid image path: " + imgPath);
        }
    }
}
