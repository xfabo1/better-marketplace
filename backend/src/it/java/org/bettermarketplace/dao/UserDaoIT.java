package org.bettermarketplace.dao;

import static org.assertj.core.api.Assertions.assertThat;

import org.bettermarketplace.api.dto.user.RegisterUserDto;
import org.bettermarketplace.api.dto.user.UserDetailsUpdateDto;
import org.bettermarketplace.configuration.PostgisTest;
import org.bettermarketplace.db.dao.UserDao;
import org.bettermarketplace.db.entity.UserDbo;
import org.bettermarketplace.model.Country;
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
				.country(Country.CZ)
				.displayItemsFromOtherCountry(true)
				.build();

		var id = userDao.insertUser(user, PASSWORD);
		var userDbo = userDao.getUser(id);

		assertThat(userDbo).isPresent();
		assertThat(userDbo.get())
				.returns(USERNAME, UserDbo::username)
				.returns(EMAIL, UserDbo::email)
				.returns(PASSWORD, UserDbo::password)
				.returns(Country.CZ, UserDbo::country)
				.returns(true, UserDbo::displayItemsFromOtherCountry);
		assertThat(userDao.getUsers()).hasSize(1);
		userDao.deleteUser(id);
	}

	@Test
	void updateUser_validBody_userUpdated() {
		var user = RegisterUserDto.builder()
				.username(USERNAME)
				.email(EMAIL)
				.password(PASSWORD)
				.country(Country.CZ)
				.displayItemsFromOtherCountry(true)
				.build();

		var id = userDao.insertUser(user, PASSWORD);
		var userDbo = userDao.getUser(id);

		assertThat(userDbo).isPresent();
		assertThat(userDbo.get())
				.returns(USERNAME, UserDbo::username)
				.returns(EMAIL, UserDbo::email)
				.returns(PASSWORD, UserDbo::password)
				.returns(Country.CZ, UserDbo::country)
				.returns(true, UserDbo::displayItemsFromOtherCountry);
		assertThat(userDao.getUsers()).hasSize(1);

		var updatedUser = UserDetailsUpdateDto.builder()
				.displayItemsFromOtherCountry(false)
				.country(Country.SK)
				.build();

		userDao.updateUser(updatedUser.password(), updatedUser.displayItemsFromOtherCountry(),
				updatedUser.country().name(), id);
		var userDboUpdated = userDao.getUser(id);

		assertThat(userDboUpdated).isPresent();
		assertThat(userDboUpdated.get())
				.returns(USERNAME, UserDbo::username)
				.returns(EMAIL, UserDbo::email)
				.returns(PASSWORD, UserDbo::password)
				.returns(false, UserDbo::displayItemsFromOtherCountry)
				.returns(Country.SK, UserDbo::country);

		userDao.deleteUser(id);
	}
}
