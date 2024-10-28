package com.mysite.sbb.user;

public class UserDTO {
    private String userid;
    private String email;
    private String phonenumber;
    private String username;

    public UserDTO(String userid, String email, String phonenumber, String username) {
        this.userid = userid;
        this.email = email;
        this.phonenumber = phonenumber;
        this.username = username;
    }

    // Getters와 Setters 추가
}