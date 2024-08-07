package org.example.misa.component;

import org.example.misa.domain.ImgPath;
import org.example.misa.domain.StoreMember;
import org.example.misa.service.ImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public final class ImgUtils {
    @Autowired private ImgService imgService;

    public void updateImgPaths(List<MultipartFile> files, StoreMember storeMember) {
        List<String> urlList = imgService.upload(files);
        storeMember.updateImgPaths(urlList);
    }

    public void saveImgPaths(List<MultipartFile> files, StoreMember storeMember) {
        storeMember.setImgPaths(makeImgPaths(imgService.upload(files), storeMember));
    }

    public List<String> convertToImagePaths(List<ImgPath> imgPaths) {
        return imgPaths.stream()
                .map(ImgPath::getImgPath)  // StoreImage 객체의 imagePath 필드를 추출
                .collect(Collectors.toList()); // 리스트로 수집
    }

    public List<ImgPath> makeImgPaths(List<String> urlList, StoreMember storeMember) {
        List<ImgPath> imgPaths = new ArrayList<>(5);
        for (String url : urlList) {
            imgPaths.add(ImgPath.create(storeMember, url));
        }
        return imgPaths;
    }
}
