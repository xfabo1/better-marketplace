package org.bettermarketplace.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bettermarketplace.api.dto.location.LocationDto;
import org.springframework.stereotype.Service;

@Service
public class LocationSearchService {

	private final Map<Long, LocationDto> locationMap = new HashMap<>();
	private final LocationService locationService;
	private boolean locationsLoaded = false;

	public LocationSearchService(LocationService locationService) {
		this.locationService = locationService;
	}

		public List<LocationDto> search(String searchInput) {
		ensureLocationsLoaded();
		
		if (searchInput == null || searchInput.trim().isEmpty()) {
			return List.of();
		}
		
		String lowerSearchInput = searchInput.toLowerCase().trim();
		return locationMap.values().stream()
				.filter(location -> location.name().toLowerCase().contains(lowerSearchInput))
				.limit(10)
				.toList();
	}

	public Optional<LocationDto> getById(Long id) {
		ensureLocationsLoaded();
		return Optional.ofNullable(locationMap.get(id));
	}

	private void ensureLocationsLoaded() {
		if (!locationsLoaded) {
			loadLocations();
			locationsLoaded = true;
		}
	}

	private void loadLocations() {
		var locations = locationService.findLocations().stream().map(LocationDto::from).toList();

		for (var location : locations) {
			locationMap.put(location.id(), location);
		}
	}
}
