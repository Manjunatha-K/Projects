package com.portal.ExamServer.exception;



public class UserAlreadyExistException extends RuntimeException{
    String message;

    public UserAlreadyExistException(String message) {
        super(message);
    this.message = message;
    }

    public UserAlreadyExistException() {
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
