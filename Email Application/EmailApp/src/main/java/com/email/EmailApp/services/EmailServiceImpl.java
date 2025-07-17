package com.email.EmailApp.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.logging.Logger;

@Service
public class EmailServiceImpl implements EmailService {

    private static final org.slf4j.Logger log = LoggerFactory.getLogger(EmailServiceImpl.class);

    private JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }


    //private Logger logger = (Logger) LoggerFactory.getLogger(EmailServiceImpl.class);

    @Override
    public void sendEmail(String to, String subject, String message) {

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);
        simpleMailMessage.setFrom("k.manjunath1518@gmail.com");
        mailSender.send(simpleMailMessage);
        //logger.info("Email has been sent");
    }

    @Override
    public void sendEmail(String[] to, String subject, String message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setFrom("k.manjunath1518@gmail.com");
        simpleMailMessage.setText(message);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setTo(to);

        mailSender.send(simpleMailMessage);
    }

    @Override
    public void sendEmailWithHTML(String to, String subject, String htmlContent) {

        MimeMessage simpleMailMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(simpleMailMessage, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom("k.manjunath1518@gmail.com");
            helper.setText(htmlContent, true);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendEmailWithFile(String to, String subject, String message, File file) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setFrom("k.manjunath1518@gmail.com");
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(message);

            FileSystemResource fileSystemResource = new FileSystemResource(file);

            mimeMessageHelper.addAttachment(fileSystemResource.getFilename(), file);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }
}
