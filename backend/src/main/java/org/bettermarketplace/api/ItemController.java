package org.bettermarketplace.api;

import org.bettermarketplace.api.dto.item.ItemFullDetailsDto;
import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.dao.LocationDao;
import org.bettermarketplace.db.dao.UserDao;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.db.entity.LocationDbo;
import org.bettermarketplace.db.entity.UserDbo;
import org.bettermarketplace.mapper.ItemMapper;
import org.bettermarketplace.mapper.LocationMapper;
import org.bettermarketplace.mapper.UserMapper;
import org.bettermarketplace.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/v1/items")
@Validated
@Slf4j
public class ItemController {

	private static final ItemMapper ITEM_MAPPER = ItemMapper.INSTANCE;
	private static final UserMapper USER_MAPPER = UserMapper.INSTANCE;
	private static final LocationMapper LOCATION_MAPPER = LocationMapper.INSTANCE;

	private final ItemDao itemDao;
	private final UserDao userDao;
	private final LocationDao locationDao;

	@Autowired
	public ItemController(ItemDao itemDao, LocationDao locationDao, UserDao userDao) {
		this.itemDao = itemDao;
		this.locationDao = locationDao;
		this.userDao = userDao;
	}

	@GetMapping("/item/{id}")
	public ResponseEntity<ItemFullDetailsDto> getItemById(@PathVariable("id") Long id) {
		var itemDbo = itemDao.findItem(id);

		if (itemDbo.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		var userDbo = userDao.getUser(itemDbo.get().userId());

		// If this happens, there is some error in the logic as this should be created all together
		if (userDbo.isEmpty()) {
			log.error("User with id {} not found in item with ID {}", itemDbo.get().userId(), itemDbo.get().id());
			return ResponseEntity.status(500).build();
		}

		var locationDbo = locationDao.findLocation(itemDbo.get().locationId());

		// Ths is the same situation as above and this should never happen
		if (locationDbo.isEmpty()) {
			log.error("Location with ID {} not found in item with ID {}", itemDbo.get().locationId(),
					itemDbo.get().id());
			return ResponseEntity.status(500).build();
		}

		var item = combineLocationAndUserWithItem(itemDbo.get(), locationDbo.get(), userDbo.get());
		return ResponseEntity.ok(ITEM_MAPPER.from(item));
	}

	private Item combineLocationAndUserWithItem(ItemDbo itemDbo, LocationDbo locationDbo, UserDbo userDbo) {
		return Item.builder()
				.id(itemDbo.id())
				.name(itemDbo.name())
				.price(itemDbo.price())
				.currency(itemDbo.currency())
				.description(itemDbo.description())
				.imageUrl(itemDbo.imageUrl())
				.location(LOCATION_MAPPER.from(locationDbo))
				.creator(USER_MAPPER.from(userDbo))
				.build();
	}
}
