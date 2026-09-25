package org.bettermarketplace.service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.bettermarketplace.api.dto.filter.SearchFilter;
import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.api.dto.item.UpdateItemDto;
import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.model.Country;
import org.bettermarketplace.model.Sorting;
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
		var sorting = filter.sorting() == null ? Sorting.NEWEST : filter.sorting();
		ItemQuery query = switch (sorting) {
			case NEWEST -> itemDao::findItemsByUpdateTimeDesc;
			case OLDEST -> itemDao::findItemsByUpdateTimeAsc;
			case PRICE_ASC -> itemDao::findItemsByPriceAsc;
			case PRICE_DESC -> itemDao::findItemsByPriceDesc;
		};
		return query.find(null, null, filter.minPrice(), filter.maxPrice(), null, filter.searchText(),
				filter.maxMeterDistance(), filter.lastPrice(), filter.lastUpdate(), filter.condition(), pageSize);
	}

	public Long insertItem(CreateItemDto createItemDto, Long id, double longitude, double latitude, String country) {
		return itemDao.insertItem(createItemDto, id, latitude, longitude, country);
	}

	public void updateItem(UpdateItemDto updateItemDto, Long id, String country, Double longitude, Double latitude) {
		itemDao.updateItem(updateItemDto.name(), updateItemDto.description(), updateItemDto.currency(),
				updateItemDto.price(), updateItemDto.locationId(), updateItemDto.imageUrl(), updateItemDto.email(),
				updateItemDto.phoneNumber(), country, longitude, latitude, id);
	}

	/** Shared signature of the four ItemDao search queries, which differ only in their ORDER BY. */
	@FunctionalInterface
	private interface ItemQuery {
		List<ItemDbo> find(Double longitude, Double latitude, Double minPrice, Double maxPrice, String country,
				String textSearch, Double maxMeterDistance, BigDecimal lastPrice, Instant lastUpdated, String condition,
				int pageSize);
	}
}
