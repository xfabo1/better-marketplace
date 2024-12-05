package org.bettermarketplace.service;

import java.util.Optional;

import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.entity.Item;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemService {

	private final ItemDao itemDao;

	public Optional<Item> findItemById(String id) {
		return itemDao.findItemById(id);
	}
}
