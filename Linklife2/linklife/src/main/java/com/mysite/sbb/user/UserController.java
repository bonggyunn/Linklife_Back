package com.mysite.sbb.user;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

//@RestController
@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

	private final UserService userService;

	// REST API 기반 로그인 처리
	@PostMapping("/api/login")
	public ResponseEntity<Map<String, Object>> apiLogin(@RequestBody LoginRequest loginRequest, HttpSession session) {
		String username = loginRequest.getUsername();
		String password = loginRequest.getPassword();

		SiteUser user = userService.login(username, password);  // 사용자 정보를 반환
		if (user != null) {
			session.setAttribute("username", user.getUsername());
			session.setMaxInactiveInterval(1800);  // 세션 유지 시간 30분 설정

			Map<String, Object> data = new HashMap<>();
			data.put("sessionId", session.getId());
			data.put("message", "로그인 성공!");

			return ResponseEntity.ok(data);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "존재하지 않는 아이디 또는 비밀번호입니다."));
		}
	}

	// 폼 기반 로그인 페이지
	@GetMapping("/login")
	public String loginPage(Model model) {
		model.addAttribute("loginRequest", new LoginRequest());
		return "login_form";  // login_form.html 반환
	}

	// REST API 기반 회원가입 처리
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

	// REST API 로그아웃 처리
	@PostMapping("/api/logout")
	public ResponseEntity<String> logout(HttpSession session) {
		session.invalidate();  // 세션 무효화
		return ResponseEntity.ok("로그아웃 성공!");
	}
}
