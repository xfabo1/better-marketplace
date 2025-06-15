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

	private static final Location BRNO_LOCATION = Location.builder()
			.city("Brno")
			.countryCode(Country.CZ)
			.placeName("Brno Test Location")
			.latitude(49.1951)
			.longitude(16.6068)
			.postalCode("60200")
			.region("Jihomoravský kraj")
			.build();

	private static final Location PRAGUE_LOCATION = Location.builder()
			.city("Praha")
			.countryCode(Country.CZ)
			.placeName("Praha Test Location")
			.latitude(50.0755)
			.longitude(14.4378)
			.postalCode("11000")
			.region("Praha")
			.build();

	private static final Location BRATISLAVA_LOCATION = Location.builder()
			.city("Bratislava")
			.countryCode(Country.SK)
			.placeName("Bratislava Test Location")
			.latitude(48.1486)
			.longitude(17.1077)
			.postalCode("81101")
			.region("Bratislavský kraj")
			.build();

	private static final Location LOCATION = Location.builder()
			.city("Brno")
			.countryCode(Country.CZ)
			.placeName("Brno")
			.latitude(11.11)
			.longitude(12.11)
			.postalCode("99991")
			.region("Brno")
			.city("Brno")
			.build();

	@Autowired
	private LocationDao locationDao;
	@Autowired
	private ItemDao itemDao;
	@Autowired
	private UserDao userDao;

	private Long userId;
	private Long locationId;
	private Long brnoLocationId;
	private Long pragueLocationId;
	private Long bratislavaLocationId;

	@BeforeAll
	public void setUp() {
		userId = userDao.insertUser(USER, "password");
		locationId = locationDao.insertLocation(LOCATION);
		brnoLocationId = locationDao.insertLocation(BRNO_LOCATION);
		pragueLocationId = locationDao.insertLocation(PRAGUE_LOCATION);
		bratislavaLocationId = locationDao.insertLocation(BRATISLAVA_LOCATION);
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
				.condition("new")
				.imageUrl(IMAGE_URL)
				.phoneNumber(PHONE).build();

		var id = itemDao.insertItem(item, userId, 30.0, 30.1, "CZ");

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
				.condition("new")
				.phoneNumber(PHONE).build();

		var id = itemDao.insertItem(item, userId, 30.0, 30.1, "CZ");
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
				updateItem.locationId(), updateItem.imageUrl(), updateItem.email(), updateItem.phoneNumber(), null,
				null, null, id);

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

		itemDao.deleteItem(id);
	}

	@Test
	public void updateItemLocation_locationChanged_allLocationFieldsUpdated() {
		var item = CreateItemDto.builder()
				.name("Test Item")
				.description("Test description")
				.price(BigDecimal.valueOf(500))
				.locationId(brnoLocationId)
				.currency(Currency.CZK)
				.email(EMAIL)
				.condition("new")
				.imageUrl(IMAGE_URL)
				.phoneNumber(PHONE).build();

		var itemId = itemDao.insertItem(item, userId, BRNO_LOCATION.getLatitude(), BRNO_LOCATION.getLongitude(), "CZ");
		
		var initialItem = itemDao.findItem(itemId);
		assertThat(initialItem).isPresent();
		assertThat(initialItem.get())
				.returns(brnoLocationId, ItemDbo::locationId)
				.returns("Brno Test Location", ItemDbo::placeName)
				.returns("60200", ItemDbo::postalCode);
		assertThat(initialItem.get().country()).isEqualTo(Country.CZ);
		
		var updateToPrague = UpdateItemDto.builder()
				.locationId(pragueLocationId)
				.build();
		
		itemDao.updateItem(updateToPrague.name(), updateToPrague.description(), updateToPrague.currency(), 
				updateToPrague.price(), updateToPrague.locationId(), updateToPrague.imageUrl(), 
				updateToPrague.email(), updateToPrague.phoneNumber(), Country.CZ.name(),
				PRAGUE_LOCATION.getLongitude(), PRAGUE_LOCATION.getLatitude(), itemId);
		
		var updatedItem = itemDao.findItem(itemId);
		assertThat(updatedItem).isPresent();
		assertThat(updatedItem.get())
				.returns(pragueLocationId, ItemDbo::locationId)
				.returns("Praha Test Location", ItemDbo::placeName)
				.returns("11000", ItemDbo::postalCode);
		assertThat(updatedItem.get().country()).isEqualTo(Country.CZ);
		
		var updateToBratislava = UpdateItemDto.builder()
				.locationId(bratislavaLocationId)
				.build();
		
		itemDao.updateItem(updateToBratislava.name(), updateToBratislava.description(), updateToBratislava.currency(), 
				updateToBratislava.price(), updateToBratislava.locationId(), updateToBratislava.imageUrl(), 
				updateToBratislava.email(), updateToBratislava.phoneNumber(), Country.SK.name(),
				BRATISLAVA_LOCATION.getLongitude(), BRATISLAVA_LOCATION.getLatitude(), itemId);
		
		var finalItem = itemDao.findItem(itemId);
		assertThat(finalItem).isPresent();
		assertThat(finalItem.get())
				.returns(bratislavaLocationId, ItemDbo::locationId)
				.returns("Bratislava Test Location", ItemDbo::placeName)
				.returns("81101", ItemDbo::postalCode);
		assertThat(finalItem.get().country()).isEqualTo(Country.SK);
		
		itemDao.deleteItem(itemId);
	}
}
