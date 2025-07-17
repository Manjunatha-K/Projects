package com.email.EmailApp.services;

import org.springframework.stereotype.Service;

import java.io.File;

@Service
public interface EmailService {

    void sendEmail(String to, String subject,String message);

    void sendEmail(String []to, String subject,String message);

    void sendEmailWithHTML(String to, String subject,String htmlContent);

    void sendEmailWithFile(String to, String subject, String message, File file);
}
