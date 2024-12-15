package org.bettermarketplace.api;

import org.bettermarketplace.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/locations")
public class LocationController {

	private final LocationService locationService;

	@Autowired
	public LocationController(LocationService locationService) {
		this.locationService = locationService;
	}

	@PostMapping("/process")
	public void process(@RequestParam("refine") String refine) {
		locationService.processPostalCodes(refine);
	}
}
