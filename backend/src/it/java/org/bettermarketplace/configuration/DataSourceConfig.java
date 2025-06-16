package org.bettermarketplace.configuration;

import java.util.List;

import javax.sql.DataSource;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.enums.EnumStrategy;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.Slf4JSqlLogger;
import org.jdbi.v3.core.statement.SqlLogger;
import org.jdbi.v3.core.statement.StatementContext;
import org.jdbi.v3.jackson2.Jackson2Plugin;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy;

@TestConfiguration
public class DataSourceConfig {

    @Bean
    @Primary
    public DataSource dataSource() {
        PostgisContainer container = PostgisContainer.getInstance();
        container.start();

        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUrl(container.getJdbcUrl());
        dataSource.setUsername(container.getUsername());
        dataSource.setPassword(container.getPassword());
        return dataSource;
    }

    @Bean
    @Primary
    public Jdbi jdbi(DataSource dataSource, List<RowMapper<?>> rowMappers) {
        var tr = new TransactionAwareDataSourceProxy(dataSource);
        var jdbi = Jdbi.create(tr);
        jdbi.installPlugin(new SqlObjectPlugin());
        jdbi.installPlugin(new Jackson2Plugin());
        jdbi.setSqlLogger(new Slf4JSqlLogger());
        rowMappers.forEach(jdbi::registerRowMapper);

        jdbi.getConfig().get(org.jdbi.v3.core.enums.Enums.class)
                .setEnumStrategy(EnumStrategy.BY_NAME);

        jdbi.setSqlLogger(new SqlLogger() {
            @Override
            public void logBeforeExecution(StatementContext context) {
                System.out.println("SQL: " + context.getRenderedSql());
                System.out.println("Parameters: " + context.getBinding());
            }
        });
        return jdbi;
    }
}
