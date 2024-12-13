package org.bettermarketplace;

import static org.springframework.boot.SpringApplication.run;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BetterMarketplaceApplication {

	public static void main(String[] args) {
		run(BetterMarketplaceApplication.class, args);
	}
}
