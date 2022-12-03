package com.library.springboot.library.dao;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

import lombok.*;

@Entity
@Getter
@NoArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String user_id; // 회원 아이디

    @Column(nullable = false, length = 200)
    private String user_pw; // 회원 이름

    @Column(nullable = false, length = 100)
    private String user_name; // 비밀번호

    @Column(nullable = false, length = 50)
    private String user_phone; // 폰번호

    @Column(nullable = false, length = 50)
    private int user_birth; // 생년월일

    @Column(nullable = false, length = 100)
    private String user_email; // 이메일

    @Enumerated(EnumType.STRING)
    private RoleType role; // 권한

    @CreationTimestamp // 시간 자동 입력
    private Timestamp create_date; // 생성 날짜

    @Builder
    public User(String user_id, String user_pw, String user_name, String user_phone, int user_birth, String user_email, RoleType role) {
        this.user_id = user_id;
        this.user_pw = user_pw;
        this.user_name = user_name;
        this.user_phone = user_phone;
        this.user_birth = user_birth;
        this.user_email = user_email;
        this.role = role;
    }

}
