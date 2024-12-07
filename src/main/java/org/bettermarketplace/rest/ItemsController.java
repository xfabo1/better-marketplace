package org.bettermarketplace.rest;

import org.bettermarketplace.db.entity.Item;
import org.bettermarketplace.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/items")
public class ItemsController {

	private final ItemService itemService;

	@Autowired
	public ItemsController(ItemService itemService) {
		this.itemService = itemService;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Item> getItemById(@PathVariable("id") String id) {
		return ResponseEntity.of(itemService.findItemById(id));
	}

	@PostMapping
	public ResponseEntity<Void> createItem(@RequestBody Item item) {
		itemService.createItem(item);
		return ResponseEntity.ok().build();
	}
}
