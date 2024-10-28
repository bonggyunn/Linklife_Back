package com.mysite.sbb.user;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;

@Getter
@Setter
public class ApiResponse {
    private String status;
    private String message;
    private String token;
    private String username;

    public ApiResponse(String status, String token, String username) {
        this.status = status;
        this.token = token;
        this.username = username;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
