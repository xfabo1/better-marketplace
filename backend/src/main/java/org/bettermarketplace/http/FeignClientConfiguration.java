package org.bettermarketplace.http;

import org.springframework.context.annotation.Bean;

public class FeignClientConfiguration {

	public static class OpenDataClientFallbackConfiguration {

		@Bean
		public OpenDataClient fallbackFactory() {
			return new OpenDataClient.Fallback();
		}
	}
}
