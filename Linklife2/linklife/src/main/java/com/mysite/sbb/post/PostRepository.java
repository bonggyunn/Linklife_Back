package com.mysite.sbb.post;

import java.util.List;

import com.mysite.sbb.user.SiteUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Integer> {
	Post findBySubject(String subject);

	Post findBySubjectAndContent(String subject, String content);

	List<Post> findBySubjectLike(String subject);

	Page<Post> findAll(Pageable pageable);

	Page<Post> findAll(Specification<Post> spec, Pageable pageable);
	
	@Query("select "
            + "distinct q "
            + "from Post q "
            + "left outer join SiteUser u1 on q.author=u1 "
            + "left outer join Answer a on a.post=q "
            + "left outer join SiteUser u2 on a.author=u2 "
            + "where "
            + "   q.subject like %:kw% "
            + "   or q.content like %:kw% "
            + "   or u1.username like %:kw% "
            + "   or a.content like %:kw% "
            + "   or u2.username like %:kw% ")
    Page<Post> findAllByKeyword(@Param("kw") String kw, Pageable pageable);

	@Query("SELECT p FROM Post p WHERE p.author.id = :userId")
	Page<Post> findAllByKeywordAndUserId(int userId, Pageable pageable);
	@Query("SELECT p FROM Post p WHERE p.author = :author ORDER BY p.eventStartDateTime ASC")
	Page<Post> findByAuthorOrderByEventStartDateTimeAsc(@Param("author") SiteUser author, Pageable pageable);
}

