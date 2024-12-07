package org.bettermarketplace.config;

import javax.sql.DataSource;

import org.bettermarketplace.db.entity.Item;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.ConstructorMapper;
import org.jdbi.v3.jackson2.Jackson2Plugin;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JdbiConfiguration {

	@Bean
	public Jdbi jdbi(DataSource dataSource) {
		var jdbi = Jdbi.create(dataSource);
		jdbi.installPlugin(new SqlObjectPlugin());
		jdbi.installPlugin(new Jackson2Plugin());
		jdbi.registerRowMapper(ConstructorMapper.factory(Item.class));
		return jdbi;
	}
}
