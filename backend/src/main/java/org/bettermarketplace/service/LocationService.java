package org.bettermarketplace.service;

import java.util.List;
import java.util.Optional;

import org.bettermarketplace.db.dao.LocationDao;
import org.bettermarketplace.db.entity.LocationDbo;
import org.bettermarketplace.http.OpenDataClient;
import org.bettermarketplace.mapper.LocationMapper;
import org.bettermarketplace.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

	private static final LocationMapper MAPPER = LocationMapper.INSTANCE;

	private final LocationDao locationDao;
	private final OpenDataClient client;

	@Autowired
	public LocationService(LocationDao locationDao, OpenDataClient client) {
		this.client = client;
		this.locationDao = locationDao;
	}

	public void processPostalCodes(String refine) {
		var locations = client.fetchPostalCodes(refine).stream().map(MAPPER::from).toList();
		locationDao.insertLocations(locations);
	}

	public Optional<LocationDbo> findLocation(Long id) {
		return locationDao.findLocation(id);
	}

	public List<LocationDbo> findLocations() {
		return locationDao.findLocations();
	}
}
