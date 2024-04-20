package com.mysite.sbb.post.filter;
import com.mysite.sbb.user.SiteUser;
import com.mysite.sbb.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    
    // JPA 사용, Mybatis 사용시 mapper를 등록하셔서 user 정보를 받아오시면 됩니다.
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        SiteUser entity = userRepository.findByusername(username)
                .orElseThrow(() -> new UsernameNotFoundException("username not found"));

        return (UserDetails) entity;
    }
}
