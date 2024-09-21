package com.example.back.exceptions;

public class InvalidVehiculoException extends RuntimeException {
    public InvalidVehiculoException(String message) {
        super(message);
    }
}
