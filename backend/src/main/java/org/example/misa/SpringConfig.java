package org.example.misa;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.example.misa.component.ImgUtils;
import org.example.misa.component.JwtUtils;
import org.example.misa.component.ValidationUtils;
import org.example.misa.repository.*;
import org.example.misa.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SpringConfig {

    private final AmazonS3 s3Client;

    @Autowired
    SpringConfig(AmazonS3 s3Client) {
        this.s3Client = s3Client;
    }

    @Bean
    public AdminService adminService() {
        return new AdminService();
    }

    @Bean
    public ImgService imgService() {
        return new S3ImgService(s3Client);
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

}
