package org.bettermarketplace.service;

import org.bettermarketplace.db.dao.LocationDao;
import org.bettermarketplace.db.entity.LocationDbo;
import org.bettermarketplace.http.OpenDataClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

	private final LocationDao locationDao;
	private final OpenDataClient client;

	@Autowired
	public LocationService(LocationDao locationDao, OpenDataClient client) {
		this.client = client;
		this.locationDao = locationDao;
	}

	public void processPostalCodes(String refine) {
		var locations = client.fetchPostalCodes(refine).stream().map(LocationDbo::from).toList();
		locationDao.insertLocations(locations);
	}
}
