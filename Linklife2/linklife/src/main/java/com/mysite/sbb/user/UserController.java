package com.mysite.sbb.user;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.security.Principal;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

	private final UserService userService;

	@PostMapping("/signup")
	public ResponseEntity<String> signup(@Valid @RequestBody UserCreateForm userCreateForm) {
		try {
			userService.create(userCreateForm.getUsername(), userCreateForm.getEmail(), userCreateForm.getPassword1());
			return ResponseEntity.ok("User registered successfully");
		} catch (DataIntegrityViolationException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	@GetMapping("/login")
	public String login() {
		return "login_form";
	}

//	@PostMapping("/signup")
//	public ApiResponse signup(@Valid @RequestBody UserCreateForm userCreateForm) {
//		try {
//			userService.create(userCreateForm.getUsername(), userCreateForm.getEmail(), userCreateForm.getPassword1());
//			return new ApiResponse("success", "User registered successfully");
//		} catch (DataIntegrityViolationException e) {
//			return new ApiResponse("error", "User already exists");
//		} catch (Exception e) {
//			return new ApiResponse("error", e.getMessage());
//		}
//	}



//	@GetMapping("/signup")
//	public String signup(UserCreateForm userCreateForm) {
//		return "signup_form";
//	}
//
//	@GetMapping("/info")
//	public ResponseEntity<SiteUser> userInfo(Principal principal) {
//		SiteUser user = this.userService.getUser(principal.getName());
//		return ResponseEntity.ok(user);
//	}



//	@PostMapping("/signup")
//	public String signup(@Valid UserCreateForm userCreateForm, BindingResult bindingResult) {
//		if (bindingResult.hasErrors()) {
//			return "signup_form";
//		}
//
//		if (!userCreateForm.getPassword1().equals(userCreateForm.getPassword2())) {
//			bindingResult.rejectValue("password2", "passwordInCorrect", "2개의 패스워드가 일치하지 않습니다.");
//			return "signup_form";
//		}
//
//		try {
//			userService.create(userCreateForm.getUsername(), userCreateForm.getEmail(), userCreateForm.getPassword1());
//		} catch (DataIntegrityViolationException e) {
//			e.printStackTrace();
//			bindingResult.reject("signupFailed", "이미 등록된 사용자입니다.");
//			return "signup_form";
//		} catch (Exception e) {
//			e.printStackTrace();
//			bindingResult.reject("signupFailed", e.getMessage());
//			return "signup_form";
//		}
//
//		return "redirect:/";
//	}


}
