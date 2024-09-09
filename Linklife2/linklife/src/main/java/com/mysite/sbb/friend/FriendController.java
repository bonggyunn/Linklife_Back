package com.mysite.sbb.friend;


import com.mysite.sbb.DataNotFoundException;
import com.mysite.sbb.user.SiteUser;
import com.mysite.sbb.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class FriendController {

    private final FriendService friendService;

    @Autowired
    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    // 사용자의 친구 목록 조회
    @GetMapping("/{userId}/friends")
    public ResponseEntity<List<Friend>> getFriends(@PathVariable Long userId) {
        List<Friend> friends = friendService.getFriendsByUserId(userId);
        return ResponseEntity.ok(friends);
    }

    // 친구 추가
    @PostMapping("/add")
    public ResponseEntity<String> addFriend(@RequestParam Long userId, @RequestParam Long friendId) {
        friendService.addFriend(userId, friendId);
        return ResponseEntity.status(HttpStatus.CREATED).body("친구 추가 완료");
    }
}