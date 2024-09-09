package com.mysite.sbb.friend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    //usreid로 친구 목록 조회
    List<Friend> findByUserId(Long userId);
}