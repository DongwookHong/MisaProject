package org.example.misa.service;

import org.example.misa.domain.Floor;
import org.example.misa.domain.StoreMember;
import org.example.misa.repository.FloorRepository;
import org.example.misa.repository.StoreMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired private StoreMemberRepository storeMemberRepository;
    @Autowired private FloorRepository floorRepository;

    public StoreMember findStoreMember(String storeName) {
        return storeMemberRepository.findByStoreName(storeName)
                .orElseThrow(()-> new IllegalStateException("Store does not exist"));
    }

    public List<Floor> findFloors() {
        return floorRepository.findAll();
    }
}
