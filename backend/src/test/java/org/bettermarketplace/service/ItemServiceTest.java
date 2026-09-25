package org.bettermarketplace.service;

import static org.mockito.Mockito.verify;

import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.db.dao.ItemDao;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ItemServiceTest {

	private static final double BRNO_LONGITUDE = 16.6068;
	private static final double BRNO_LATITUDE = 49.1951;

	@Mock
	private ItemDao itemDao;

	@InjectMocks
	private ItemService itemService;

	@Test
	void insertItem_coordinates_passedToDaoInItsOrder() {
		var dto = CreateItemDto.builder().name("Bike").build();

		itemService.insertItem(dto, 1L, BRNO_LONGITUDE, BRNO_LATITUDE, "CZ");

		verify(itemDao).insertItem(dto, 1L, BRNO_LATITUDE, BRNO_LONGITUDE, "CZ");
	}
}
