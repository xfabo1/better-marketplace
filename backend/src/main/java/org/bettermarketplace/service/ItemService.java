package org.bettermarketplace.service;

import java.util.List;
import java.util.Optional;

import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.api.dto.item.UpdateItemDto;
import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.model.Item;
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

	public List<ItemDbo> findItems() {
		return itemDao.findItems();
	}

	public Long insertItem(CreateItemDto createItemDto, Long id) {
		return itemDao.insertItem(createItemDto, id);
	}

	public Long updateItem(UpdateItemDto updateItemDto, Long id) {
		return itemDao.updateItem(updateItemDto.name(), updateItemDto.description(), updateItemDto.currency(),
				updateItemDto.price(), updateItemDto.location(), updateItemDto.imageUrl(), updateItemDto.email(),
				updateItemDto.phoneNumber(), id);
	}

}
