package org.example.misa.service;

import org.example.misa.domain.Floor;
import org.example.misa.domain.StoreMember;
import org.example.misa.repository.FloorRepository;
import org.example.misa.repository.StoreMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//유저 서비스 (Read만 가능), DI 시 등록될 빈은 UserRepo, 비지니스 로직에 집중
@Service
public class UserService {
    @Autowired private StoreMemberRepository storeMemberRepository;
    @Autowired private FloorRepository floorRepository;

    public List<StoreMember> findStoreMembers() {
        return storeMemberRepository.findAll();
    }
    public StoreMember findStoreMember(String storeName) {
        return storeMemberRepository.findByStoreName(storeName);
    }

    public List<Floor> findFloors() {
        return floorRepository.findAll();
    }
}
