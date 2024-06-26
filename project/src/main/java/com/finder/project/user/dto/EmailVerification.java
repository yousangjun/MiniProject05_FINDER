package com.finder.project.user.dto;

import lombok.Data;

@Data
public class EmailVerification {
    
    private String email;
    private String verificationCode;
}
