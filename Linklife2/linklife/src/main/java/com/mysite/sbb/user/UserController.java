package com.mysite.sbb.user;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

//@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/api/login")
	public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
		String userid = loginRequest.getUserid();
		String password = loginRequest.getPassword();

		// 사용자 이름(userid)과 비밀번호(password)를 사용하여 로그인 시도
		if (userService.isValidUser(userid, password)) {
			// 세션 생성
			session.setAttribute("user", loginRequest);

			// 세션 데이터 준비
			Map<String, Object> data = new HashMap<>();
			data.put("sessionId", session.getId());
			data.put("message", "로그인 성공!");

			// 세션 데이터 포함하여 성공 응답 반환
			return ResponseEntity.ok(data.toString());
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("존재하지 않는 아이디 또는 비밀번호입니다.");
		}
	}
	@PostMapping("/signup")
	public ResponseEntity<String> signup(@Valid @RequestBody UserCreateForm userCreateForm) {
		try {
			userService.create(userCreateForm.getUsername(), userCreateForm.getEmail(),
					userCreateForm.getPassword1(), userCreateForm.getUserid(), userCreateForm.getPhonenumber());
			return ResponseEntity.ok("User registered successfully");
		} catch (DataIntegrityViolationException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

//	@PostMapping("/session_create")
//	public Map<String, Object> createSession(@RequestBody LoginRequest loginRequest, HttpSession session) {
//		Map<String, Object> data = new HashMap<>();
//
//		session.setAttribute("user", loginRequest);
//
//		data.put("sessionId", session.getId());
//
//		return data;
//	}
}




