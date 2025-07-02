package com.ems.config;

import org.springframework.http.HttpStatusCode;


public class HttpErrorResponse<T> {
    
    T data;
    String errorMessage;
    // HttpStatusCode httpStatusCode;

    HttpErrorResponse(T data,String errorMessage){
        this.data = data;
        this.errorMessage =errorMessage;
    }
}
