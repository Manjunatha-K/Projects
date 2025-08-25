package com.portal.ExamServer.exception;

public class UserDoesNotExistsException extends RuntimeException{
    String message;

    public UserDoesNotExistsException(String message) {
        this.message = message;
    }

    public UserDoesNotExistsException() {
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
