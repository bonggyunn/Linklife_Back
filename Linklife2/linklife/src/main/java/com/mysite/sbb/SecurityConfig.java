package com.mysite.sbb;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.authorizeHttpRequests(authorizeRequests ->
						authorizeRequests
								.requestMatchers("/user/signup").permitAll() // 회원가입 엔드포인트에 대한 접근 허용
								.requestMatchers("/user/login").permitAll()
								.requestMatchers("/post/create").authenticated()
								.anyRequest().permitAll() // 모든 엔드포인트에 대한 접근 허용
				)
				.csrf(AbstractHttpConfigurer::disable) // CSRF 보호 기능 비활성화
				.headers(headers -> headers
						.addHeaderWriter(new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN))
				)
				.formLogin(formLogin -> formLogin
						.loginPage("/user/login").defaultSuccessUrl("/post/list")
				)
				.logout(logout -> logout
						.logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
						.logoutSuccessUrl("/").invalidateHttpSession(true)
				);
		return http.build();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
}
