package org.example.misa;

import jakarta.persistence.EntityManager;
import org.example.misa.repository.*;
import org.example.misa.service.AdminService;
import org.example.misa.service.ImgService;
import org.example.misa.service.ServerImgService;
import org.example.misa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class SpringConfig {

    private final AdminRepository adminRepository;
    private final UserRepository userRepository;



    public SpringConfig(AdminRepository adminRepository, UserRepository userRepository) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
    }

    @Bean
    public UserService userService() {
        return new UserService(userRepository);
    }

    @Bean
    public AdminService adminService() {
        return new AdminService(adminRepository, imgService());
    }

    @Bean
    public ImgService imgService() {
        return new ServerImgService();
    }

//    @Bean
//    public AdminRepository adminRepository() {
////        return new JdbcTemplateAdminRepository(dataSource);
//        return new JpaAdminRepository(em);
//    }
}
