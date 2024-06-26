package com.mysite.sbb.post;

import java.security.Principal;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

import com.mysite.sbb.answer.AnswerForm;
import com.mysite.sbb.user.SiteUser;
import com.mysite.sbb.user.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/post")
@RequiredArgsConstructor
@Controller
public class PostController {
	private final PostService postService;
	private final UserService userService;

	@GetMapping("/list")
	public String list(Model model, @RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "kw", defaultValue = "") String kw) {
		log.info("page:{}, kw:{}", page, kw);
		Page<Post> paging = this.postService.getList(page, kw);
		model.addAttribute("paging", paging);
		model.addAttribute("kw", kw);
		return "post_list";
	}

	@GetMapping(value = "/detail/{id}")
	public String detail(Model model, @PathVariable("id") Integer id, AnswerForm answerForm) {
		Post post = this.postService.getPost(id);
		model.addAttribute("post", post);
		return "post_detail";
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/create")
	public String postCreate(PostForm postForm) {
		return "post_form";
	}

	@PreAuthorize("isAuthenticated()")
	@PostMapping("/create")
	public String postCreate(@Valid PostForm postForm, BindingResult bindingResult, Principal principal) {
		if (bindingResult.hasErrors()) {
			return "post_form";
		}
		SiteUser siteUser = this.userService.getUser(principal.getName());
		this.postService.create(postForm.getSubject(), postForm.getContent(), siteUser);
		return "redirect:/post/list";
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/modify/{id}")
	public String postModify(PostForm postForm, @PathVariable("id") Integer id, Principal principal) {
		Post post = this.postService.getPost(id);
		if (!post.getAuthor().getUsername().equals(principal.getName())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "수정권한이 없습니다.");
		}
		postForm.setSubject(post.getSubject());
		postForm.setContent(post.getContent());
		return "post_form";
	}

	@PreAuthorize("isAuthenticated()")
	@PostMapping("/modify/{id}")
	public String postModify(@Valid PostForm postForm, BindingResult bindingResult, Principal principal,
								 @PathVariable("id") Integer id) {
		if (bindingResult.hasErrors()) {
			return "post_form";
		}
		Post post = this.postService.getPost(id);
		if (!post.getAuthor().getUsername().equals(principal.getName())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "수정권한이 없습니다.");
		}
		this.postService.modify(post, postForm.getSubject(), postForm.getContent());
		return String.format("redirect:/post/detail/%s", id);
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/delete/{id}")
	public String postDelete(Principal principal, @PathVariable("id") Integer id) {
		Post post = this.postService.getPost(id);
		if (!post.getAuthor().getUsername().equals(principal.getName())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "삭제권한이 없습니다.");
		}
		this.postService.delete(post);
		return "redirect:/";
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/vote/{id}")
	public String postVote(Principal principal, @PathVariable("id") Integer id) {
		Post post = this.postService.getPost(id);
		SiteUser siteUser = this.userService.getUser(principal.getName());
		this.postService.vote(post, siteUser);
		return String.format("redirect:/post/detail/%s", id);
	}
}
