# 주요 기능

## 화면 구현

### 1. 회원가입
---
![스크린샷 2024-10-02 153645](https://github.com/user-attachments/assets/1f395d08-662f-4999-8d46-bbca8b10073b)
---

### 2. 로그인
---
![스크린샷 2024-10-02 153534](https://github.com/user-attachments/assets/46deaf32-14e6-4ab2-9388-eec4652ee6fe)
---

### 3. 메인 화면
---
![스크린샷 2024-10-02 153257](https://github.com/user-attachments/assets/3a1bb902-afd0-4e63-8c64-2175223f1aaf)
---

### 4. 타임라인
---
![타임라인](https://github.com/user-attachments/assets/76d784d7-e5b7-4516-99da-d839505126ce)
---
---
## 기능 구현

### 1. 회원가입 API
    @PostMapping("/api/signup")
	public ResponseEntity<String> signup(@Valid @RequestBody UserCreateForm userCreateForm) {
		try {
			userService.create(userCreateForm.getUsername(), userCreateForm.getEmail(),
					userCreateForm.getPassword1(), userCreateForm.getUserid(), userCreateForm.getPhonenumber());
			return ResponseEntity.ok("User registered successfully");
		} catch (DataIntegrityViolationException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

### 2. 로그인 API
    @PostMapping("/api/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
		);

		// Authentication 객체에서 principal을 가져와서 UserDetails로 캐스팅
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		String token = jwtTokenProvider.createToken(userDetails.getUsername(), userDetails.getAuthorities().toString());

		return ResponseEntity.ok(new ApiResponse(token));
	}

### 3. 로그인 유지 - JWT  
#### JwtTokenProvider.java : 토큰 생성
    @Component
    public class JwtTokenProvider {

    private final SecretKey secretKey;
    private final long validityInMilliseconds;

    public JwtTokenProvider(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration}") long validityInMilliseconds) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());  // 안전한 키 생성
        this.validityInMilliseconds = validityInMilliseconds;
    }

    public String createToken(String username, String roles) {
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("roles", roles);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(secretKey, SignatureAlgorithm.HS256)  // 안전한 키로 서명
                .compact();
    }

#### JwtAuthenticationFilter.java : 사용자 인증
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = getTokenFromRequest(request);

        if (token != null && jwtTokenProvider.validateToken(token)) {
            String username = jwtTokenProvider.getUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (userDetails != null) {
                // 수정된 부분: UsernamePasswordAuthenticationToken 사용
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }

### 4. 게시글 작성
    @PostMapping("/create")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> postCreate(@Valid @RequestBody PostForm postForm, BindingResult bindingResult,
										@AuthenticationPrincipal UserDetails userDetails) {
		if (bindingResult.hasErrors()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "입력 데이터가 올바르지 않습니다.");
		}
		if (userDetails == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
		}
		SiteUser siteUser = this.userService.getUser(userDetails.getUsername());
		this.postService.create(postForm.getSubject(), postForm.getContent(), siteUser,
				postForm.getEventStartDateTime(), postForm.getEventEndDateTime(), postForm.getEventLocation());
		return ResponseEntity.status(HttpStatus.CREATED).body("게시글이 생성되었습니다.");
	}
