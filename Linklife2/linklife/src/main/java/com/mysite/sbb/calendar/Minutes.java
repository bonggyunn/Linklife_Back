package com.mysite.sbb.calendar;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import jakarta.persistence.Id;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
public class Minutes {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private Long userId;

    @Column
    private Long teamId;

    @Column
    private String date;

    @Column
    private String title;

    @Column
    private String content;

    public void update(String title, String content, Long userId) {
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
}
