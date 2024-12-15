package org.bettermarketplace.dao;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.bettermarketplace.configuration.PostgisTest;
import org.bettermarketplace.db.dao.LocationDao;
import org.bettermarketplace.db.entity.LocationDbo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class LocationDaoIT extends PostgisTest {

	@Autowired
	private LocationDao locationDao;

	@Test
	void insertRecords_validRecords_recordsInserted() {
		var records = List.of(
				LocationDbo.builder()
						.id("1")
						.name("Brno")
						.latitude(11.111f)
						.longitude(11.111f)
						.countryCode("CZ")
						.build(),
				LocationDbo.builder()
						.id("2")
						.name("Brno Venkov")
						.latitude(22.222f)
						.longitude(22.222f)
						.countryCode("CZ")
						.build());
		var insertedNumber = locationDao.insertLocations(records);
		assertThat(insertedNumber.length).isEqualTo(2);

		assertThat(locationDao.findLocations()).containsExactlyInAnyOrder(records.get(0), records.get(1));
		assertThat(locationDao.findLocation("1")).isPresent()
				.get()
				.returns(11.111f, LocationDbo::latitude)
				.returns(11.111f, LocationDbo::longitude)
				.returns("Brno", LocationDbo::name)
				.returns("CZ", LocationDbo::countryCode);
	}
}
