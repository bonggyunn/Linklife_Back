package com.mysite.sbb.user;

import java.util.Optional;

import com.mysite.sbb.DataNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
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
		return this.userRepository.findByUsername(username)
				.orElseThrow(() -> new DataNotFoundException("siteuser not found"));
	}

	public boolean isValidUser(String username, String password) {
		Optional<SiteUser> optionalUser = userRepository.findByUsername(username);
		if (optionalUser.isPresent()) {
			SiteUser user = optionalUser.get();
			return passwordEncoder.matches(password, user.getPassword());
		} else {
			return false;
		}
	}

	public UserDTO getUserDetails(String username) {
		SiteUser siteuser = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		return new UserDTO(siteuser.getUserid(), siteuser.getEmail(), siteuser.getPhonenumber(), siteuser.getUsername());
	}
}
