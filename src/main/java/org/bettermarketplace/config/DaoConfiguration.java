package org.bettermarketplace.config;

import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.dao.FileReferenceDao;
import org.jdbi.v3.core.Jdbi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DaoConfiguration {

	@Bean
	public ItemDao itemDao(Jdbi jdbi) {
		return jdbi.onDemand(ItemDao.class);
	}

	@Bean
	public FileReferenceDao fileReferenceDao(Jdbi jdbi) {
		return jdbi.onDemand(FileReferenceDao.class);
	}
}
