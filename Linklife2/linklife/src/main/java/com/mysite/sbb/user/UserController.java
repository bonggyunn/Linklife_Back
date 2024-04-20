package com.mysite.sbb.user;

import jakarta.servlet.http.HttpSession;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

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
	public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
		String userid = loginRequest.getUserid();
		String password = loginRequest.getPassword();

		// 사용자 이름(username)과 비밀번호(password)를 사용하여 로그인 시도
		if (userService.isValidUser(userid, password)) {
			return ResponseEntity.ok("로그인 성공!!");
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

	@PostMapping("/session_create")
	public Map<String, Object> createSession(@RequestBody LoginRequest loginRequest, HttpSession session) {
		Map<String, Object> data = new HashMap<>();

		session.setAttribute("user", loginRequest);

		data.put("sessionId", session.getId());

		return data;
	}
}




