package com.mysite.sbb.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    private String userid;
    private String password;
}
