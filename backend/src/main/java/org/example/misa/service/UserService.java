package org.example.misa.service;

import org.example.misa.repository.UserRepository;
import org.springframework.stereotype.Service;

//유저 서비스 (Read만 가능), DI 시 등록될 빈은 UserRepo, 비지니스 로직에 집중
@Service
public class UserService {
    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
