package org.bettermarketplace.dao;

import static org.assertj.core.api.Assertions.assertThat;

import org.bettermarketplace.configuration.PostgisTest;
import org.bettermarketplace.db.dao.UserDao;
import org.bettermarketplace.db.entity.UserDbo;
import org.bettermarketplace.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class UserDaoIT extends PostgisTest {

	@Autowired
	private UserDao userDao;

	@Test
	void insertUser_validBody_userInserted() {
		var user = User.builder()
				.username("test")
				.email("random@gmail.com")
				.build();

		var id = userDao.insertUser(user);
		var userDbo = userDao.getUser(id);

		assertThat(userDbo).isPresent();
		assertThat(userDbo.get())
				.returns("test", UserDbo::username)
				.returns("random@gmail.com", UserDbo::email);
		assertThat(userDao.getUsers()).hasSize(1);
	}
}
