package org.bettermarketplace.service;

import java.util.stream.Stream;

import org.bettermarketplace.api.dto.CreateUserDto;
import org.bettermarketplace.db.dao.UserDao;
import org.bettermarketplace.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	private final UserDao userDao;

	@Autowired
	public UserService(UserDao userDao) {
		this.userDao = userDao;
	}

	public User insertUser(CreateUserDto createUserDto) {
		var id = userDao.insertUser(User.from(createUserDto));
		var user = userDao.getUser(id);
		return user.map(User::from).orElse(null);
	}

	public User getUser(Long id) {
		var userDbo = userDao.getUser(id);
		return userDbo.map(User::from).orElse(null);
	}

	public Stream<User> getUsers() {
		return userDao.getUsers().stream().map(User::from);
	}

	public void deleteUser(Long id) {
		userDao.deleteUser(id);
	}
}
