package com.mysite.sbb.post;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostForm {
	@NotEmpty(message = "행사명은 필수항목입니다.")
	@Size(max = 200)
	private String subject;

	@NotEmpty(message = "행사 내용은 필수항목입니다.")
	private String content;

	@NotEmpty(message = "행사 장소는 필수항목입니다.")
	private String eventLocation;

	// 행사 시작 날짜와 종료 날짜를 받을 필드
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime eventStartDateTime;

	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime eventEndDateTime;

	// 이미지 파일 필드 추가
	private MultipartFile image;
}
