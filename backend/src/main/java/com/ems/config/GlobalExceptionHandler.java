package com.ems.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({Exception.class})
    public ResponseEntity<HttpErrorResponse> handleGenericException(Exception e){
        e.printStackTrace();

        return ResponseEntity.badRequest().body(new HttpErrorResponse<>(null, e.getLocalizedMessage()));
    }
    
}
