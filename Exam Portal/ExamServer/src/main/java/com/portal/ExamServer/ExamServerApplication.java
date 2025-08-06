package com.portal.ExamServer;

import com.portal.ExamServer.model.Role;
import com.portal.ExamServer.model.User;
import com.portal.ExamServer.model.UserRole;
import com.portal.ExamServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamServerApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(ExamServerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Starting code");

		/*User user = new User();
		user.setFirstName("Manjunatha");
		user.setLastName("K");
		user.setUsername("manju");
		user.setEmail("k.manjunatha1518@gmail.com");
		user.setPassword("12345");
		user.setPhone("9000000000");
		user.setProfile("default.png");

		Role role1 = new Role();
		role1.setRoleId(45L);
		role1.setRoleName("ADMIN");

		Set<UserRole> userRoleSet = new HashSet<>();
		UserRole userRole = new UserRole();
		userRole.setRole(role1);
		userRole.setUser(user);
		userRoleSet.add(userRole);

		User user1 = this.userService.createUser(user, userRoleSet);
		System.out.println(user1.getUsername());*/
	}
}
