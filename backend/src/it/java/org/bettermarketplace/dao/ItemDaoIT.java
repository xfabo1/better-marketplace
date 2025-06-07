package org.bettermarketplace.dao;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;

import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.api.dto.item.UpdateItemDto;
import org.bettermarketplace.api.dto.user.RegisterUserDto;
import org.bettermarketplace.configuration.PostgisTest;
import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.dao.LocationDao;
import org.bettermarketplace.db.dao.UserDao;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.model.Country;
import org.bettermarketplace.model.Currency;
import org.bettermarketplace.model.Location;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ItemDaoIT extends PostgisTest {

	private static final String NAME = "user";
	private static final String EMAIL = "user@gmail.com";
	private static final String DESCRIPTION = "Description";
	private static final BigDecimal PRICE = BigDecimal.valueOf(11.50);
	private static final String IMAGE_URL = "url";
	private static final String PHONE = "phone";
	private static final RegisterUserDto USER = RegisterUserDto.builder()
			.username("filda")
			.email(EMAIL)
			.country(Country.CZ)
			.password("password")
			.displayItemsFromOtherCountry(false)
			.build();

	private static final Location LOCATION = Location.builder()
			.city("Brno")
			.countryCode(Country.CZ)
			.placeName("BRno")
			.latitude(11.11f)
			.longitude(12.11f)
			.postalCode("99991")
			.build();

	@Autowired
	private LocationDao locationDao;
	@Autowired
	private ItemDao itemDao;
	@Autowired
	private UserDao userDao;

	private Long userId;
	private Long locationId;

	@BeforeAll
	public void setUp() {
		userId = userDao.insertUser(USER, "password");
		locationId = locationDao.insertLocation(LOCATION);
	}

	@Test
	public void insertItem_validBody_itemInserted() {
		var item = CreateItemDto.builder()
				.name(NAME)
				.description(DESCRIPTION)
				.price(PRICE)
				.locationId(locationId)
				.currency(Currency.CZK)
				.email(EMAIL)
				.imageUrl(IMAGE_URL)
				.phoneNumber(PHONE).build();

		var id = itemDao.insertItem(item, userId);

		var itemDbo = itemDao.findItem(id);

		assertThat(itemDbo).isPresent();
		assertThat(itemDbo.get())
				.returns(NAME, ItemDbo::name)
				.returns(DESCRIPTION, ItemDbo::description);
		assertThat(itemDbo.get().price().compareTo(PRICE)).isZero();
		assertThat(itemDbo.get())
				.returns(locationId, ItemDbo::locationId)
				.returns(Currency.CZK, ItemDbo::currency)
				.returns(EMAIL, ItemDbo::email)
				.returns(IMAGE_URL, ItemDbo::imageUrl)
				.returns(PHONE, ItemDbo::phoneNumber)
				.returns(userId, ItemDbo::userId);

		itemDao.deleteItem(id);
	}

	@Test
	public void updateItem_validBody_itemUpdated() {
		var item = CreateItemDto.builder()
				.name(NAME)
				.description(DESCRIPTION)
				.price(PRICE)
				.locationId(locationId)
				.currency(Currency.CZK)
				.email(EMAIL)
				.imageUrl(IMAGE_URL)
				.phoneNumber(PHONE).build();

		var id = itemDao.insertItem(item, userId);
		var itemDbo = itemDao.findItem(id);

		assertThat(itemDbo).isPresent();
		assertThat(itemDbo.get())
				.returns(NAME, ItemDbo::name)
				.returns(DESCRIPTION, ItemDbo::description);
		assertThat(itemDbo.get().price().compareTo(PRICE)).isZero();
		assertThat(itemDbo.get())
				.returns(locationId, ItemDbo::locationId)
				.returns(Currency.CZK, ItemDbo::currency)
				.returns(EMAIL, ItemDbo::email)
				.returns(IMAGE_URL, ItemDbo::imageUrl)
				.returns(PHONE, ItemDbo::phoneNumber)
				.returns(userId, ItemDbo::userId);

		var updateItem = UpdateItemDto.builder()
				.email("random@gmail.com")
				.price(BigDecimal.TEN)
				.build();

		itemDao.updateItem(updateItem.name(), updateItem.description(), updateItem.currency(), updateItem.price(),
				updateItem.location(), updateItem.imageUrl(), updateItem.email(), updateItem.phoneNumber(), id);

		var updatedItem = itemDao.findItem(id);

		assertThat(updatedItem).isPresent();
		assertThat(updatedItem.get())
				.returns(NAME, ItemDbo::name)
				.returns(DESCRIPTION, ItemDbo::description);
		assertThat(updatedItem.get().price().compareTo(BigDecimal.TEN)).isZero();
		assertThat(updatedItem.get())
				.returns(locationId, ItemDbo::locationId)
				.returns(Currency.CZK, ItemDbo::currency)
				.returns("random@gmail.com", ItemDbo::email)
				.returns(IMAGE_URL, ItemDbo::imageUrl)
				.returns(PHONE, ItemDbo::phoneNumber)
				.returns(userId, ItemDbo::userId);
	}
}
