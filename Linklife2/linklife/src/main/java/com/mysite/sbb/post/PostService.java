package com.mysite.sbb.post;

import java.io.Serial;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.mysite.sbb.DataNotFoundException;
import com.mysite.sbb.answer.Answer;
import com.mysite.sbb.user.SiteUser;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PostService {

	private final PostRepository postRepository;

	@SuppressWarnings("unused")
	private Specification<Post> search(String kw) {
		return new Specification<>() {
			@Serial
			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<Post> q, CriteriaQuery<?> query, CriteriaBuilder cb) {
				query.distinct(true); // 중복을 제거
				Join<Post, SiteUser> u1 = q.join("author", JoinType.LEFT);
				Join<Post, Answer> a = q.join("answerList", JoinType.LEFT);
				Join<Answer, SiteUser> u2 = a.join("author", JoinType.LEFT);
				return cb.or(cb.like(q.get("subject"), "%" + kw + "%"), // 제목
						cb.like(q.get("content"), "%" + kw + "%"), // 내용
						cb.like(u1.get("username"), "%" + kw + "%"), // 게시글 작성자
						cb.like(a.get("content"), "%" + kw + "%"), // 답변 내용
						cb.like(u2.get("username"), "%" + kw + "%")); // 답변 작성자
			}
		};
	}

	public List<Post> getAllPosts() {
		return postRepository.findAll();
	}

	public Page<Post> getList(int page, String kw) {
		List<Sort.Order> sorts = new ArrayList<>();
		sorts.add(Sort.Order.asc("eventStartDateTime"));
		Pageable pageable = PageRequest.of(page, 10, Sort.by(sorts));
		return this.postRepository.findAllByKeyword(kw, pageable);
	}

	public Post getPost(Integer id) {
		Optional<Post> post = this.postRepository.findById(id);
		if (post.isPresent()) {
			return post.get();
		} else {
			throw new DataNotFoundException("post not found");
		}
	}

	public void create(String subject, String content, SiteUser author,
					   LocalDateTime eventstartdatetime, LocalDateTime eventenddatetime, String eventlocation) {
		Post q = new Post();
		q.setSubject(subject);
		q.setContent(content);
		q.setCreateDate(LocalDateTime.now());
		q.setAuthor(author);
		q.setEventStartDateTime(eventstartdatetime);
		q.setEventEndDateTime(eventenddatetime);
		q.setEventLocation(eventlocation);
		this.postRepository.save(q);
	}

	public void update(Post post, String subject, String content, LocalDateTime eventstartdatetime,
					   LocalDateTime eventenddatetime, String eventlocation){
		post.setSubject(subject);
		post.setContent(content);
		post.setModifyDate(LocalDateTime.now());
		post.setEventStartDateTime(eventstartdatetime);
		post.setEventEndDateTime(eventenddatetime);
		post.setEventLocation(eventlocation);
		this.postRepository.save(post);
	}

	public void delete(Post post) {
		this.postRepository.delete(post);
	}

	public void vote(Post post, SiteUser siteUser) {
		post.getVoter().add(siteUser);
		this.postRepository.save(post);
	}
}
