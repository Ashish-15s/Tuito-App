package com.Tuito_App.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;

public class User {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @Column(unique = true)
    private String email;

    @Column
    private String phone;

    @Column
    private String password; // Will store hashed password

    private String firebaseUid;

    private LocalDateTime createdAt = LocalDateTime.now();
}
