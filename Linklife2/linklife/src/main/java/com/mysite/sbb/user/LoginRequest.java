package com.mysite.sbb.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    private String userid;
    @Setter
    @Getter
    private String password;
    // Getter 메서드들
    @Setter
    @Getter
    private String username;

    // 매개변수가 있는 생성자
    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

}
