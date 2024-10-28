package com.mysite.sbb.user;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final JwtTokenProvider jwtTokenProvider;

	@Autowired
	public UserController(UserService userService, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
		this.userService = userService;
		this.authenticationManager = authenticationManager;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@PostMapping("/api/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
		);

		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		String token = jwtTokenProvider.createToken(userDetails.getUsername(), userDetails.getAuthorities().toString());

		return ResponseEntity.ok(new ApiResponse(token));
	}

	@PostMapping("/api/signup")
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

	@GetMapping("/mypage")
	public ResponseEntity<UserDTO> getMyPage(@AuthenticationPrincipal UserDetails userDetails) {
		UserDTO userDto = userService.getUserDetails(userDetails.getUsername());
		return ResponseEntity.ok(userDto);
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





