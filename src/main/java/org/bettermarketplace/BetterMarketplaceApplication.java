package org.bettermarketplace;

import static org.springframework.boot.SpringApplication.run;

import org.bettermarketplace.service.LocationService;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableFeignClients
@EnableScheduling
public class BetterMarketplaceApplication {

	public static void main(String[] args) {
		run(BetterMarketplaceApplication.class, args);
	}
}
