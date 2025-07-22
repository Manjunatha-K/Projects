package com.email.EmailApp.controllers;

import com.email.EmailApp.model.CustomResponse;
import com.email.EmailApp.model.EmailRequest;
import com.email.EmailApp.services.EmailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.DataInput;
import java.io.IOException;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequest request) {
        emailService.sendEmailWithHTML(request.getTo(), request.getSubject(), request.getMessage());
        return ResponseEntity.ok(CustomResponse.builder().message("Email sent successfully !!")
                .httpStatus(HttpStatus.OK).success(true).build());
    }

    @PostMapping("/send-with-file")
    public ResponseEntity<?> sendEmailWithFile(@RequestParam("request") EmailRequest request,@RequestPart("file") MultipartFile file) throws IOException {
        emailService.sendEmailWithFile(request.getTo(), request.getSubject(), request.getMessage(),file.getResource().getFile());
        return ResponseEntity.ok(CustomResponse.builder().message("Email sent successfully !!")
                .httpStatus(HttpStatus.OK).success(true).build());
    }
}
