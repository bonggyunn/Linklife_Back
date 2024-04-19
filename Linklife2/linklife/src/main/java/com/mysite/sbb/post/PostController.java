package com.mysite.sbb.post;

import java.security.Principal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.mysite.sbb.answer.AnswerForm;
import com.mysite.sbb.user.SiteUser;
import com.mysite.sbb.user.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/post")
//@RequiredArgsConstructor
@RestController
//@ResponseBody
public class PostController {

//	public class PostController {
		private final PostService postService;
		private final UserService userService;

		public PostController(PostService postService, UserService userService) {
			this.postService = postService;
			this.userService = userService;
		}

	@GetMapping("/all")
	public ResponseEntity<List<Post>> getAllPosts() {
		List<Post> allPosts = postService.getAllPosts();
		return ResponseEntity.ok().body(allPosts);
	}

		@GetMapping("/list")
		public ResponseEntity<Page<Post>> list(@RequestParam(value = "page", defaultValue = "0") int page,
											   @RequestParam(value = "kw", defaultValue = "") String kw) {
			Page<Post> paging = this.postService.getList(page, kw);
			return ResponseEntity.ok(paging);
		}

		@GetMapping("/detail/{id}")
		public ResponseEntity<Post> detail(@PathVariable("id") Integer id) {
			Post post = this.postService.getPost(id);
			if (post == null) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다.");
			}
			return ResponseEntity.ok(post);
		}

//		@PreAuthorize("isAuthenticated()")
		@PostMapping("/create")
		public ResponseEntity<?> postCreate(@Valid @RequestBody PostForm postForm, BindingResult bindingResult, Principal principal) {
			if (bindingResult.hasErrors()) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "입력 데이터가 올바르지 않습니다.");
			}
			SiteUser siteUser = this.userService.getUser(principal.getName());
			this.postService.create(postForm.getSubject(), postForm.getContent(), siteUser);
			return ResponseEntity.ok().build();
		}

//		@PreAuthorize("isAuthenticated()")
		@PostMapping("/modify/{id}")
		public ResponseEntity<?> postModify(@PathVariable("id") Integer id, @Valid @RequestBody PostForm postForm,
											BindingResult bindingResult, Principal principal) {
			if (bindingResult.hasErrors()) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "입력 데이터가 올바르지 않습니다.");
			}
			Post post = this.postService.getPost(id);
			if (!post.getAuthor().getUsername().equals(principal.getName())) {
				throw new ResponseStatusException(HttpStatus.FORBIDDEN, "수정 권한이 없습니다.");
			}
			this.postService.modify(post, postForm.getSubject(), postForm.getContent());
			return ResponseEntity.ok().build();
		}

//		@PreAuthorize("isAuthenticated()")
		@DeleteMapping("/delete/{id}")
		public ResponseEntity<?> postDelete(@PathVariable("id") Integer id, Principal principal) {
			Post post = this.postService.getPost(id);
			if (post == null) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다.");
			}
			if (!post.getAuthor().getUsername().equals(principal.getName())) {
				throw new ResponseStatusException(HttpStatus.FORBIDDEN, "삭제 권한이 없습니다.");
			}
			this.postService.delete(post);
			return ResponseEntity.ok().build();
		}

//		@PreAuthorize("isAuthenticated()")
		@PostMapping("/vote/{id}")
		public ResponseEntity<?> postVote(@PathVariable("id") Integer id, Principal principal) {
			Post post = this.postService.getPost(id);
			if (post == null) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다.");
			}
			SiteUser siteUser = this.userService.getUser(principal.getName());
			this.postService.vote(post, siteUser);
			return ResponseEntity.ok().build();
		}
//	private final PostService postService;
//	private final UserService userService;
//
//	@GetMapping("/list")
//	public String list(Model model, @RequestParam(value = "page", defaultValue = "0") int page,
//			@RequestParam(value = "kw", defaultValue = "") String kw) {
//		log.info("page:{}, kw:{}", page, kw);
//		Page<Post> paging = this.postService.getList(page, kw);
//		model.addAttribute("paging", paging);
//		model.addAttribute("kw", kw);
//		return "post_list";
//	}
//
//
//	@GetMapping(value = "/detail/{id}")
//	public String detail(Model model, @PathVariable("id") Integer id, AnswerForm answerForm) {
//		Post post = this.postService.getPost(id);
//		model.addAttribute("post", post);
//		return "post_detail";
//	}
//
//	@PreAuthorize("isAuthenticated()")
//	@GetMapping("/create")
//	public String postCreate(PostForm postForm) {
//		return "post_form";
//	}
//
//	@PreAuthorize("isAuthenticated()")
//	@PostMapping("/create")
//	public String postCreate(@Valid PostForm postForm, BindingResult bindingResult, Principal principal) {
//		if (bindingResult.hasErrors()) {
//			return "post_form";
//		}
//		SiteUser siteUser = this.userService.getUser(principal.getName());
//		this.postService.create(postForm.getSubject(), postForm.getContent(), siteUser);
//		return "redirect:/post/list";
//	}
//
//	@PreAuthorize("isAuthenticated()")
//	@GetMapping("/modify/{id}")
//	public String postModify(PostForm postForm, @PathVariable("id") Integer id, Principal principal) {
//		Post post = this.postService.getPost(id);
//		if (!post.getAuthor().getUsername().equals(principal.getName())) {
//			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "수정권한이 없습니다.");
//		}
//		postForm.setSubject(post.getSubject());
//		postForm.setContent(post.getContent());
//		return "post_form";
//	}
//
//	@PreAuthorize("isAuthenticated()")
//	@PostMapping("/modify/{id}")
//	public String postModify(@Valid PostForm postForm, BindingResult bindingResult, Principal principal,
//								 @PathVariable("id") Integer id) {
//		if (bindingResult.hasErrors()) {
//			return "post_form";
//		}
//		Post post = this.postService.getPost(id);
//		if (!post.getAuthor().getUsername().equals(principal.getName())) {
//			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "수정권한이 없습니다.");
//		}
//		this.postService.modify(post, postForm.getSubject(), postForm.getContent());
//		return String.format("redirect:/post/detail/%s", id);
//	}
//
//	@PreAuthorize("isAuthenticated()")
//	@GetMapping("/delete/{id}")
//	public String postDelete(Principal principal, @PathVariable("id") Integer id) {
//		Post post = this.postService.getPost(id);
//		if (!post.getAuthor().getUsername().equals(principal.getName())) {
//			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "삭제권한이 없습니다.");
//		}
//		this.postService.delete(post);
//		return "redirect:/";
//	}
//
//	@PreAuthorize("isAuthenticated()")
//	@GetMapping("/vote/{id}")
//	public String postVote(Principal principal, @PathVariable("id") Integer id) {
//		Post post = this.postService.getPost(id);
//		SiteUser siteUser = this.userService.getUser(principal.getName());
//		this.postService.vote(post, siteUser);
//		return String.format("redirect:/post/detail/%s", id);
//	}
}
