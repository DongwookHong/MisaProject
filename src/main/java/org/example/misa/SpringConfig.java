package org.example.misa;

import org.example.misa.repository.*;
import org.example.misa.service.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    @Bean
    public AdminService adminService() {
        return new AdminService();
    }

    @Bean
    public UserService userService() {
        return new UserService();
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
