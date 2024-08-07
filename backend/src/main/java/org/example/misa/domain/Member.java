package org.example.misa.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table
@Getter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String role;
}
