package com.mysite.sbb.calendar;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MinutesForm {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("userId")
    private Long userId;

    @JsonProperty("teamId")
    private Long teamId;

    @JsonProperty("date")
    private String date;

    @JsonProperty("title")
    private String title;

    @JsonProperty("content")
    private String content;

    // dto -> entity 연결
    public Minutes toEntity() {
        return new Minutes(id, userId, teamId, date, title, content);
    }
}
