package org.bettermarketplace.dao;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.bettermarketplace.configuration.PostgisTest;
import org.bettermarketplace.db.dao.LocationDao;
import org.bettermarketplace.db.entity.LocationDbo;
import org.bettermarketplace.model.Country;
import org.bettermarketplace.model.Location;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class LocationDaoIT extends PostgisTest {

	@Autowired
	private LocationDao locationDao;

	@Test
	void insertRecords_validRecords_recordsInserted() {
		var records = List.of(
				Location.builder()
						.postalCode("111 11")
						.placeName("Brno")
						.latitude(11.111f)
						.longitude(11.111f)
						.countryCode(Country.CZ)
						.build(),
				Location.builder()
						.postalCode("111 11")
						.placeName("Brno Venkov")
						.latitude(22.222f)
						.longitude(22.222f)
						.countryCode(Country.CZ)
						.build());
		var insertedNumber = locationDao.insertLocations(records);
		assertThat(insertedNumber.length).isEqualTo(2);

		assertThat(locationDao.findLocations()).hasSize(2);
		assertThat(locationDao.findLocation(1L)).isPresent()
				.get()
				.returns(11.111f, LocationDbo::latitude)
				.returns(11.111f, LocationDbo::longitude)
				.returns("111 11", LocationDbo::postalCode)
				.returns("Brno", LocationDbo::name)
				.returns("CZ", LocationDbo::countryCode);
	}
}
