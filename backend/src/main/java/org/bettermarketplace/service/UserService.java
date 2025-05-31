package org.bettermarketplace.service;

import java.util.stream.Stream;

import org.bettermarketplace.api.dto.RegisterUserDto;
import org.bettermarketplace.db.dao.UserDao;
import org.bettermarketplace.mapper.UserMapper;
import org.bettermarketplace.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	private static final UserMapper MAPPER = UserMapper.INSTANCE;

	private final UserDao userDao;

	@Autowired
	public UserService(UserDao userDao) {
		this.userDao = userDao;
	}

	public User insertUser(RegisterUserDto registerUserDto) {
		var id = userDao.insertUser(MAPPER.from(registerUserDto));
		var user = userDao.getUser(id);
		return user.map(MAPPER::from).orElse(null);
	}

	public User getUser(Long id) {
		var userDbo = userDao.getUser(id);
		return userDbo.map(MAPPER::from).orElse(null);
	}

	public Stream<User> getUsers() {
		return userDao.getUsers().stream().map(MAPPER::from);
	}

	public void deleteUser(Long id) {
		userDao.deleteUser(id);
	}
}
