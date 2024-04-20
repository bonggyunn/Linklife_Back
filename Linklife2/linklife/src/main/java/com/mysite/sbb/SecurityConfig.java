package com.mysite.sbb;

import com.mysite.sbb.post.filter.CustomAuthenticationFilter;
import com.mysite.sbb.post.filter.authorize.CustomAccessDeniedHandler;
import com.mysite.sbb.post.filter.authorize.CustomLoginAuthenticationEntryPoint;
import com.mysite.sbb.post.handler.CustomAuthenticationFailureHandler;
import com.mysite.sbb.post.handler.CustomAuthenticationSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.DelegatingSecurityContextRepository;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.RequestAttributeSecurityContextRepository;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
private final CustomAuthenticationFailureHandler customAuthenticationFailureHandler;
private final CustomLoginAuthenticationEntryPoint authenticationEntryPoint;
private final AuthenticationConfiguration authenticationConfiguration;
private final CustomAccessDeniedHandler accessDeniedHandler;

    public SecurityConfig(CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler, CustomAuthenticationFailureHandler customAuthenticationFailureHandler, CustomLoginAuthenticationEntryPoint authenticationEntryPoint, AuthenticationConfiguration authenticationConfiguration, CustomAccessDeniedHandler accessDeniedHandler) {
        this.customAuthenticationSuccessHandler = customAuthenticationSuccessHandler;
        this.customAuthenticationFailureHandler = customAuthenticationFailureHandler;
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.authenticationConfiguration = authenticationConfiguration;
        this.accessDeniedHandler = accessDeniedHandler;
    }

    @Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Bean
	AuthenticationManager authenticationManager()
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http
				.csrf(AbstractHttpConfigurer::disable)
				.cors(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(request -> request
						.requestMatchers("/api/**").authenticated()
						.anyRequest().permitAll())
				.addFilterBefore(ajaxAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
				.exceptionHandling(config -> config
						.authenticationEntryPoint(authenticationEntryPoint)
						.accessDeniedHandler(accessDeniedHandler));

		return http.build();
	}

	@Bean
	public CustomAuthenticationFilter ajaxAuthenticationFilter() throws Exception {
		CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter();
		customAuthenticationFilter.setAuthenticationManager(authenticationManager());
		customAuthenticationFilter.setAuthenticationSuccessHandler(customAuthenticationSuccessHandler);
		customAuthenticationFilter.setAuthenticationFailureHandler(customAuthenticationFailureHandler);

		// **
		customAuthenticationFilter.setSecurityContextRepository(
				new DelegatingSecurityContextRepository(
						new RequestAttributeSecurityContextRepository(),
						new HttpSessionSecurityContextRepository()
				));

		return customAuthenticationFilter;
	}



//	@Bean
//	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		http
//				.authorizeHttpRequests(authorizeRequests ->
//						authorizeRequests
//								.requestMatchers("/user/signup").permitAll() // 회원가입 엔드포인트에 대한 접근 허용
//								.anyRequest().permitAll() // 모든 엔드포인트에 대한 접근 허용
//				)
//				.csrf(AbstractHttpConfigurer::disable) // CSRF 보호 기능 비활성화
//
//				.headers(headers -> headers
//						.addHeaderWriter(new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN))
//				)
//				.formLogin(formLogin -> formLogin
//						.loginPage("/user/login").defaultSuccessUrl("/post/list")
//				)
//				.logout(logout -> logout
//						.logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
//						.logoutSuccessUrl("/").invalidateHttpSession(true)
//
//				);
//		return http.build();
//	}
}
