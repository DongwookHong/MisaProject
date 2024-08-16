package org.example.misa.service;

import org.apache.coyote.BadRequestException;
import org.example.misa.DTO.LoginDTO;
import org.example.misa.component.ImgUtils;
import org.example.misa.component.JwtUtils;
import org.example.misa.component.ValidationUtils;
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
public class AdminService {

    @Autowired private JwtUtils jwtUtils;
    @Autowired private ImgUtils imgUtils;
    @Autowired private ValidationUtils validationUtils;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private MemberRepository memberRepository;
    @Autowired private StoreMemberRepository storeMemberRepository;
    @Autowired private ImgService imgService;

    public String login(LoginDTO loginDTO) {
        Member member = memberRepository.findByUsername(loginDTO.getUsername()).orElseThrow(()-> new IllegalStateException("member not found"));

        if (!passwordEncoder.matches(loginDTO.getPassword(), member.getPassword())) {
            throw new IllegalStateException("wrong password");
        }

        return jwtUtils.generateAccessToken(member);
    }

    @Transactional
    public String update(String storeName, StoreMemberForm form, List<MultipartFile> files) {
        Floor floor = validationUtils.validateExistFloorAndBuilding(form.getFloor(), form.getBuildingName(), form.getBuildingDong());
        Block block = validationUtils.validateDuplicateBlockId(Long.parseLong(form.getBlockId()), floor);

        StoreMember storeMember = storeMemberRepository.findByStoreName(storeName)
                .orElseThrow(()-> new IllegalStateException("Store does not exist"));

        storeMember.update(form);
        storeMember.setBlock(block);
        imgService.deleteImg(imgUtils.convertToImagePaths(storeMember.getImgPaths()));
        imgUtils.updateImgPaths(files, storeMember);

        try {
            storeMember = storeMemberRepository.save(storeMember);
        } catch (Exception e) {
            imgService.deleteImg(imgUtils.convertToImagePaths(storeMember.getImgPaths()));
            throw new IllegalStateException("Could not save storeMember", e);
        }
        return storeMember.getStoreName();
    }

    @Transactional
    public String join(StoreMemberForm form, List<MultipartFile> files) {
        validationUtils.validateDuplicateStoreMember(form.getStoreName());
        Floor floor = validationUtils.validateExistFloorAndBuilding(form.getFloor(), form.getBuildingName(), form.getBuildingDong());
        Block block = validationUtils.validateDuplicateBlockId(Long.parseLong(form.getBlockId()), floor);

        StoreMember storeMember = StoreMember.create(form);
        storeMember.setBlock(block);
        imgUtils.saveImgPaths(files, storeMember);

        try {
            storeMember = storeMemberRepository.save(storeMember);
        } catch (Exception e) {
            imgService.deleteImg(imgUtils.convertToImagePaths(storeMember.getImgPaths()));
            throw new IllegalStateException("Could not save storeMember", e);
        }

        return storeMember.getStoreName();
    }

    @Transactional
    public String delete(String storeName) {

        StoreMember storeMember = storeMemberRepository.findByStoreName(storeName)
                .orElseThrow(()-> new IllegalStateException("Store does not exist"));

        imgService.deleteImg(imgUtils.convertToImagePaths(storeMember.getImgPaths()));
        storeMemberRepository.delete(storeMember); // delete 실패시 이미지 복원 필요한가?
        return storeName;
    }
}
