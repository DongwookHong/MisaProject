package org.example.misa.service;

import org.example.misa.controller.StoreMemberForm;
import org.example.misa.domain.ImgPath;
import org.example.misa.domain.StoreMember;
import org.example.misa.repository.AdminRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

//관리자 서비스 (CRUD 가능)
@Transactional
public class TmplAdminService {

    AdminRepository adminRepository;
    ImgService imgService;

    public TmplAdminService(AdminRepository adminRepository, ImgService imgService) {
        this.adminRepository = adminRepository;
        this.imgService = imgService;
    }

    public List<String> convertToImagePaths(Set<ImgPath> imgPaths) {
        return imgPaths.stream()
                .map(ImgPath::getImgPath)  // StoreImage 객체의 imagePath 필드를 추출
                .collect(Collectors.toList()); // 리스트로 수집
    }

    public Set<ImgPath> makeImgPaths(List<String> urlList, StoreMember storeMember) {
        Set<ImgPath> imgPaths = new HashSet<>();
        for (String url : urlList) {
            ImgPath imgPath = new ImgPath();
            imgPath.setStoreMember(storeMember);
            imgPath.setImgPath(url);
            imgPaths.add(imgPath);
        }
        return imgPaths;
    }

    public String joinStoreMember(StoreMemberForm form) {
        StoreMember storeMember = new StoreMember();

        validateDuplicateStoreMember(form.getStoreName());

        storeMember.setImgPaths(makeImgPaths(imgService.upload(form.getFiles()), storeMember));

        storeMember.setStoreName(form.getStoreName());
        storeMember.setBusinessHour(form.getBusinessHour());
        storeMember.setInfo(form.getInfo());
//        storeMember.setStoreAddress(form.getStoreAddress());
        storeMember.setStoreNumber(form.getStoreNumber());
        storeMember.setHomePagePath(form.getHomePagePath());
        storeMember.setInstaPath(form.getInstaPath());

        try {
            adminRepository.save(storeMember);
        }
        catch (Exception e) {
            imgService.deleteImg(convertToImagePaths(storeMember.getImgPaths()));
            throw new IllegalStateException("Could not save image paths", e);
        }
        return storeMember.getStoreName();
    }

    private void validateDuplicateStoreMember(String storeName) {
        adminRepository.findByStoreName(storeName)
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 상점입니다.");
                });
    }

    public List<StoreMember> findAllStoreMember() {
        return adminRepository.findAll();
    }

    public Optional<StoreMember> findStoreMemberByStoreName(String storeName) {
        return adminRepository.findByStoreName(storeName);
    }

    public void deleteStoreMemberByStoreName(String storeName) {
    }
}
