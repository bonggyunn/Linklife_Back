package com.mysite.sbb;

import com.mysite.sbb.post.Post;
import com.mysite.sbb.post.PostService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.awt.print.Pageable;


@Controller
public class MainController {

	private final PostService postService;

	public MainController(PostService postService) {
		this.postService = postService;
	}

	/*@GetMapping("/sbb")
	@ResponseBody
	public String index() {
	return "안녕하세요 sbb에 오신것을 환영합니다.";
	}
	@GetMapping("/")
	public String root() {
	return "redirect:/user/login"; */

	@GetMapping("/")
	@ResponseBody
	public Page<Post> getPosts(@RequestParam(defaultValue = "0") int page,
							   @RequestParam(defaultValue = "") String keyword) {
		return postService.getList(page, keyword);
	}
}