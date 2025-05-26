package org.bettermarketplace.cron;

import org.bettermarketplace.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class LocationCronJob {

	private static final String SLOVAKIA_REFINE = "country_code:\"SK\"";
	private static final String CZECHIA_REFINE = "country_code:\"CZ\"";

	private LocationService locationService;

	@Autowired
	public LocationCronJob(LocationService locationService) {
		this.locationService = locationService;
	}

	@Scheduled(cron = "0 0 0 * * SUN")
	public void fetchAllPostalCodes() {
		locationService.processPostalCodes(SLOVAKIA_REFINE);
		locationService.processPostalCodes(CZECHIA_REFINE);
	}
}
