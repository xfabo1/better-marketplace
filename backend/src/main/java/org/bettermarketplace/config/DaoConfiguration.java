package org.bettermarketplace.config;

import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.dao.LocationDao;
import org.bettermarketplace.db.dao.UserDao;
import org.jdbi.v3.core.Jdbi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DaoConfiguration {

	@Bean
	public LocationDao locationDao(Jdbi jdbi) {
		return jdbi.onDemand(LocationDao.class);
	}

	@Bean
	public UserDao userDao(Jdbi jdbi) {
		return jdbi.onDemand(UserDao.class);
	}

	@Bean
	public ItemDao itemDao(Jdbi jdbi) {
		return jdbi.onDemand(ItemDao.class);
	}
}
