package org.bettermarketplace.service;

import java.util.List;
import java.util.Optional;

import org.bettermarketplace.api.dto.filter.SearchFilter;
import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.api.dto.item.UpdateItemDto;
import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.model.Country;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {

	private final ItemDao itemDao;

	@Autowired
	public ItemService(ItemDao itemDao) {
		this.itemDao = itemDao;
	}

	public Optional<ItemDbo> findItem(Long id) {
		return itemDao.findItem(id);
	}

	public List<ItemDbo> findItemsAsc(SearchFilter searchFilter, double longitude, double latitude, String country, int pageSize) {
		return itemDao.findItemsByUpdateTimeAsc(
				longitude,
				latitude,
				searchFilter.minPrice(),
				searchFilter.maxPrice(),
				country,
				searchFilter.searchText(),
				searchFilter.maxMeterDistance(),
				searchFilter.lastPrice(),
				searchFilter.lastUpdate(),
				searchFilter.condition(),
				pageSize
		);
	}

	public List<ItemDbo> findItemsDesc(SearchFilter searchFilter, double longitude, double latitude, String country, int pageSize) {
		return itemDao.findItemsByUpdateTimeAsc(
				longitude,
				latitude,
				searchFilter.minPrice(),
				searchFilter.maxPrice(),
				country,
				searchFilter.searchText(),
				searchFilter.maxMeterDistance(),
				searchFilter.lastPrice(),
				searchFilter.lastUpdate(),
				searchFilter.condition(),
				pageSize
		);
	}

	public Long insertItem(CreateItemDto createItemDto, Long id, double longitude, double latitude, String country) {
		return itemDao.insertItem(createItemDto, id, longitude, latitude, country);
	}

	public void updateItem(UpdateItemDto updateItemDto, Long id, String country, Double longitude, Double latitude) {
		itemDao.updateItem(updateItemDto.name(), updateItemDto.description(), updateItemDto.currency(),
				updateItemDto.price(), updateItemDto.locationId(), updateItemDto.imageUrl(), updateItemDto.email(),
				updateItemDto.phoneNumber(), country, longitude, latitude, id);
	}

}
