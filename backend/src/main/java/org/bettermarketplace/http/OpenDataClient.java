package org.bettermarketplace.http;

import java.util.List;
import java.util.stream.Stream;

import org.bettermarketplace.http.dto.PostalCodeDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.slf4j.Slf4j;

@FeignClient(
		name = "openDataClient",
		url = "${clients.open-data-client.url}",
		configuration = FeignClientConfiguration.OpenDataClientFallbackConfiguration.class,
		fallback = OpenDataClient.Fallback.class
)
public interface OpenDataClient {

	@GetMapping("/json?lang=en&timezone=Europe/Berlin")
	List<PostalCodeDto> fetchPostalCodes(@RequestParam("refine") String refine);

	@Slf4j
	class Fallback implements OpenDataClient {

		@Override
		public List<PostalCodeDto> fetchPostalCodes(String refine) {
			log.info("Could not fetch the postal codes for '{}'", refine);
			return null;
		}
	}
}
