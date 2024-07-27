package org.example.misa.service;

import org.apache.coyote.BadRequestException;
import org.example.misa.DTO.LoginDTO;
import org.example.misa.component.JwtUtils;
import org.example.misa.controller.StoreMemberForm;
import org.example.misa.domain.*;
import org.example.misa.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminService {

    @Autowired private JwtUtils jwtUtils;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private MemberRepository memberRepository;
    @Autowired private StoreMemberRepository storeMemberRepository;
    @Autowired private FloorRepository floorRepository;
    @Autowired private BlockRepository blockRepository;
    @Autowired private ImgService imgService;

    public String login(LoginDTO loginDTO) {
        Member member = memberRepository.findByUsername(loginDTO.getUsername());
        if (member == null) {
            throw new IllegalStateException("member not found");
        }

        if (!passwordEncoder.matches(loginDTO.getPassword(), member.getPassword())) {
            throw new IllegalStateException("wrong password");
        }

        return jwtUtils.generateAccessToken(member);
    }

    public String update(String storeName, StoreMemberForm form, List<MultipartFile> files) {
        Floor floor = validateExistFloorAndBuilding(form.getFloor(), form.getBuildingName(), form.getBuildingDong());
        Block block = validateDuplicateBlockId(Long.parseLong(form.getBlockId()), floor);

        StoreMember storeMember = storeMemberRepository.findByStoreName(storeName);

        if (storeMember == null) {
            throw new IllegalStateException("Store does not exist");
        }

        storeMember.update(form);
        storeMember.setBlock(block);

        if (!files.isEmpty()) {
            imgService.deleteImg(convertToImagePaths(storeMember.getImgPaths()));
            updateImgPaths(files, storeMember);
        }

        try {
            storeMember = storeMemberRepository.save(storeMember);
        } catch (Exception e) {
            imgService.deleteImg(convertToImagePaths(storeMember.getImgPaths()));
            throw new IllegalStateException("Could not save storeMember", e);
        }
        return storeMember.getStoreName();
    }

    public String join(StoreMemberForm form, List<MultipartFile> files) {
        validateDuplicateStoreMember(form.getStoreName());
        Floor floor = validateExistFloorAndBuilding(form.getFloor(), form.getBuildingName(), form.getBuildingDong());
        Block block = validateDuplicateBlockId(Long.parseLong(form.getBlockId()), floor);

        StoreMember storeMember = StoreMember.create(form);
        storeMember.setBlock(block);
        saveImgPaths(files, storeMember);

        try {
            storeMember = storeMemberRepository.save(storeMember);
        } catch (Exception e) {
            imgService.deleteImg(convertToImagePaths(storeMember.getImgPaths()));
            throw new IllegalStateException("Could not save storeMember", e);
        }

        return storeMember.getStoreName();
    }

    public String delete(String storeName) {
        StoreMember storeMember = storeMemberRepository.findByStoreName(storeName);
        if (storeMember == null) {
            throw new IllegalStateException("Store does not exist: " + storeName);
        }
        imgService.deleteImg(convertToImagePaths(storeMember.getImgPaths()));
        storeMemberRepository.delete(storeMember);
        return storeName;
    }

    private Floor validateExistFloorAndBuilding(String floorName, String buildingName, String buildingDong) {
        Floor floor = floorRepository.findByFloorAndBuildingNameAndBuildingDong(floorName,buildingName, buildingDong);

        if (floor == null) {
            throw new IllegalStateException("해당 건물 혹은 층이 존재하지 않습니다.");
        }

        return floor;
    }

    private Block validateDuplicateBlockId(Long area, Floor floor) {
        Block block = blockRepository.findByAreaAndFloorId(area, floor.getId());

        if (block == null) {
            block = new Block(floor, area, "store");
            try {
                block = blockRepository.save(block);
            } catch (Exception e) {
                throw new IllegalStateException("Failed to add block", e);
            }
        }

        return block;
    }

    private void validateDuplicateStoreMember(String storeName) {
        if (storeMemberRepository.findByStoreName(storeName) != null) {
            throw new IllegalStateException("이미 존재하는 상점입니다.");
        }
    }

    private void updateImgPaths(List<MultipartFile> files, StoreMember storeMember) {
        List<String> urlList = imgService.upload(files);
        storeMember.updateImgPaths(urlList);
    }

    private void saveImgPaths(List<MultipartFile> files, StoreMember storeMember) {
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

    public List<StoreMember> findStoreMembers() {
        return storeMemberRepository.findAll();
    }
    public StoreMember findStoreMember(String storeName) {
        return storeMemberRepository.findByStoreName(storeName);
    }

}
