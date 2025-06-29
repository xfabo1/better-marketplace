package org.bettermarketplace.service;

import java.io.File;
import java.util.List;
import java.util.Optional;

import org.bettermarketplace.api.dto.filter.SearchFilterDto;
import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.api.dto.item.UpdateItemDto;
import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.db.entity.PreviewItemDbo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

	public List<PreviewItemDbo> findItemsByUpdateTimeAsc(SearchFilterDto searchFilterDto, Double longitude, Double latitude,
			String country, int page, int pageSize) {
		int offset = page * pageSize;
		return itemDao.findItemsByUpdateTimeAsc(
				longitude,
				latitude,
				searchFilterDto.minPrice(),
				searchFilterDto.maxPrice(),
				country,
				searchFilterDto.searchText(),
				searchFilterDto.maxMeterDistance(),
				searchFilterDto.condition(),
				offset,
				pageSize
		);
	}

	public List<PreviewItemDbo> findItemsByUpdateTimeDesc(SearchFilterDto searchFilterDto, Double longitude, Double latitude,
			String country, int page, int pageSize) {
		int offset = page * pageSize;
		return itemDao.findItemsByUpdateTimeDesc(
				longitude,
				latitude,
				searchFilterDto.minPrice(),
				searchFilterDto.maxPrice(),
				country,
				searchFilterDto.searchText(),
				searchFilterDto.maxMeterDistance(),
				searchFilterDto.condition(),
				offset,
				pageSize
		);
	}

	public List<PreviewItemDbo> findItemsByPriceAsc(SearchFilterDto searchFilterDto, Double longitude, Double latitude,
			String country, int page, int pageSize) {
		int offset = page * pageSize;
		return itemDao.findItemsByPriceAsc(
				longitude,
				latitude,
				searchFilterDto.minPrice(),
				searchFilterDto.maxPrice(),
				country,
				searchFilterDto.searchText(),
				searchFilterDto.maxMeterDistance(),
				searchFilterDto.condition(),
				offset,
				pageSize
		);
	}

	public List<PreviewItemDbo> findItemsByPriceDesc(SearchFilterDto searchFilterDto, Double longitude, Double latitude,
			String country, int page, int pageSize) {
		int offset = page * pageSize;
		return itemDao.findItemsByPriceDesc(
				longitude,
				latitude,
				searchFilterDto.minPrice(),
				searchFilterDto.maxPrice(),
				country,
				searchFilterDto.searchText(),
				searchFilterDto.maxMeterDistance(),
				searchFilterDto.condition(),
				offset,
				pageSize
		);
	}

	public Long insertItem(CreateItemDto createItemDto, Long id, double longitude, double latitude, String country) {
		return itemDao.insertItem(createItemDto, id, longitude, latitude, country);
	}

	public void updateItem(UpdateItemDto updateItemDto, Long id, String country, Double longitude, Double latitude, MultipartFile[] images) {

		itemDao.updateItem(updateItemDto.title(), updateItemDto.description(), updateItemDto.currency(),
				updateItemDto.price(), updateItemDto.locationId(), updateItemDto.email(),
				updateItemDto.phoneNumber(), country, longitude, latitude, id, updateItemDto.condition());
	}

	public int getCountOfAllItems(SearchFilterDto searchFilterDto, Double latitude, Double longitude, String country) {
		return itemDao.getCountOfAllItems(
				longitude,
				latitude,
				searchFilterDto.minPrice(),
				searchFilterDto.maxPrice(),
				country,
				searchFilterDto.searchText(),
				searchFilterDto.maxMeterDistance(),
				searchFilterDto.condition()
		);
	}

	public List<PreviewItemDbo> getPersonalItems(Long id) {
		return itemDao.getPersonalItems(id);
	}
}
