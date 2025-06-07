package org.bettermarketplace.service;

import java.util.Optional;

import org.bettermarketplace.api.dto.user.RegisterUserDto;
import org.bettermarketplace.db.dao.UserDao;
import org.bettermarketplace.db.entity.UserDbo;
import org.bettermarketplace.mapper.UserMapper;
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

	public Long insertUser(RegisterUserDto registerUserDto, String password) {
		return userDao.insertUser(registerUserDto, password);
	}

	public Optional<UserDbo> getUser(Long id) {
		return userDao.getUser(id);
	}

	public void deleteUser(Long id) {
		userDao.deleteUser(id);
	}

	public Optional<UserDbo> getUserByEmail(String email) {
		return userDao.getUserByEmail(email);
	}

	public Optional<UserDbo> getUserByUsername(String username) {
		return userDao.getUserByUsername(username);
	}
}
