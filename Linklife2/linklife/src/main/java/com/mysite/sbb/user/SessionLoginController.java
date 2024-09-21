package com.mysite.sbb.user;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/session-login")
public class SessionLoginController {

    private final UserService userService;

    // 로그인 페이지 (웹)
    @GetMapping("/login")
    public String loginPage(Model model) {
        model.addAttribute("loginType", "session-login");
        model.addAttribute("pageName", "세션 로그인");
        model.addAttribute("loginRequest", new LoginRequest());
        return "login_form";  // login_form.html 파일을 반환
    }

    // 로그인 처리 (웹)
    @PostMapping("/login")
    public String login(@ModelAttribute LoginRequest loginRequest, BindingResult bindingResult,
                        HttpServletRequest httpServletRequest, Model model) {
        model.addAttribute("loginType", "session-login");
        model.addAttribute("pageName", "세션 로그인");

        // UserService를 사용하여 로그인 처리
        SiteUser user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());

        if (user == null) {
            bindingResult.reject("loginFail", "로그인 아이디 또는 비밀번호가 틀렸습니다.");
            return "login_form";  // 로그인 실패 시 로그인 폼으로 다시 이동
        }

        // 세션 생성 및 설정 (웹 기반)
        HttpSession session = httpServletRequest.getSession(true);
        session.setAttribute("username", user.getUsername());  // 세션에 username 저장
        session.setMaxInactiveInterval(1800);  // 30분 동안 세션 유지

        return "redirect:/session-login/info";
    }

    // 로그아웃 처리 (웹)
    @GetMapping("/logout")
    public String logout(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();  // 세션 무효화
        }
        return "redirect:/session-login/login";
    }

    // 사용자 정보 페이지 (로그인된 경우만 접근 가능)
    @GetMapping("/info")
    public String userInfo(@SessionAttribute(name = "username", required = false) String username, Model model) {
        if (username == null) {
            return "redirect:/session-login/login";
        }

        // 로그인한 사용자 정보 조회
        SiteUser user = userService.getUserByUsername(username);
        model.addAttribute("user", user);

        return "info";
    }
}
