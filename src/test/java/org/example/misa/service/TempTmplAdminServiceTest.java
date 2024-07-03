//package org.example.misa.service;
//
//import org.example.misa.controller.StoreMemberForm;
//import org.example.misa.domain.Floor;
//import org.example.misa.domain.ImgPath;
//import org.example.misa.domain.StoreMember;
//import org.example.misa.repository.BlockRepository;
//import org.example.misa.repository.FloorRepository;
//import org.example.misa.repository.StoreMemberRepository;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.ArrayList;
//import java.util.Iterator;
//import java.util.List;
//
//@SpringBootTest
//@Transactional
//class TempTmplAdminServiceTest {
//
//    @Autowired private StoreMemberRepository storeMemberRepository;
//    @Autowired private FloorRepository floorRepository;
//    @Autowired private BlockRepository blockRepository;
//    @Autowired private AdminService adminService;
//
//    @Test
//    void join() {
//        //given
//        Floor floor = new Floor();
//        floor.setFloor("1");
//        floor.setBuildingName("A");
//        floor.setFloorImgPath("url1");
//        floorRepository.save(floor);
//
//        Floor floor1 = new Floor();
//        floor1.setFloor("2");
//        floor1.setBuildingName("A");
//        floor1.setFloorImgPath("url1");
//        floorRepository.save(floor1);
//
//        MockMultipartFile image = new MockMultipartFile(
//                "test", // 파일의 파라미터 이름
//                "spring.png", // 실제 파일 이름
//                "image/png", // 파일의 확장자 타입
//                new byte[1]
//        );
//        List<MultipartFile> files = new ArrayList<>();
//        files.add(image);
//
//        //blockId exists
//
////        Block block = new Block(floor, "svg_misa");
////        blockRepository.save(block);
////
////        Block block1 = new Block(floor1, "svg_mmisa");
////        blockRepository.save(block1);
//
//        //storemember exists
////        StoreMember storeMember = new StoreMember();
////        storeMember.setStoreName("Misa");
////        storeMember.setBlock(block);
////        storeMemberRepository.save(storeMember);
//
//
//        StoreMemberForm form = new StoreMemberForm();
//        form.setFloor("1");
//        form.setBuildingName("A");
//        form.setStoreName("misa");
//        form.setBlockId("svg_misa");
//
//        form.setFiles(files);
//        //when
//        adminService.join(form);
//    }
//
//    @Test
//    void convertToImagePaths() {
//    }
//
//    @Test
//    void makeImgPaths() {
//    }
//
//    @Test
//    void findStoreMembers() {
//        join();
//        List<StoreMember> storeMembers = adminService.findStoreMembers();
//        for (StoreMember storeMember : storeMembers) {
//            System.out.println("상점이름: " + storeMember.getStoreName());
//            Iterator<ImgPath> iterator = storeMember.getImgPaths().iterator();
//            while (iterator.hasNext()) {
//                System.out.println("상점사진: " + iterator.next().getImgPath());
//            }
//            System.out.println("상점블럭: " + storeMember.getBlock().getBlockId());
//            System.out.println("상점층수: " + storeMember.getBlock().getFloor().getFloor());
//            System.out.println("상점건물: " + storeMember.getBlock().getFloor().getBuildingName());
//        }
//    }
//
//    @Test
//    void findStoreMember() {
//    }
//}