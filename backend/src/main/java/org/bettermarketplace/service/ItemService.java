package org.bettermarketplace.service;

import java.util.List;
import java.util.Optional;

import org.bettermarketplace.api.dto.filter.SearchFilter;
import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.api.dto.item.UpdateItemDto;
import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.dao.ItemSearchQuery;
import org.bettermarketplace.db.entity.ItemDbo;
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

	public List<ItemDbo> findItems(SearchFilter filter, int pageSize) {
		return itemDao.searchItems(ItemSearchQuery.builder()
				.minPrice(filter.minPrice())
				.maxPrice(filter.maxPrice())
				.textSearch(filter.searchText())
				.condition(filter.condition())
				.maxMeterDistance(filter.maxMeterDistance())
				.sorting(filter.sorting())
				.lastPrice(filter.lastPrice())
				.lastUpdated(filter.lastUpdate())
				.pageSize(pageSize)
				.build());
	}

	public Long insertItem(CreateItemDto createItemDto, Long id, double longitude, double latitude, String country) {
		return itemDao.insertItem(createItemDto, id, latitude, longitude, country);
	}

	public void updateItem(UpdateItemDto updateItemDto, Long id, String country, Double longitude, Double latitude) {
		itemDao.updateItem(updateItemDto.name(), updateItemDto.description(), updateItemDto.currency(),
				updateItemDto.price(), updateItemDto.locationId(), updateItemDto.imageUrl(), updateItemDto.email(),
				updateItemDto.phoneNumber(), country, longitude, latitude, id);
	}
}
