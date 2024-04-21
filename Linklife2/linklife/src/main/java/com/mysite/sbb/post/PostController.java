package com.mysite.sbb.post;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

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
	public ResponseEntity<?> postCreate(@Valid @RequestBody PostForm postForm, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "입력 데이터가 올바르지 않습니다.");
		}
// 작성자			SiteUser siteUser = this.userService.getUser(principal.getName());
		SiteUser siteuser = null;
		this.postService.create(postForm.getSubject(), postForm.getContent(), siteuser,
				postForm.getEventStartDateTime(), postForm.getEventEndDateTime(), postForm.getEventLocation());
		return ResponseEntity.ok().build();
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<?> updatePost(@PathVariable("id") Integer id, @Valid @RequestBody PostForm postForm, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "입력 데이터가 올바르지 않습니다.");
		}

		// 게시글 ID로 기존 게시글을 가져옴
		Post existingPost = postService.getPost(id);
		if (existingPost == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "수정할 게시글을 찾을 수 없습니다.");
		}

		// 수정할 내용으로 게시글 업데이트
		postService.update(existingPost, postForm.getSubject(), postForm.getContent(), postForm.getEventStartDateTime(), postForm.getEventEndDateTime());

		return ResponseEntity.ok().build();
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deletePost(@PathVariable("id") Integer id) {
		// 게시글 ID로 기존 게시글을 가져옴
		Post existingPost = postService.getPost(id);
		if (existingPost == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "삭제할 게시글을 찾을 수 없습니다.");
		}

		// 게시글 삭제
		postService.delete(existingPost);

		return ResponseEntity.ok().build();
	}
}
//	@GetMapping("/create")
//public ResponseEntity<?> postCreate(@Valid @RequestBody PostForm postForm, BindingResult bindingResult, Principal principal) {
//	if (bindingResult.hasErrors()) {
//		// 유효성 검사 실패 시 에러 메시지를 가져옴
//		String errorMessage = Objects.requireNonNull(bindingResult.getFieldError()).getDefaultMessage();
//		// 클라이언트로 에러 메시지 반환
//		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
//	}
//	try {
//		// Principal로부터 사용자 이름 조회
//		String username = principal.getName();
//		// 사용자 정보 조회
//		SiteUser siteUser = this.userService.getUser(username);
//		if (siteUser == null) {
//			// 사용자 정보가 없을 경우 에러 반환
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자 정보를 찾을 수 없습니다.");
//		}
//		// 게시글 생성
//		this.postService.create(postForm.getSubject(), postForm.getContent(), siteUser);
//		// 성공적인 응답 반환
//		return ResponseEntity.ok().build();
//	} catch (Exception e) {
//		// 예상치 못한 오류가 발생한 경우 500 에러 반환
//		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 생성 중 오류가 발생했습니다.");
//	}

////		@PreAuthorize("isAuthenticated()")
//	@PostMapping("/modify/{id}")
//	public ResponseEntity<?> postModify (@PathVariable("id") Integer id, @Valid @RequestBody PostForm postForm,
//			BindingResult bindingResult, Principal principal){
//		if (bindingResult.hasErrors()) {
//			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "입력 데이터가 올바르지 않습니다.");
//		}
//		Post post = this.postService.getPost(id);
//		if (!post.getAuthor().getUsername().equals(principal.getName())) {
//			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "수정 권한이 없습니다.");
//		}
//		this.postService.modify(post, postForm.getSubject(), postForm.getContent());
//		return ResponseEntity.ok().build();
//	}
//
////		@PreAuthorize("isAuthenticated()")
//	@DeleteMapping("/delete/{id}")
//	public ResponseEntity<?> postDelete (@PathVariable("id") Integer id, Principal principal){
//		Post post = this.postService.getPost(id);
//		if (post == null) {
//			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다.");
//		}
//		if (!post.getAuthor().getUsername().equals(principal.getName())) {
//			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "삭제 권한이 없습니다.");
//		}
//		this.postService.delete(post);
//		return ResponseEntity.ok().build();
//	}
//
////		@PreAuthorize("isAuthenticated()")
//	@PostMapping("/vote/{id}")
//	public ResponseEntity<?> postVote (@PathVariable("id") Integer id, Principal principal){
//		Post post = this.postService.getPost(id);
//		if (post == null) {
//			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다.");
//		}
//		SiteUser siteUser = this.userService.getUser(principal.getName());
//		this.postService.vote(post, siteUser);
//		return ResponseEntity.ok().build();
//	}
//}

