package org.bettermarketplace.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.bettermarketplace.api.dto.location.LocationDto;
import org.bettermarketplace.db.entity.LocationDbo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class LocationSearchServiceTest {

	@Mock
	private LocationService locationService;

	private LocationSearchService locationSearchService;

	private List<LocationDbo> mockLocations;

	@BeforeEach
	void setUp() {
		locationSearchService = new LocationSearchService(locationService);
		
		// Create mock location data
		mockLocations = List.of(
				new LocationDbo(1L, "11000", "CZ", "Prague", "Prague Region", "Prague", 50.0755, 14.4378),
				new LocationDbo(2L, "60200", "CZ", "Brno", "South Moravian Region", "Brno", 49.1951, 16.6068),
				new LocationDbo(3L, "81101", "SK", "Bratislava", "Bratislava Region", "Bratislava", 48.1486, 17.1077),
				new LocationDbo(4L, "10001", "US", "New York", "New York", "New York", 40.7128, -74.0060),
				new LocationDbo(5L, "75001", "FR", "Paris", "Île-de-France", "Paris", 48.8566, 2.3522)
		);
	}

	@Test
	void loadLocations_validData_loadsLocationsIntoTrieAndMap() {
		// Given
		when(locationService.findLocations()).thenReturn(mockLocations);

		// Then - verify locations are loaded by testing search functionality
		List<LocationDto> pragueResults = locationSearchService.search("Prague");
		assertThat(pragueResults).hasSize(1);
		assertThat(pragueResults.getFirst().id()).isEqualTo(1L);
		assertThat(pragueResults.getFirst().name()).isEqualTo("CZ, Prague, Prague, Prague Region, 11000");
	}

	@Test
	void search_exactMatch_returnsMatchingLocation() {
		// Given
		when(locationService.findLocations()).thenReturn(mockLocations);

		// When
		List<LocationDto> results = locationSearchService.search("CZ, Brno");

		// Then
		assertThat(results).hasSize(1);
		assertThat(results.getFirst().id()).isEqualTo(2L);
		assertThat(results.getFirst().name()).contains("Brno");
	}

	@Test
	void search_partialMatch_returnsMatchingLocations() {
		// Given
		when(locationService.findLocations()).thenReturn(mockLocations);

		// When
		List<LocationDto> results = locationSearchService.search("Pra");

		// Then
		assertThat(results).hasSize(1);
		assertThat(results.getFirst().name()).contains("Prague");
	}

	@Test
	void search_caseInsensitive_returnsMatchingLocations() {
		// Given
		when(locationService.findLocations()).thenReturn(mockLocations);

		// When
		List<LocationDto> results = locationSearchService.search("PRAGUE");

		// Then
		assertThat(results).hasSize(1);
		assertThat(results.getFirst().name()).contains("Prague");
	}

	@Test
	void search_noMatch_returnsEmptyList() {
		// Given
		when(locationService.findLocations()).thenReturn(mockLocations);

		// When
		List<LocationDto> results = locationSearchService.search("NonExistentCity");

		// Then
		assertThat(results).isEmpty();
	}

	@Test
	void search_emptyPrefix_returnsEmptyList() {
		// Given
		when(locationService.findLocations()).thenReturn(mockLocations);

		// When
		List<LocationDto> results = locationSearchService.search("");

		// Then
		assertThat(results).isEmpty();
	}

	@Test
	void search_multipleMatches_returnsAllMatches() {
		// Given
		List<LocationDbo> locationsWithSimilarNames = List.of(
				new LocationDbo(1L, "11000", "CZ", "Prague", "Prague Region", "Prague", 50.0755, 14.4378),
				new LocationDbo(2L, "12000", "CZ", "Prague 2", "Prague Region", "Prague", 50.0755, 14.4378),
				new LocationDbo(3L, "13000", "CZ", "Prague 3", "Prague Region", "Prague", 50.0755, 14.4378)
		);
		when(locationService.findLocations()).thenReturn(locationsWithSimilarNames);

		// When
		List<LocationDto> results = locationSearchService.search("CZ, Prague");

		// Then
		assertThat(results).hasSize(3);
		assertThat(results).allMatch(location -> location.name().contains("Prague"));
	}

	@Test
	void getById_existingId_returnsLocation() {
		// Given
		when(locationService.findLocations()).thenReturn(mockLocations);

		// When
		Optional<LocationDto> result = locationSearchService.getById(1L);

		// Then
		assertThat(result).isPresent();
		assertThat(result.get().id()).isEqualTo(1L);
		assertThat(result.get().name()).contains("Prague");
	}

	@Test
	void getById_nonExistingId_returnsEmpty() {
		// Given
		when(locationService.findLocations()).thenReturn(mockLocations);

		// When
		Optional<LocationDto> result = locationSearchService.getById(999L);

		// Then
		assertThat(result).isEmpty();
	}

	@Test
	void getById_beforeLoadingLocations_returnsEmpty() {
		// Given - no locations loaded

		// When
		Optional<LocationDto> result = locationSearchService.getById(1L);

		// Then
		assertThat(result).isEmpty();
	}

	@Test
	void search_beforeLoadingLocations_returnsEmptyList() {
		// Given - no locations loaded

		// When
		List<LocationDto> results = locationSearchService.search("Prague");

		// Then
		assertThat(results).isEmpty();
	}

	@Test
	void loadLocations_emptyLocationList_handlesGracefully() {
		// Given
		when(locationService.findLocations()).thenReturn(List.of());

		// Then
		List<LocationDto> results = locationSearchService.search("Prague");
		assertThat(results).isEmpty();
		
		Optional<LocationDto> byId = locationSearchService.getById(1L);
		assertThat(byId).isEmpty();
	}

	@Test
	void search_maxSuggestionsLimit_respectsLimit() {
		// Given - create more than 10 locations with same prefix
		List<LocationDbo> manyLocations = List.of(
				new LocationDbo(1L, "11000", "CZ", "Prague 1", "Prague Region", "Prague", 50.0755, 14.4378),
				new LocationDbo(2L, "12000", "CZ", "Prague 2", "Prague Region", "Prague", 50.0755, 14.4378),
				new LocationDbo(3L, "13000", "CZ", "Prague 3", "Prague Region", "Prague", 50.0755, 14.4378),
				new LocationDbo(4L, "14000", "CZ", "Prague 4", "Prague Region", "Prague", 50.0755, 14.4378),
				new LocationDbo(5L, "15000", "CZ", "Prague 5", "Prague Region", "Prague", 50.0755, 14.4378),
				new LocationDbo(6L, "16000", "CZ", "Prague 6", "Prague Region", "Prague", 50.0755, 14.4378),
				new LocationDbo(7L, "17000", "CZ", "Prague 7", "Prague Region", "Prague", 50.0755, 14.4378),
				new LocationDbo(8L, "18000", "CZ", "Prague 8", "Prague Region", "Prague", 50.0755, 14.4378),
				new LocationDbo(9L, "19000", "CZ", "Prague 9", "Prague Region", "Prague", 50.0755, 14.4378),
				new LocationDbo(10L, "20000", "CZ", "Prague 10", "Prague Region", "Prague", 50.0755, 14.4378),
				new LocationDbo(11L, "21000", "CZ", "Prague 11", "Prague Region", "Prague", 50.0755, 14.4378),
				new LocationDbo(12L, "22000", "CZ", "Prague 12", "Prague Region", "Prague", 50.0755, 14.4378)
		);
		when(locationService.findLocations()).thenReturn(manyLocations);

		// When
		List<LocationDto> results = locationSearchService.search("CZ, Prague");

		// Then - should respect the maxSuggestions limit of 10
		assertThat(results).hasSizeLessThanOrEqualTo(10);
	}


} 