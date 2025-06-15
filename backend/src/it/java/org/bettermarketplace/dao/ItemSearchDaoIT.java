package org.bettermarketplace.dao;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.api.dto.user.RegisterUserDto;
import org.bettermarketplace.configuration.PostgisTest;
import org.bettermarketplace.db.dao.ItemDao;
import org.bettermarketplace.db.dao.LocationDao;
import org.bettermarketplace.db.dao.UserDao;
import org.bettermarketplace.db.entity.PreviewItemDbo;
import org.bettermarketplace.model.Country;
import org.bettermarketplace.model.Currency;
import org.bettermarketplace.model.Location;
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

	private static final Location BRATISLAVA_LOCATION = Location.builder()
			.city("Bratislava")
			.countryCode(Country.SK)
			.placeName("Bratislava Test Location")
			.latitude(48.1486)
			.longitude(17.1077)
			.postalCode("81101")
			.region("Bratislavský kraj")
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
	private Long bratislavaLocationId;
	private final List<Long> createdItemIds = new ArrayList<>();

	@BeforeAll
	public void setUp() {
		RegisterUserDto testUser = new RegisterUserDto("testuser", USER_EMAIL, "password123", true, Country.CZ);
		userId = userDao.insertUser(testUser, "password123");
		brnoLocationId = locationDao.insertLocation(BRNO_LOCATION);
		pragueLocationId = locationDao.insertLocation(PRAGUE_LOCATION);
		bratislavaLocationId = locationDao.insertLocation(BRATISLAVA_LOCATION);
	}

	@AfterEach
	public void cleanUp() {
		createdItemIds.forEach(itemDao::deleteItem);
		createdItemIds.clear();
	}

	@Test
	public void findItemsByPriceAsc_noFilters_returnsAllItemsSortedByPriceAsc() {
		createTestItem("Cheap Item", BigDecimal.valueOf(100), brnoLocationId);
		createTestItem("Expensive Item", BigDecimal.valueOf(500), brnoLocationId);
		createTestItem("Medium Item", BigDecimal.valueOf(300), brnoLocationId);

		List<PreviewItemDbo> results = itemDao.findItemsByPriceAsc(null, null, null, null, null, null, null, null, 0, 10);

		assertThat(results).hasSize(3);
		assertThat(results.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(100));
		assertThat(results.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(300));
		assertThat(results.get(2).price()).isEqualByComparingTo(BigDecimal.valueOf(500));
	}

	@Test
	public void findItemsByPriceDesc_noFilters_returnsAllItemsSortedByPriceDesc() {
		createTestItem("Cheap Item", BigDecimal.valueOf(100), brnoLocationId);
		createTestItem("Expensive Item", BigDecimal.valueOf(500), brnoLocationId);
		createTestItem("Medium Item", BigDecimal.valueOf(300), brnoLocationId);

		List<PreviewItemDbo> results = itemDao.findItemsByPriceDesc(null, null, null, null, null, null, null, null, 0, 10);

		assertThat(results).hasSize(3);
		assertThat(results.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(500));
		assertThat(results.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(300));
		assertThat(results.get(2).price()).isEqualByComparingTo(BigDecimal.valueOf(100));
	}

	@Test
	public void findItemsByUpdateTimeAsc_noFilters_returnsAllItemsSortedByUpdateTimeAsc() throws InterruptedException {
		createTestItem("First Item", BigDecimal.valueOf(100), brnoLocationId);
		Thread.sleep(100);
		createTestItem("Second Item", BigDecimal.valueOf(200), brnoLocationId);
		Thread.sleep(100);
		createTestItem("Third Item", BigDecimal.valueOf(300), brnoLocationId);

		List<PreviewItemDbo> results = itemDao.findItemsByUpdateTimeAsc(null, null, null, null, null, null, null, null, 0, 10);

		assertThat(results).hasSize(3);
		assertThat(results.get(0).name()).isEqualTo("First Item");
		assertThat(results.get(1).name()).isEqualTo("Second Item");
		assertThat(results.get(2).name()).isEqualTo("Third Item");
	}

	@Test
	public void findItemsByUpdateTimeDesc_noFilters_returnsAllItemsSortedByUpdateTimeDesc()
			throws InterruptedException {
		createTestItem("First Item", BigDecimal.valueOf(100), brnoLocationId);
		Thread.sleep(100);
		createTestItem("Second Item", BigDecimal.valueOf(200), brnoLocationId);
		Thread.sleep(100);
		createTestItem("Third Item", BigDecimal.valueOf(300), brnoLocationId);

		List<PreviewItemDbo> results = itemDao.findItemsByUpdateTimeDesc(null, null, null, null, null, null, null, null, 0, 10);

		assertThat(results).hasSize(3);
		assertThat(results.get(0).name()).isEqualTo("Third Item");
		assertThat(results.get(1).name()).isEqualTo("Second Item");
		assertThat(results.get(2).name()).isEqualTo("First Item");
	}

	@Test
	public void findItemsByPriceAsc_withPriceRange_returnsFilteredItems() {
		createTestItem("Cheap Item", BigDecimal.valueOf(50), brnoLocationId);
		createTestItem("Medium Item", BigDecimal.valueOf(150), brnoLocationId);
		createTestItem("Expensive Item", BigDecimal.valueOf(300), brnoLocationId);

		List<PreviewItemDbo> results = itemDao.findItemsByPriceAsc(null, null, 100.0, 200.0, null, null, null, null, 0, 10);

		assertThat(results).hasSize(1);
		assertThat(results.getFirst().name()).isEqualTo("Medium Item");
		assertThat(results.getFirst().price()).isEqualByComparingTo(BigDecimal.valueOf(150));
	}

	@Test
	public void findItemsByPriceDesc_withMinPriceOnly_returnsFilteredItems() {
		createTestItem("Cheap Item", BigDecimal.valueOf(50), brnoLocationId);
		createTestItem("Medium Item", BigDecimal.valueOf(150), brnoLocationId);
		createTestItem("Expensive Item", BigDecimal.valueOf(300), brnoLocationId);

		List<PreviewItemDbo> results = itemDao.findItemsByPriceDesc(null, null, 100.0, null, null, null, null, null, 0, 10);

		assertThat(results).hasSize(2);
		assertThat(results.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(300));
		assertThat(results.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(150));
	}

	@Test
	public void findItemsByPriceAsc_withCountryFilter_returnsFilteredItems() {
		createTestItem("CZ Item 1", BigDecimal.valueOf(100), brnoLocationId, "CZ");
		createTestItem("CZ Item 2", BigDecimal.valueOf(200), pragueLocationId, "CZ");
		createTestItem("SK Item", BigDecimal.valueOf(150), bratislavaLocationId, "SK");

		List<PreviewItemDbo> results = itemDao.findItemsByPriceAsc(null, null, null, null, "CZ", null, null, null, 0, 10);

		assertThat(results).hasSize(2);
		assertThat(results.get(0).name()).isEqualTo("CZ Item 1");
		assertThat(results.get(1).name()).isEqualTo("CZ Item 2");
	}

	@Test
	public void findItemsByPriceAsc_withTextSearch_returnsFilteredItems() {
		createTestItem("iPhone 14 Pro", "Latest smartphone with great camera", BigDecimal.valueOf(800), brnoLocationId);
		createTestItem("MacBook Pro", "Professional laptop for developers", BigDecimal.valueOf(1500), brnoLocationId);
		createTestItem("Toyota Camry", "Reliable family car", BigDecimal.valueOf(15000), brnoLocationId);

		List<PreviewItemDbo> results = itemDao.findItemsByPriceAsc(null, null, null, null, null, "Pro", null, null, 0, 10);

		assertThat(results).hasSize(2);
		assertThat(results.get(0).name()).isEqualTo("iPhone 14 Pro");
		assertThat(results.get(1).name()).isEqualTo("MacBook Pro");
	}

	@Test
	public void findItemsByPriceAsc_withSpatialFilter_returnsFilteredItems() {
		createTestItem("Brno Item", BigDecimal.valueOf(100), brnoLocationId);
		createTestItem("Prague Item", BigDecimal.valueOf(200), pragueLocationId);

		List<PreviewItemDbo> results = itemDao.findItemsByPriceAsc(BRNO_LOCATION.getLongitude(), BRNO_LOCATION.getLatitude(),
				null, null, null, null, 50000.0, null, 0, 10);

		assertThat(results).hasSize(1);
		assertThat(results.getFirst().name()).isEqualTo("Brno Item");
	}

	@Test
	public void findItemsByPriceAsc_withLargeSpatialFilter_returnsMultipleItems() {
		createTestItem("Brno Item", BigDecimal.valueOf(100), brnoLocationId);
		createTestItem("Prague Item", BigDecimal.valueOf(200), pragueLocationId);

		List<PreviewItemDbo> results = itemDao.findItemsByPriceAsc(BRNO_LOCATION.getLongitude(), BRNO_LOCATION.getLatitude(),
				null, null, null, null, 250000.0, null, 0, 10);

		assertThat(results).hasSize(2);
		assertThat(results.get(0).name()).isEqualTo("Brno Item");
		assertThat(results.get(1).name()).isEqualTo("Prague Item");
	}

	@Test
	public void findItemsByPriceAsc_withOffset_returnsCorrectItems() {
		for (int i = 1; i <= 10; i++) {
			createTestItem("Item " + String.format("%02d", i), BigDecimal.valueOf(i * 100), brnoLocationId);
		}

		List<PreviewItemDbo> firstPage = itemDao.findItemsByPriceAsc(null, null, null, null, null, null, null, null, 0, 3);
		assertThat(firstPage).hasSize(3);
		assertThat(firstPage.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(100));
		assertThat(firstPage.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(200));
		assertThat(firstPage.get(2).price()).isEqualByComparingTo(BigDecimal.valueOf(300));

		List<PreviewItemDbo> secondPage = itemDao.findItemsByPriceAsc(null, null, null, null, null, null, null, null, 3, 3);
		assertThat(secondPage).hasSize(3);
		assertThat(secondPage.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(400));
		assertThat(secondPage.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(500));
		assertThat(secondPage.get(2).price()).isEqualByComparingTo(BigDecimal.valueOf(600));

		List<PreviewItemDbo> thirdPage = itemDao.findItemsByPriceAsc(null, null, null, null, null, null, null, null, 6, 3);
		assertThat(thirdPage).hasSize(3);
		assertThat(thirdPage.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(700));
		assertThat(thirdPage.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(800));
		assertThat(thirdPage.get(2).price()).isEqualByComparingTo(BigDecimal.valueOf(900));
	}

	@Test
	public void findItemsByPriceDesc_withOffset_returnsCorrectItems() {
		for (int i = 1; i <= 10; i++) {
			createTestItem("Item " + String.format("%02d", i), BigDecimal.valueOf(i * 100), brnoLocationId);
		}

		List<PreviewItemDbo> firstPage = itemDao.findItemsByPriceDesc(null, null, null, null, null, null, null, null, 0, 4);
		assertThat(firstPage).hasSize(4);
		assertThat(firstPage.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(1000));
		assertThat(firstPage.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(900));
		assertThat(firstPage.get(2).price()).isEqualByComparingTo(BigDecimal.valueOf(800));
		assertThat(firstPage.get(3).price()).isEqualByComparingTo(BigDecimal.valueOf(700));

		List<PreviewItemDbo> secondPage = itemDao.findItemsByPriceDesc(null, null, null, null, null, null, null, null, 4, 4);
		assertThat(secondPage).hasSize(4);
		assertThat(secondPage.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(600));
		assertThat(secondPage.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(500));
		assertThat(secondPage.get(2).price()).isEqualByComparingTo(BigDecimal.valueOf(400));
		assertThat(secondPage.get(3).price()).isEqualByComparingTo(BigDecimal.valueOf(300));
	}

	@Test
	public void findItemsByUpdateTimeAsc_withOffset_returnsCorrectItems() throws InterruptedException {
		for (int i = 1; i <= 8; i++) {
			createTestItem("Item " + String.format("%02d", i), BigDecimal.valueOf(i * 100), brnoLocationId);
			Thread.sleep(50); // Ensure different timestamps
		}

		List<PreviewItemDbo> firstPage = itemDao.findItemsByUpdateTimeAsc(null, null, null, null, null, null, null, null, 0, 3);
		assertThat(firstPage).hasSize(3);
		assertThat(firstPage.get(0).name()).isEqualTo("Item 01");
		assertThat(firstPage.get(1).name()).isEqualTo("Item 02");
		assertThat(firstPage.get(2).name()).isEqualTo("Item 03");

		List<PreviewItemDbo> secondPage = itemDao.findItemsByUpdateTimeAsc(null, null, null, null, null, null, null, null, 3, 3);
		assertThat(secondPage).hasSize(3);
		assertThat(secondPage.get(0).name()).isEqualTo("Item 04");
		assertThat(secondPage.get(1).name()).isEqualTo("Item 05");
		assertThat(secondPage.get(2).name()).isEqualTo("Item 06");
	}

	@Test
	public void findItemsByUpdateTimeDesc_withOffset_returnsCorrectItems() throws InterruptedException {
		for (int i = 1; i <= 8; i++) {
			createTestItem("Item " + String.format("%02d", i), BigDecimal.valueOf(i * 100), brnoLocationId);
			Thread.sleep(50);
		}

		List<PreviewItemDbo> firstPage = itemDao.findItemsByUpdateTimeDesc(null, null, null, null, null, null, null, null, 0, 3);
		assertThat(firstPage).hasSize(3);
		assertThat(firstPage.get(0).name()).isEqualTo("Item 08");
		assertThat(firstPage.get(1).name()).isEqualTo("Item 07");
		assertThat(firstPage.get(2).name()).isEqualTo("Item 06");

		List<PreviewItemDbo> secondPage = itemDao.findItemsByUpdateTimeDesc(null, null, null, null, null, null, null, null, 3, 3);
		assertThat(secondPage).hasSize(3);
		assertThat(secondPage.get(0).name()).isEqualTo("Item 05");
		assertThat(secondPage.get(1).name()).isEqualTo("Item 04");
		assertThat(secondPage.get(2).name()).isEqualTo("Item 03");
	}

	@Test
	public void findItemsByPriceAsc_withPageSizeLimit_returnsLimitedResults() {
		for (int i = 1; i <= 5; i++) {
			createTestItem("Item " + i, BigDecimal.valueOf(i * 100), brnoLocationId);
		}

		List<PreviewItemDbo> results = itemDao.findItemsByPriceAsc(null, null, null, null, null, null, null, null, 0, 3);

		assertThat(results).hasSize(3);
		assertThat(results.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(100));
		assertThat(results.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(200));
		assertThat(results.get(2).price()).isEqualByComparingTo(BigDecimal.valueOf(300));
	}

	@Test
	public void findItemsByPriceAsc_withOffsetBeyondData_returnsPartialResults() {
		for (int i = 1; i <= 5; i++) {
			createTestItem("Item " + i, BigDecimal.valueOf(i * 100), brnoLocationId);
		}

		// Request offset 3 with pageSize 5, should only return 2 items
		List<PreviewItemDbo> results = itemDao.findItemsByPriceAsc(null, null, null, null, null, null, null, null, 3, 5);

		assertThat(results).hasSize(2);
		assertThat(results.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(400));
		assertThat(results.get(1).price()).isEqualByComparingTo(BigDecimal.valueOf(500));
	}

	@Test
	public void findItemsByPriceAsc_withOffsetEqualToDataSize_returnsEmptyResults() {
		for (int i = 1; i <= 3; i++) {
			createTestItem("Item " + i, BigDecimal.valueOf(i * 100), brnoLocationId);
		}

		// Request offset 3 when we only have 3 items (indices 0, 1, 2)
		List<PreviewItemDbo> results = itemDao.findItemsByPriceAsc(null, null, null, null, null, null, null, null, 3, 5);

		assertThat(results).isEmpty();
	}

	@Test
	public void findItemsByPriceAsc_withEmptyResults_returnsEmptyList() {
		createTestItem("Test Item", BigDecimal.valueOf(100), brnoLocationId);

		List<PreviewItemDbo> results = itemDao.findItemsByPriceAsc(null, null, 1000.0, 2000.0, null, null, null, null, 0, 10);

		assertThat(results).isEmpty();
	}

	@Test
	public void findItemsByUpdateTimeAsc_withSpatialAndTextFilters_returnsCorrectResults() {
		createTestItem("iPhone in Brno", "Great phone available in Brno", BigDecimal.valueOf(500), brnoLocationId);
		createTestItem("iPhone in Prague", "Excellent phone in Prague", BigDecimal.valueOf(550), pragueLocationId);
		createTestItem("MacBook in Brno", "Professional laptop in Brno", BigDecimal.valueOf(1000), brnoLocationId);

		List<PreviewItemDbo> results = itemDao.findItemsByUpdateTimeAsc(BRNO_LOCATION.getLongitude(),
				BRNO_LOCATION.getLatitude(), null, null, null, "iPhone", 50000.0, null, 0, 10);

		assertThat(results).hasSize(1);
		assertThat(results.getFirst().name()).isEqualTo("iPhone in Brno");
	}

	@Test
	public void findItemsByPriceAsc_withPagination_returnsCorrectPagesWithoutDuplicates() {
		for (int i = 1; i <= 10; i++) {
			createTestItem("Item " + String.format("%02d", i), BigDecimal.valueOf(i * 100), brnoLocationId);
		}

		List<PreviewItemDbo> firstPage = itemDao.findItemsByPriceAsc(null, null, null, null, null, null, null, null, 0, 4);
		assertThat(firstPage).hasSize(4);
		assertThat(firstPage.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(100));
		assertThat(firstPage.get(3).price()).isEqualByComparingTo(BigDecimal.valueOf(400));

		List<PreviewItemDbo> secondPage = itemDao.findItemsByPriceAsc(null, null, null, null, null, null, null, null, 4, 4);

		assertThat(secondPage).hasSize(4);
		assertThat(secondPage.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(500));
		assertThat(secondPage.get(3).price()).isEqualByComparingTo(BigDecimal.valueOf(800));

		List<String> firstPageNames = firstPage.stream().map(PreviewItemDbo::name).toList();
		List<String> secondPageNames = secondPage.stream().map(PreviewItemDbo::name).toList();
		assertThat(firstPageNames).doesNotContainAnyElementsOf(secondPageNames);
	}

	@Test
	public void findItemsByPriceDesc_withPagination_returnsCorrectPagesWithoutDuplicates() {
		for (int i = 1; i <= 10; i++) {
			createTestItem("Item " + String.format("%02d", i), BigDecimal.valueOf(i * 100), brnoLocationId);
		}

		List<PreviewItemDbo> firstPage = itemDao.findItemsByPriceDesc(null, null, null, null, null, null, null, null, 0, 4);
		assertThat(firstPage).hasSize(4);
		assertThat(firstPage.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(1000));
		assertThat(firstPage.get(3).price()).isEqualByComparingTo(BigDecimal.valueOf(700));

		List<PreviewItemDbo> secondPage = itemDao.findItemsByPriceDesc(null, null, null, null, null, null, null, null, 4, 4);

		assertThat(secondPage).hasSize(4);
		assertThat(secondPage.get(0).price()).isEqualByComparingTo(BigDecimal.valueOf(600));
		assertThat(secondPage.get(3).price()).isEqualByComparingTo(BigDecimal.valueOf(300));

		List<String> firstPageNames = firstPage.stream().map(PreviewItemDbo::name).toList();
		List<String> secondPageNames = secondPage.stream().map(PreviewItemDbo::name).toList();
		assertThat(firstPageNames).doesNotContainAnyElementsOf(secondPageNames);
	}

	@Test
	public void findItemsByUpdateTimeAsc_withPagination_returnsCorrectPagesWithoutDuplicates()
			throws InterruptedException {
		for (int i = 1; i <= 8; i++) {
			createTestItem("Item " + String.format("%02d", i), BigDecimal.valueOf(i * 100), brnoLocationId);
			Thread.sleep(50);
		}

		List<PreviewItemDbo> firstPage = itemDao.findItemsByUpdateTimeAsc(null, null, null, null, null, null, null, null, 0, 3);
		assertThat(firstPage).hasSize(3);
		assertThat(firstPage.get(0).name()).isEqualTo("Item 01");
		assertThat(firstPage.get(2).name()).isEqualTo("Item 03");

		List<PreviewItemDbo> secondPage = itemDao.findItemsByUpdateTimeAsc(null, null, null, null, null, null, null, null, 3, 3);

		assertThat(secondPage).hasSize(3);
		assertThat(secondPage.get(0).name()).isEqualTo("Item 04");
		assertThat(secondPage.get(2).name()).isEqualTo("Item 06");

		List<String> firstPageNames = firstPage.stream().map(PreviewItemDbo::name).toList();
		List<String> secondPageNames = secondPage.stream().map(PreviewItemDbo::name).toList();
		assertThat(firstPageNames).doesNotContainAnyElementsOf(secondPageNames);
	}

	@Test
	public void findItemsByUpdateTimeDesc_withPagination_returnsCorrectPagesWithoutDuplicates()
			throws InterruptedException {
		for (int i = 1; i <= 8; i++) {
			createTestItem("Item " + String.format("%02d", i), BigDecimal.valueOf(i * 100), brnoLocationId);
			Thread.sleep(50);
		}

		List<PreviewItemDbo> firstPage = itemDao.findItemsByUpdateTimeDesc(null, null, null, null, null, null, null, null, 0, 3);
		assertThat(firstPage).hasSize(3);
		assertThat(firstPage.get(0).name()).isEqualTo("Item 08");
		assertThat(firstPage.get(2).name()).isEqualTo("Item 06");

		List<PreviewItemDbo> secondPage = itemDao.findItemsByUpdateTimeDesc(null, null, null, null, null, null, null, null, 3, 3);

		assertThat(secondPage).hasSize(3);
		assertThat(secondPage.get(0).name()).isEqualTo("Item 05");
		assertThat(secondPage.get(2).name()).isEqualTo("Item 03");

		List<String> firstPageNames = firstPage.stream().map(PreviewItemDbo::name).toList();
		List<String> secondPageNames = secondPage.stream().map(PreviewItemDbo::name).toList();
		assertThat(firstPageNames).doesNotContainAnyElementsOf(secondPageNames);
	}

	private void createTestItem(String name, BigDecimal price, Long locationId) {
		createTestItem(name, "Test description for " + name, price, locationId, "CZ");
	}

	private void createTestItem(String name, BigDecimal price, Long locationId, String country) {
		createTestItem(name, "Test description for " + name, price, locationId, country);
	}

	private void createTestItem(String name, String description, BigDecimal price, Long locationId) {
		createTestItem(name, description, price, locationId, "CZ");
	}

	private void createTestItem(String name, String description, BigDecimal price, Long locationId, String country) {
		CreateItemDto item = new CreateItemDto(name, description, Currency.CZK, price, locationId, IMAGE_URL,
				USER_EMAIL, PHONE, null, null, "new");

		double latitude, longitude;
		if (locationId.equals(brnoLocationId)) {
			latitude = BRNO_LOCATION.getLatitude();
			longitude = BRNO_LOCATION.getLongitude();
		} else if (locationId.equals(pragueLocationId)) {
			latitude = PRAGUE_LOCATION.getLatitude();
			longitude = PRAGUE_LOCATION.getLongitude();
		} else {
			latitude = BRATISLAVA_LOCATION.getLatitude();
			longitude = BRATISLAVA_LOCATION.getLongitude();
		}

		Long itemId = itemDao.insertItem(item, userId, latitude, longitude, country);
		createdItemIds.add(itemId);
	}
}