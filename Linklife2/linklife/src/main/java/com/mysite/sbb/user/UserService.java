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

	public SiteUser getUser(String username) {
		Optional<SiteUser> siteUser = this.userRepository.findByusername(username);
		if (siteUser.isPresent()) {
			return siteUser.get();
		} else {

			throw new DataNotFoundException("siteuser not found");
		}
	}


	public boolean isValidUser(String username, String password) {
		// 데이터베이스에서 사용자를 조회합니다.
		Optional<SiteUser> optionalUser = userRepository.findByusername(username);

		// 사용자가 존재하는지 확인합니다.
		if (optionalUser.isPresent()) {
			SiteUser user = optionalUser.get();
			// 입력된 비밀번호와 저장된 비밀번호를 비교합니다.
			return passwordEncoder.matches(password, user.getPassword());
		} else {
			// 사용자가 존재하지 않는 경우
			return false;
		}
	}
}
