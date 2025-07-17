package com.email.EmailApp;

import com.email.EmailApp.services.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;

@SpringBootTest
public class EmailSenderTest {

    @Autowired
    private EmailService emailService;

    @Test
    void emailSendTest(){
        System.out.println("Sending Email");
        emailService.sendEmail("k.manjunatha1518@gmail.com","TEST Mail FROM SPRINGBOOT","This is a test mail");
    }

    @Test
    void sendHTMLInMail(){
        System.out.println("Sending Email with HTML");
        emailService.sendEmailWithHTML("k.manjunatha1518@gmail.com","MULTIPART", "<h1 style ='color:red'>HELLO FROM HEML<h1/>");
    }
    @Test
    void sendHtmlwithFile(){
        System.out.println("Sending Email with File");
        emailService.sendEmailWithFile("k.manjunatha1518@gmail.com","MULTIPART", "TEST MESSAGE IN AREA",new File("C:/GitHub/Projects/Email Application/EmailApp/src/main/resources/static/index.html"));
    }

}
