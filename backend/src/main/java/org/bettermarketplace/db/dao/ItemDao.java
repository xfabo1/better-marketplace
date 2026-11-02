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
			@Bind("latitude") double latitude, @Bind("longitude") double longitude, @Bind("country") String country);

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
			@Bind("country") String country,
			@Bind("longitude") Double longitude,
			@Bind("latitude") Double latitude,
			@Bind("id") Long id);

	@SqlUpdate
	void deleteItem(@Bind("id") Long id);

	default List<ItemDbo> searchItems(ItemSearchQuery query) {
		var sorting = query.sorting() == null ? Sorting.NEWEST : query.sorting();
		// The cursor continues after the last item of the previous page, so it compares in the sort direction and
		// only the cursor that matches the sorted column is used.
		var sortsByPrice = sorting == Sorting.PRICE_ASC || sorting == Sorting.PRICE_DESC;
		var ascending = sorting == Sorting.OLDEST || sorting == Sorting.PRICE_ASC;
		var orderBy = (sortsByPrice ? "price" : "updated_at") + (ascending ? " ASC" : " DESC");

		return searchItems(query.longitude(), query.latitude(), query.minPrice(), query.maxPrice(), query.country(),
				query.textSearch(), query.maxMeterDistance(), sortsByPrice ? query.lastPrice() : null,
				sortsByPrice ? null : query.lastUpdated(), query.condition(), query.pageSize(), orderBy,
				ascending ? ">=" : "<=");
	}

	/** Use {@link #searchItems(ItemSearchQuery)}; this overload only exists to bind the template parameters. */
	@SqlQuery
	@DefineNamedBindings
	List<ItemDbo> searchItems(
			@Bind("longitude") Double longitude,
			@Bind("latitude") Double latitude,
			@Bind("minPrice") Double minPrice,
			@Bind("maxPrice") Double maxPrice,
			@Bind("country") String country,
			@Bind("textSearch") String textSearch,
			@Bind("maxMeterDistance") Double maxMeterDistance,
			@Bind("lastPrice") BigDecimal lastPrice,
			@Bind("lastUpdated") Instant lastUpdated,
			@Bind("condition") String condition,
			@Bind("pageSize") int pageSize,
			@Define("orderBy") String orderBy,
			@Define("cursorOperator") String cursorOperator);
}
