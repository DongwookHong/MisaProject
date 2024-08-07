package org.example.misa;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import org.example.misa.component.JwtUtils;
import org.example.misa.repository.*;
import org.example.misa.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    @Autowired AmazonS3 s3Client;

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
        return new S3ImgService(s3Client);
    }

}
