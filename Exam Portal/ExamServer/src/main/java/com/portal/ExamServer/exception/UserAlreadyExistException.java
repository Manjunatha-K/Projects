package com.portal.ExamServer.exception;



public class UserAlreadyExistException extends RuntimeException{


    public UserAlreadyExistException() {
        super("User Already Exists !! Try with different Username");

    }

    public UserAlreadyExistException(String message) {
        super(message);
    }


}
