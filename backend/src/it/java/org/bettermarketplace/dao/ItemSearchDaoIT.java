package org.bettermarketplace.dao;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.api.dto.user.RegisterUserDto;
import org.bettermarketplace.configuration.PostgisTest;
import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.dao.ItemSearchQuery;
import org.bettermarketplace.db.dao.LocationDao;
import org.bettermarketplace.db.dao.UserDao;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.model.Country;
import org.bettermarketplace.model.Currency;
import org.bettermarketplace.model.Location;
import org.bettermarketplace.model.Sorting;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ItemSearchDaoIT extends PostgisTest {

	private static final String USER_EMAIL = "testuser@gmail.com";
	private static final String PHONE = "+420123456789";
	private static final String IMAGE_URL = "https://example.com/image.jpg";

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

	@Autowired
	private LocationDao locationDao;
	@Autowired
	private ItemDao itemDao;
	@Autowired
	private UserDao userDao;

	private Long userId;
	private Long brnoLocationId;
	private Long pragueLocationId;
	private final List<Long> createdItemIds = new ArrayList<>();

	@BeforeAll
	public void setUp() {
		RegisterUserDto testUser = new RegisterUserDto("testuser", USER_EMAIL, "password123");
		userId = userDao.insertUser(testUser, "password123");
		brnoLocationId = locationDao.insertLocation(BRNO_LOCATION);
		pragueLocationId = locationDao.insertLocation(PRAGUE_LOCATION);
	}

	@AfterEach
	public void cleanUp() {
		createdItemIds.forEach(itemDao::deleteItem);
		createdItemIds.clear();
	}

	@Test
	public void searchItems_priceAsc_noFilters_returnsAllItemsSortedByPriceAsc() {
		createTestItem("Cheap Item", BigDecimal.valueOf(100), brnoLocationId);
		createTestItem("Expensive Item", BigDecimal.valueOf(500), brnoLocationId);
		createTestItem("Medium Item", BigDecimal.valueOf(300), brnoLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_ASC)
				.pageSize(10)
				.build());

		assertThat(results).hasSize(3);
		assertThat(results.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(100));
		assertThat(results.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(300));
		assertThat(results.get(2).price()).isEqualByComparingTo(BigDecimal.valueOf(500));
	}

	@Test
	public void searchItems_priceDesc_noFilters_returnsAllItemsSortedByPriceDesc() {
		createTestItem("Cheap Item", BigDecimal.valueOf(100), brnoLocationId);
		createTestItem("Expensive Item", BigDecimal.valueOf(500), brnoLocationId);
		createTestItem("Medium Item", BigDecimal.valueOf(300), brnoLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_DESC)
				.pageSize(10)
				.build());

		assertThat(results).hasSize(3);
		assertThat(results.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(500));
		assertThat(results.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(300));
		assertThat(results.get(2).price()).isEqualByComparingTo(BigDecimal.valueOf(100));
	}

	@Test
	public void searchItems_oldest_noFilters_returnsAllItemsSortedByUpdateTimeAsc() throws InterruptedException {
		createTestItem("First Item", BigDecimal.valueOf(100), brnoLocationId);
		Thread.sleep(100);
		createTestItem("Second Item", BigDecimal.valueOf(200), brnoLocationId);
		Thread.sleep(100);
		createTestItem("Third Item", BigDecimal.valueOf(300), brnoLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.OLDEST)
				.pageSize(10)
				.build());

		assertThat(results).hasSize(3);
		assertThat(results.get(0).name()).isEqualTo("First Item");
		assertThat(results.get(1).name()).isEqualTo("Second Item");
		assertThat(results.get(2).name()).isEqualTo("Third Item");
	}

	@Test
	public void searchItems_newest_noFilters_returnsAllItemsSortedByUpdateTimeDesc()
			throws InterruptedException {
		createTestItem("First Item", BigDecimal.valueOf(100), brnoLocationId);
		Thread.sleep(100);
		createTestItem("Second Item", BigDecimal.valueOf(200), brnoLocationId);
		Thread.sleep(100);
		createTestItem("Third Item", BigDecimal.valueOf(300), brnoLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.NEWEST)
				.pageSize(10)
				.build());

		assertThat(results).hasSize(3);
		assertThat(results.get(0).name()).isEqualTo("Third Item");
		assertThat(results.get(1).name()).isEqualTo("Second Item");
		assertThat(results.get(2).name()).isEqualTo("First Item");
	}

	@Test
	public void searchItems_priceAsc_withPriceRange_returnsFilteredItems() {
		createTestItem("Cheap Item", BigDecimal.valueOf(50), brnoLocationId);
		createTestItem("Medium Item", BigDecimal.valueOf(150), brnoLocationId);
		createTestItem("Expensive Item", BigDecimal.valueOf(300), brnoLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_ASC)
				.minPrice(100.0)
				.maxPrice(200.0)
				.pageSize(10)
				.build());

		assertThat(results).hasSize(1);
		assertThat(results.getFirst().name()).isEqualTo("Medium Item");
		assertThat(results.getFirst().price()).isEqualByComparingTo(BigDecimal.valueOf(150));
	}

	@Test
	public void searchItems_priceDesc_withMinPriceOnly_returnsFilteredItems() {
		createTestItem("Cheap Item", BigDecimal.valueOf(50), brnoLocationId);
		createTestItem("Medium Item", BigDecimal.valueOf(150), brnoLocationId);
		createTestItem("Expensive Item", BigDecimal.valueOf(300), brnoLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_DESC)
				.minPrice(100.0)
				.pageSize(10)
				.build());

		assertThat(results).hasSize(2);
		assertThat(results.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(300));
		assertThat(results.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(150));
	}

	@Test
	public void searchItems_priceAsc_withTextSearch_returnsFilteredItems() {
		createTestItem("iPhone 14 Pro", "Latest smartphone with great camera", BigDecimal.valueOf(800), brnoLocationId);
		createTestItem("MacBook Pro", "Professional laptop for developers", BigDecimal.valueOf(1500), brnoLocationId);
		createTestItem("Toyota Camry", "Reliable family car", BigDecimal.valueOf(15000), brnoLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_ASC)
				.textSearch("Pro")
				.pageSize(10)
				.build());

		assertThat(results).hasSize(2);
		assertThat(results.get(0).name()).isEqualTo("iPhone 14 Pro");
		assertThat(results.get(1).name()).isEqualTo("MacBook Pro");
	}

	@Test
	public void searchItems_priceAsc_withSpatialFilter_returnsFilteredItems() {
		createTestItem("Brno Item", BigDecimal.valueOf(100), brnoLocationId);
		createTestItem("Prague Item", BigDecimal.valueOf(200), pragueLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_ASC)
				.longitude(BRNO_LOCATION.getLongitude())
				.latitude(BRNO_LOCATION.getLatitude())
				.maxMeterDistance(50000.0)
				.pageSize(10)
				.build());

		assertThat(results).hasSize(1);
		assertThat(results.getFirst().name()).isEqualTo("Brno Item");
	}

	@Test
	public void searchItems_priceAsc_withLargeSpatialFilter_returnsMultipleItems() {
		createTestItem("Brno Item", BigDecimal.valueOf(100), brnoLocationId);
		createTestItem("Prague Item", BigDecimal.valueOf(200), pragueLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_ASC)
				.longitude(BRNO_LOCATION.getLongitude())
				.latitude(BRNO_LOCATION.getLatitude())
				.maxMeterDistance(250000.0)
				.pageSize(10)
				.build());

		assertThat(results).hasSize(2);
		assertThat(results.get(0).name()).isEqualTo("Brno Item");
		assertThat(results.get(1).name()).isEqualTo("Prague Item");
	}

	@Test
	public void searchItems_priceAsc_withLastPriceFilter_returnsFilteredItems() {
		createTestItem("Item 1", BigDecimal.valueOf(100), brnoLocationId);
		createTestItem("Item 2", BigDecimal.valueOf(200), brnoLocationId);
		createTestItem("Item 3", BigDecimal.valueOf(300), brnoLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_ASC)
				.lastPrice(BigDecimal.valueOf(150))
				.pageSize(10)
				.build());

		assertThat(results).hasSize(2);
		assertThat(results.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(200));
		assertThat(results.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(300));
	}

	@Test
	public void searchItems_priceDesc_withLastPriceFilter_returnsFilteredItems() {
		createTestItem("Item 1", BigDecimal.valueOf(100), brnoLocationId);
		createTestItem("Item 2", BigDecimal.valueOf(200), brnoLocationId);
		createTestItem("Item 3", BigDecimal.valueOf(300), brnoLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_DESC)
				.lastPrice(BigDecimal.valueOf(250))
				.pageSize(10)
				.build());

		assertThat(results).hasSize(2);
		assertThat(results.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(200));
		assertThat(results.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(100));
	}

	@Test
	public void searchItems_oldest_withLastUpdatedFilter_returnsFilteredItems() throws InterruptedException {
		createTestItem("Old Item", BigDecimal.valueOf(100), brnoLocationId);
		Thread.sleep(1000);
		Instant cutoffTime = Instant.now();
		Thread.sleep(1000);
		createTestItem("New Item", BigDecimal.valueOf(200), brnoLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.OLDEST)
				.lastUpdated(cutoffTime)
				.pageSize(10)
				.build());

		assertThat(results).hasSize(1);
		assertThat(results.getFirst().name()).isEqualTo("New Item");
	}

	@Test
	public void searchItems_newest_withLastUpdatedFilter_returnsFilteredItems() throws InterruptedException {
		createTestItem("Old Item", BigDecimal.valueOf(100), brnoLocationId);
		Thread.sleep(1000);
		Instant cutoffTime = Instant.now();
		Thread.sleep(1000);
		createTestItem("New Item", BigDecimal.valueOf(200), brnoLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.NEWEST)
				.lastUpdated(cutoffTime)
				.pageSize(10)
				.build());

		assertThat(results).hasSize(1);
		assertThat(results.getFirst().name()).isEqualTo("Old Item");
	}

	@Test
	public void searchItems_priceAsc_withPageSizeLimit_returnsLimitedResults() {
		for (int i = 1; i <= 5; i++) {
			createTestItem("Item " + i, BigDecimal.valueOf(i * 100), brnoLocationId);
		}

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_ASC)
				.pageSize(3)
				.build());

		assertThat(results).hasSize(3);
		assertThat(results.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(100));
		assertThat(results.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(200));
		assertThat(results.get(2).price()).isEqualByComparingTo(BigDecimal.valueOf(300));
	}

	@Test
	public void searchItems_priceAsc_withEmptyResults_returnsEmptyList() {
		createTestItem("Test Item", BigDecimal.valueOf(100), brnoLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_ASC)
				.minPrice(1000.0)
				.maxPrice(2000.0)
				.pageSize(10)
				.build());

		assertThat(results).isEmpty();
	}

	@Test
	public void searchItems_oldest_withSpatialAndTextFilters_returnsCorrectResults() {
		createTestItem("iPhone in Brno", "Great phone available in Brno", BigDecimal.valueOf(500), brnoLocationId);
		createTestItem("iPhone in Prague", "Excellent phone in Prague", BigDecimal.valueOf(550), pragueLocationId);
		createTestItem("MacBook in Brno", "Professional laptop in Brno", BigDecimal.valueOf(1000), brnoLocationId);

		List<ItemDbo> results = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.OLDEST)
				.longitude(BRNO_LOCATION.getLongitude())
				.latitude(BRNO_LOCATION.getLatitude())
				.textSearch("iPhone")
				.maxMeterDistance(50000.0)
				.pageSize(10)
				.build());

		assertThat(results).hasSize(1);
		assertThat(results.getFirst().name()).isEqualTo("iPhone in Brno");
	}

	@Test
	public void searchItems_priceAsc_withPagination_returnsCorrectPagesWithoutDuplicates() {
		for (int i = 1; i <= 10; i++) {
			createTestItem("Item " + String.format("%02d", i), BigDecimal.valueOf(i * 100), brnoLocationId);
		}

		List<ItemDbo> firstPage = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_ASC)
				.pageSize(4)
				.build());
		assertThat(firstPage).hasSize(4);
		assertThat(firstPage.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(100));
		assertThat(firstPage.get(3).price()).isEqualByComparingTo(BigDecimal.valueOf(400));

		BigDecimal lastPriceFromFirstPage = firstPage.get(3).price();
		List<ItemDbo> secondPage = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_ASC)
				.lastPrice(lastPriceFromFirstPage.add(BigDecimal.valueOf(1)))
				.pageSize(4)
				.build());

		assertThat(secondPage).hasSize(4);
		assertThat(secondPage.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(500));
		assertThat(secondPage.get(3).price()).isEqualByComparingTo(BigDecimal.valueOf(800));

		List<String> firstPageNames = firstPage.stream().map(ItemDbo::name).toList();
		List<String> secondPageNames = secondPage.stream().map(ItemDbo::name).toList();
		assertThat(firstPageNames).doesNotContainAnyElementsOf(secondPageNames);
	}

	@Test
	public void searchItems_priceDesc_withPagination_returnsCorrectPagesWithoutDuplicates() {
		for (int i = 1; i <= 10; i++) {
			createTestItem("Item " + String.format("%02d", i), BigDecimal.valueOf(i * 100), brnoLocationId);
		}

		List<ItemDbo> firstPage = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_DESC)
				.pageSize(4)
				.build());
		assertThat(firstPage).hasSize(4);
		assertThat(firstPage.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(1000));
		assertThat(firstPage.get(3).price()).isEqualByComparingTo(BigDecimal.valueOf(700));

		BigDecimal lastPriceFromFirstPage = firstPage.get(3).price();
		List<ItemDbo> secondPage = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.PRICE_DESC)
				.lastPrice(lastPriceFromFirstPage.subtract(BigDecimal.valueOf(1)))
				.pageSize(4)
				.build());

		assertThat(secondPage).hasSize(4);
		assertThat(secondPage.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(600));
		assertThat(secondPage.get(3).price()).isEqualByComparingTo(BigDecimal.valueOf(300));

		List<String> firstPageNames = firstPage.stream().map(ItemDbo::name).toList();
		List<String> secondPageNames = secondPage.stream().map(ItemDbo::name).toList();
		assertThat(firstPageNames).doesNotContainAnyElementsOf(secondPageNames);
	}

	@Test
	public void searchItems_oldest_withPagination_returnsCorrectPagesWithoutDuplicates()
			throws InterruptedException {
		for (int i = 1; i <= 8; i++) {
			createTestItem("Item " + String.format("%02d", i), BigDecimal.valueOf(i * 100), brnoLocationId);
			Thread.sleep(50);
		}

		List<ItemDbo> firstPage = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.OLDEST)
				.pageSize(3)
				.build());
		assertThat(firstPage).hasSize(3);
		assertThat(firstPage.get(0).name()).isEqualTo("Item 01");
		assertThat(firstPage.get(2).name()).isEqualTo("Item 03");

		Instant lastUpdatedFromFirstPage = firstPage.get(2).updatedAt();
		List<ItemDbo> secondPage = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.OLDEST)
				.lastUpdated(lastUpdatedFromFirstPage.plusMillis(1))
				.pageSize(3)
				.build());

		assertThat(secondPage).hasSize(3);
		assertThat(secondPage.get(0).name()).isEqualTo("Item 04");
		assertThat(secondPage.get(2).name()).isEqualTo("Item 06");

		List<String> firstPageNames = firstPage.stream().map(ItemDbo::name).toList();
		List<String> secondPageNames = secondPage.stream().map(ItemDbo::name).toList();
		assertThat(firstPageNames).doesNotContainAnyElementsOf(secondPageNames);
	}

	@Test
	public void searchItems_newest_withPagination_returnsCorrectPagesWithoutDuplicates()
			throws InterruptedException {
		for (int i = 1; i <= 8; i++) {
			createTestItem("Item " + String.format("%02d", i), BigDecimal.valueOf(i * 100), brnoLocationId);
			Thread.sleep(50);
		}

		List<ItemDbo> firstPage = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.NEWEST)
				.pageSize(3)
				.build());
		assertThat(firstPage).hasSize(3);
		assertThat(firstPage.get(0).name()).isEqualTo("Item 08");
		assertThat(firstPage.get(2).name()).isEqualTo("Item 06");

		Instant lastUpdatedFromFirstPage = firstPage.get(2).updatedAt();
		List<ItemDbo> secondPage = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.NEWEST)
				.lastUpdated(lastUpdatedFromFirstPage.minusMillis(1))
				.pageSize(3)
				.build());

		assertThat(secondPage).hasSize(3);
		assertThat(secondPage.get(0).name()).isEqualTo("Item 05");
		assertThat(secondPage.get(2).name()).isEqualTo("Item 03");

		List<String> firstPageNames = firstPage.stream().map(ItemDbo::name).toList();
		List<String> secondPageNames = secondPage.stream().map(ItemDbo::name).toList();
		assertThat(firstPageNames).doesNotContainAnyElementsOf(secondPageNames);
	}

	@Test
	public void searchItems_withCategoryAndSubcategory_returnsFilteredItems() {
		createCategorizedItem("Car", "transport", "cars");
		createCategorizedItem("Motorcycle", "transport", "motorcycles");
		createCategorizedItem("Phone", "electronics", "phones");

		List<ItemDbo> transport = itemDao.searchItems(ItemSearchQuery.builder()
				.sorting(Sorting.OLDEST)
				.category("transport")
				.pageSize(10)
				.build());
		List<ItemDbo> motorcycles = itemDao.searchItems(ItemSearchQuery.builder()
				.category("transport")
				.subcategory("motorcycles")
				.pageSize(10)
				.build());

		assertThat(transport).extracting(ItemDbo::name).containsExactly("Car", "Motorcycle");
		assertThat(motorcycles).extracting(ItemDbo::name).containsExactly("Motorcycle");
	}

	private void createCategorizedItem(String name, String category, String subcategory) {
		CreateItemDto item = new CreateItemDto(name, "Test description for " + name, Currency.CZK,
				BigDecimal.valueOf(100), brnoLocationId, IMAGE_URL, USER_EMAIL, PHONE, category, subcategory, "new");
		createdItemIds.add(itemDao.insertItem(item, userId, BRNO_LOCATION.getLatitude(),
				BRNO_LOCATION.getLongitude()));
	}

	private void createTestItem(String name, BigDecimal price, Long locationId) {
		createTestItem(name, "Test description for " + name, price, locationId);
	}

	private void createTestItem(String name, String description, BigDecimal price, Long locationId) {
		CreateItemDto item = new CreateItemDto(name, description, Currency.CZK, price, locationId, IMAGE_URL,
				USER_EMAIL, PHONE, null, null, "new");

		var location = locationId.equals(brnoLocationId) ? BRNO_LOCATION : PRAGUE_LOCATION;
		Long itemId = itemDao.insertItem(item, userId, location.getLatitude(), location.getLongitude());
		createdItemIds.add(itemId);
	}
} 