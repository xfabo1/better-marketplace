package org.bettermarketplace.dao;

import static org.assertj.core.api.Assertions.assertThat;

import org.bettermarketplace.api.dto.user.RegisterUserDto;
import org.bettermarketplace.configuration.PostgisTest;
import org.bettermarketplace.db.dao.UserDao;
import org.bettermarketplace.db.entity.UserDbo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class UserDaoIT extends PostgisTest {

	private static final String PASSWORD = "password";
	private static final String USERNAME = "username";
	private static final String EMAIL = "random@gmail.com";

	@Autowired
	private UserDao userDao;

	@Test
	void insertUser_validBody_userInserted() {
		var user = RegisterUserDto.builder()
				.username(USERNAME)
				.email(EMAIL)
				.password(PASSWORD)
				.build();

		var id = userDao.insertUser(user, PASSWORD);
		var userDbo = userDao.getUser(id);

		assertThat(userDbo).isPresent();
		assertThat(userDbo.get())
				.returns(USERNAME, UserDbo::username)
				.returns(EMAIL, UserDbo::email)
				.returns(PASSWORD, UserDbo::password);
		assertThat(userDao.getUsers()).hasSize(1);
		userDao.deleteUser(id);
	}

	@Test
	void updateUser_newPassword_passwordUpdated() {
		var user = RegisterUserDto.builder()
				.username(USERNAME)
				.email(EMAIL)
				.password(PASSWORD)
				.build();

		var id = userDao.insertUser(user, PASSWORD);

		userDao.updateUser("newPassword", id);
		var userDboUpdated = userDao.getUser(id);

		assertThat(userDboUpdated).isPresent();
		assertThat(userDboUpdated.get())
				.returns(USERNAME, UserDbo::username)
				.returns(EMAIL, UserDbo::email)
				.returns("newPassword", UserDbo::password);

		userDao.deleteUser(id);
	}
}
