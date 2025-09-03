package com.portal.ExamServer.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExcptionHandler {


    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<String> userAlreadyExistsExceptionHandler(){
        return new ResponseEntity<>("User Already Exists", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserDoesNotExistsException.class)
    public ResponseEntity<String> userDoesNotExistsExceptionHandler(){
        return new ResponseEntity<>("User does not exists!!", HttpStatus.BAD_REQUEST);
    }
}
