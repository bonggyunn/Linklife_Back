//package com.mysite.sbb.user;
//
//import io.jsonwebtoken.*;
//import org.springframework.security.core.Authentication;
//
//import java.util.Date;
//
//public class JwtTokenProvider {
//
//    private static final String SECRET_KEY = "your_secret_key"; // Replace with your secret key
//    private static final long TOKEN_VALIDITY_SECONDS = 3600; // 1 hour
//
//    public String generateToken(Authentication authentication) {
//        String username = authentication.getName();
//        Date now = new Date();
//        Date validity = new Date(now.getTime() + TOKEN_VALIDITY_SECONDS * 1000);
//
//        String claims = Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(now)
//                .setExpiration(validity)
//                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                .compact();
//
//        return "Bearer " + claims;
//    }
//
//    public boolean validateToken(String token) {
//        try {
//            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
//            return true;
//        } catch (SignatureException e) {
//            logger.error("Invalid JWT signature.");
//        } catch (MalformedJwtException e) {
//            logger.error("Invalid JWT token.");
//        } catch (ExpiredJwtException e) {
//            logger.error("Expired JWT token.");
//        } catch (UnsupportedJwtException e) {
//            logger.error("Unsupported JWT token.");
//        } catch (IllegalArgumentException e) {
//            logger.error("JWT token is null or empty.");
//        }
//        return false;
//    }
//
//    public String getUserNameFromToken(String token) {
//        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
//    }
//}
