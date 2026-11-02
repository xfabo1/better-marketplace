package org.bettermarketplace.db.dao;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.model.Currency;
import org.bettermarketplace.model.Sorting;
import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindMethods;
import org.jdbi.v3.sqlobject.customizer.Define;
import org.jdbi.v3.sqlobject.customizer.DefineNamedBindings;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.jdbi.v3.stringtemplate4.UseStringTemplateSqlLocator;

@UseStringTemplateSqlLocator
@RegisterConstructorMapper(ItemDbo.class)
public interface ItemDao {

	@SqlQuery
	Optional<ItemDbo> findItem(@Bind("id") Long id);

	@SqlUpdate
	@GetGeneratedKeys
	Long insertItem(@BindMethods("itemObject") CreateItemDto createItemDto, @Bind("userId") Long userId,
			@Bind("latitude") double latitude, @Bind("longitude") double longitude);

	@SqlUpdate
	@DefineNamedBindings
	void updateItem(
			@Bind("name") String name,
			@Bind("description") String description,
			@Bind("currency") Currency currency,
			@Bind("price") BigDecimal price,
			@Bind("locationId") Long locationId,
			@Bind("imageUrl") String imageUrl,
			@Bind("email") String email,
			@Bind("phoneNumber") String phoneNumber,
			@Bind("longitude") Double longitude,
			@Bind("latitude") Double latitude,
			@Bind("id") Long id);

	@SqlUpdate
	void deleteItem(@Bind("id") Long id);

	/**
	 * Sorts either by price or by updated time. For the next page, pass the price (price sortings) or the updatedAt
	 * (time sortings) of the last item of the previous page; results continue from there in the sort direction.
	 */
	default List<ItemDbo> searchItems(ItemSearchQuery query) {
		var sorting = query.sorting() == null ? Sorting.NEWEST : query.sorting();

		return switch (sorting) {
			case PRICE_ASC -> searchItems(query, query.lastPrice(), null, "price ASC", ">=");
			case PRICE_DESC -> searchItems(query, query.lastPrice(), null, "price DESC", "<=");
			case OLDEST -> searchItems(query, null, query.lastUpdated(), "updated_at ASC", ">=");
			case NEWEST -> searchItems(query, null, query.lastUpdated(), "updated_at DESC", "<=");
		};
	}

	private List<ItemDbo> searchItems(ItemSearchQuery query, BigDecimal lastPrice, Instant lastUpdated,
			String orderBy, String cursorOperator) {
		return searchItems(query.longitude(), query.latitude(), query.minPrice(), query.maxPrice(),
				query.textSearch(), query.maxMeterDistance(), lastPrice, lastUpdated, query.condition(),
				query.category(), query.subcategory(), query.pageSize(), orderBy, cursorOperator);
	}

	/** Use {@link #searchItems(ItemSearchQuery)}; this overload only exists to bind the template parameters. */
	@SqlQuery
	@DefineNamedBindings
	List<ItemDbo> searchItems(
			@Bind("longitude") Double longitude,
			@Bind("latitude") Double latitude,
			@Bind("minPrice") Double minPrice,
			@Bind("maxPrice") Double maxPrice,
			@Bind("textSearch") String textSearch,
			@Bind("maxMeterDistance") Double maxMeterDistance,
			@Bind("lastPrice") BigDecimal lastPrice,
			@Bind("lastUpdated") Instant lastUpdated,
			@Bind("condition") String condition,
			@Bind("category") String category,
			@Bind("subcategory") String subcategory,
			@Bind("pageSize") int pageSize,
			@Define("orderBy") String orderBy,
			@Define("cursorOperator") String cursorOperator);
}
