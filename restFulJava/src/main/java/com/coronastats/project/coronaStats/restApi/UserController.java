package com.coronastats.project.coronaStats.restApi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coronastats.project.coronaStats.Entities.User;
import com.coronastats.project.coronaStats.Service.IUserService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {
	
	private IUserService userService;

	@Autowired
	public UserController(IUserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/user")
	public User get() {
		return this.userService.getUser();
	}
	

}
