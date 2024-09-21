package com.mysite.sbb;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.authorizeHttpRequests(authorizeRequests ->
						authorizeRequests
								// API 경로는 모두 인증 없이 접근 가능하게 설정
								.requestMatchers("/user/api/**").permitAll()
								// 로그인 페이지와 회원가입 페이지는 인증 없이 접근 가능
								.requestMatchers("/user/signup", "/user/login").permitAll()
								// 그 외 경로는 인증 필요
								.anyRequest().authenticated()
				)
				.csrf(csrf -> csrf
						.ignoringRequestMatchers("/user/api/**", "/post/**")  // API 경로에 대해 CSRF 비활성화
				)
				.headers(headers -> headers
						.frameOptions(frameOptions -> frameOptions.sameOrigin())  // H2 콘솔 frame 허용
				)
				.formLogin(formLogin -> formLogin
						.loginPage("/user/login")  // 폼 기반 로그인 페이지 설정
						.defaultSuccessUrl("/post/list", true)  // 로그인이 성공하면 해당 URL로 이동
						.permitAll()  // 로그인 페이지 접근 허용
				)
				.logout(logout -> logout
						.logoutUrl("/user/logout")
						.logoutSuccessUrl("/")  // 로그아웃 후 이동 경로
				)
				// 세션 관리 정책 추가: 세션이 필요할 때만 생성
				.sessionManagement(sessionManagement ->
						sessionManagement.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
				);

		return http.build();
	}
}