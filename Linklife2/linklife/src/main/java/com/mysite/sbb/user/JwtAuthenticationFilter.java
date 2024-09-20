//package com.mysite.sbb.user;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.JwtException;
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import com.mysite.sbb.user.JwtTokenProvider;
//
//public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
//
//    private final JwtTokenProvider jwtTokenProvider;
//
//    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
//        this.jwtTokenProvider = jwtTokenProvider;
//    }
//
//    @Override
//    protected Authentication attemptAuthentication(HttpServletRequest request) {
//        String token = request.getHeader("Authorization");
//
//        if (token != null && token.startsWith("Bearer ")) {
//            String jwtToken = token.substring(7);
//            try {
//                boolean claims = jwtTokenProvider.validateToken(jwtToken);
//                String username = claims.getSubject();
//                if (username != null) {
//                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//                    if (userDetails != null) {
//                        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//                    }
//                }
//            } catch (JwtException e) {
//                throw new BadCredentialsException(e.getMessage());
//            }
//        }
//
//        return super.attemptAuthentication(request);
//    }
//}
