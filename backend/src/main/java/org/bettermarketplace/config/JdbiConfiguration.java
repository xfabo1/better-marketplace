package org.bettermarketplace.config;

import java.util.List;

import javax.sql.DataSource;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.jackson2.Jackson2Plugin;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy;

@Configuration
public class JdbiConfiguration {

	@Bean
	public Jdbi jdbi(DataSource dataSource, List<RowMapper<?>> rowMappers) {
		var tr = new TransactionAwareDataSourceProxy(dataSource);
		var jdbi = Jdbi.create(tr);
		jdbi.installPlugin(new SqlObjectPlugin());
		jdbi.installPlugin(new Jackson2Plugin());
		rowMappers.forEach(jdbi::registerRowMapper);
		return jdbi;
	}
}
