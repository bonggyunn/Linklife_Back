package com.mysite.sbb.user;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mysite.sbb.DataNotFoundException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	// 새로운 사용자 생성 메서드
	public SiteUser create(String username, String email, String password, String userid, String phonenumber) {
		SiteUser user = new SiteUser();
		user.setUserid(userid);
		user.setEmail(email);
		user.setPhonenumber(phonenumber);
		user.setUsername(username);
		user.setPassword(passwordEncoder.encode(password));
		this.userRepository.save(user);
		return user;
	}

	// username을 통해 사용자 정보 조회
	public SiteUser getUser(String username) {
		Optional<SiteUser> siteUser = this.userRepository.findByUsername(username);  // 대소문자 주의!
		if (siteUser.isPresent()) {
			return siteUser.get();
		} else {
			throw new DataNotFoundException("siteuser not found");
		}
	}

	// username과 password가 유효한지 확인하는 메서드
	public boolean isValidUser(String username, String password) {
		Optional<SiteUser> optionalUser = userRepository.findByUsername(username);  // 대소문자 주의!

		if (optionalUser.isPresent()) {
			SiteUser user = optionalUser.get();
			return passwordEncoder.matches(password, user.getPassword());
		} else {
			return false;
		}
	}

	// 사용자 ID로 사용자 정보 조회
	public SiteUser getUserById(Long userId) {
		return userRepository.findById(userId)
				.orElseThrow(() -> new DataNotFoundException("사용자를 찾을 수 없습니다."));
	}

	// username을 통해 사용자 정보를 가져오는 메소드
	public SiteUser getUserByUsername(String username) {
		return userRepository.findByUsername(username)  // 대소문자 주의!
				.orElseThrow(() -> new DataNotFoundException("사용자를 찾을 수 없습니다."));
	}

	// 로그인 메서드
	public SiteUser login(String username, String password) {
		Optional<SiteUser> userOptional = userRepository.findByUsername(username);  // 대소문자 주의!

		if (userOptional.isPresent()) {
			SiteUser user = userOptional.get();

			// 비밀번호 확인
			if (passwordEncoder.matches(password, user.getPassword())) {
				return user;  // 비밀번호가 맞으면 사용자 반환
			}
		}
		return null;  // 비밀번호가 틀리거나 사용자가 없으면 null 반환
	}
}
