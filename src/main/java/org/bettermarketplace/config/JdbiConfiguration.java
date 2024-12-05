package org.bettermarketplace.config;

import javax.sql.DataSource;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JdbiConfiguration {

	@Bean
	public Jdbi jdbi(DataSource dataSource) {
		return Jdbi.create(dataSource).installPlugin(new SqlObjectPlugin());
	}
}
