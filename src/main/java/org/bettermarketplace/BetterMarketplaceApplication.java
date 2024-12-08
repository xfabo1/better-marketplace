package org.bettermarketplace;

import static org.springframework.boot.SpringApplication.run;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseDataSource;

@SpringBootApplication
public class BetterMarketplaceApplication {

	public static void main(String[] args) {
		run(BetterMarketplaceApplication.class, args);
	}
}
