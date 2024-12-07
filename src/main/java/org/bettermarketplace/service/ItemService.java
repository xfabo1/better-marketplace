package org.bettermarketplace.service;

import java.util.Optional;

import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.entity.Item;
import org.springframework.stereotype.Service;

@Service
public class ItemService {

	private final ItemDao itemDao;

	public ItemService(ItemDao itemDao) {
		this.itemDao = itemDao;
	}

	public Optional<Item> findItemById(String id) {
		return itemDao.findItemById(id);
	}

	public void createItem(Item item) {
		itemDao.insertItem(item);
	}
}
