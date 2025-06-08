package org.bettermarketplace.api;

import java.util.Objects;

import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.api.dto.item.ItemFullDetailsDto;
import org.bettermarketplace.api.dto.item.UpdateItemDto;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.db.entity.LocationDbo;
import org.bettermarketplace.db.entity.UserDbo;
import org.bettermarketplace.mapper.ItemMapper;
import org.bettermarketplace.model.Item;
import org.bettermarketplace.security.CookieUtil;
import org.bettermarketplace.security.TokenService;
import org.bettermarketplace.service.ItemService;
import org.bettermarketplace.service.LocationService;
import org.bettermarketplace.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/v1/items")
@Validated
@Slf4j
public class ItemController {

	private static final ItemMapper ITEM_MAPPER = ItemMapper.INSTANCE;

	private final TokenService tokenService;
	private final ItemService itemService;
	private final UserService userService;
	private final LocationService locationService;

	@Autowired
	public ItemController(ItemService itemService, LocationService locationService, UserService userService, TokenService tokenService) {
		this.itemService = itemService;
		this.locationService = locationService;
		this.userService = userService;
		this.tokenService = tokenService;
	}

	@GetMapping("/item/{id}")
	public ResponseEntity<ItemFullDetailsDto> getItemById(@PathVariable("id") Long id) {
		var itemDbo = itemService.findItem(id);

		if (itemDbo.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		var userDbo = userService.getUser(itemDbo.get().userId());

		// If this happens, there is some error in the logic as this should be created all together
		if (userDbo.isEmpty()) {
			log.error("User with id {} not found in item with ID {}", itemDbo.get().userId(), itemDbo.get().id());
			return ResponseEntity.status(500).build();
		}

		var locationDbo = locationService.findLocation(itemDbo.get().locationId());

		// Ths is the same situation as above and this should never happen
		if (locationDbo.isEmpty()) {
			log.error("Location with ID {} not found in item with ID {}", itemDbo.get().locationId(),
					itemDbo.get().id());
			return ResponseEntity.status(500).build();
		}

		var item = combineLocationAndUserWithItem(itemDbo.get(), locationDbo.get(), userDbo.get());
		return ResponseEntity.ok(ITEM_MAPPER.from(item));
	}


	@PostMapping("/item")
	public ResponseEntity<Long> createItem(@RequestBody CreateItemDto createItemDto, HttpServletRequest request) {
		try {
			var token = CookieUtil.extractTokenFromCookie(request);

			var userAuthDetails = tokenService.getUserDetails(token);
			var itemId = itemService.insertItem(createItemDto, userAuthDetails.getUserId());
			return ResponseEntity.status(201).body(itemId);
		} catch (Exception e) {
			return ResponseEntity.status(500).build();
		}
	}

	@PutMapping("/item/{id}")
	public ResponseEntity<Void> updateItem(@PathVariable("id") Long id, @RequestBody UpdateItemDto updateItemDto, HttpServletRequest request) {
		try {
			var token = CookieUtil.extractTokenFromCookie(request);
			var userAuthDetails = tokenService.getUserDetails(token);
			if (!Objects.equals(userAuthDetails.getUserId(), id)) {
				return ResponseEntity.status(401).build();
			}

			itemService.updateItem(updateItemDto, id);

			return ResponseEntity.status(201).build();
		} catch (Exception e) {
			log.error("Error while updating item with ID {}", id, e);
			return ResponseEntity.status(500).build();
		}
	}

	private Item combineLocationAndUserWithItem(ItemDbo itemDbo, LocationDbo locationDbo, UserDbo userDbo) {
		return Item.builder()
				.id(itemDbo.id())
				.name(itemDbo.name())
				.price(itemDbo.price())
				.currency(itemDbo.currency())
				.description(itemDbo.description())
				.imageUrl(itemDbo.imageUrl())
				.locationId(locationDbo.id())
				.creatorId(userDbo.id())
				.build();
	}
}
