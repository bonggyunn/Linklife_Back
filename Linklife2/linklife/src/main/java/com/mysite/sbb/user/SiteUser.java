package com.mysite.sbb.user;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
public class SiteUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	private String userid;

	private String password;

	@Column(unique = true)
	private String email;

	private String username;

	private String phonenumber;

//	@ManyToMany(mappedBy = "friends")
//	private Set<SiteUser> friends;

}
