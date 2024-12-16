package org.bettermarketplace.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.util.List;

import org.bettermarketplace.configuration.PostgisTest;
import org.bettermarketplace.db.dao.LocationDao;
import org.bettermarketplace.http.OpenDataClient;
import org.bettermarketplace.http.dto.PostalCodeDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.fasterxml.jackson.core.type.TypeReference;

public class LocationServiceIT extends PostgisTest {

	private static final String REFINE = "country_code:\"SK\"";
	private static final List<PostalCodeDto> CLIENT_RESPONSE = readResource("/json/postal_codes.json",
			new TypeReference<>() {});
	private static final String POSTAL_CODE = "976 02";

	@Autowired
	private LocationDao locationDao;
	@Autowired
	private LocationService locationService;
	@MockitoBean
	private OpenDataClient client;

	@BeforeEach
	void setup() {
		when(client.fetchPostalCodes(REFINE)).thenReturn(CLIENT_RESPONSE);
	}

	@Test
	void fetchData_successfulFetch_dataStoredInDatabase() {
		locationService.processPostalCodes(REFINE);
		assertThat(locationDao.findLocations()).hasSize(10);
		assertThat(locationDao.findLocation(POSTAL_CODE)).isPresent();
	}
}

