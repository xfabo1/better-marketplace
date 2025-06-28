package org.bettermarketplace.db.dao;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.bettermarketplace.api.dto.item.CreateItemDto;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.db.entity.PreviewItemDbo;
import org.bettermarketplace.model.Currency;
import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindMethods;
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
			@Bind("title") String title,
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
			@Bind("id") Long id,
			@Bind("condition") String condition);

	@SqlUpdate
	void deleteItem(@Bind("id") Long id);

	@SqlQuery
	@DefineNamedBindings
	@RegisterConstructorMapper(PreviewItemDbo.class)
	List<PreviewItemDbo> findItemsByPriceAsc(
			@Bind("longitude") Double longitude,
			@Bind("latitude") Double latitude,
			@Bind("minPrice") Double minPrice,
			@Bind("maxPrice") Double maxPrice,
			@Bind("country") String country,
			@Bind("textSearch") String textSearch,
			@Bind("maxMeterDistance") Double maxMeterDistance,
			@Bind("condition") String condition,
			@Bind("offset") int offset,
			@Bind("pageSize") int pageSize
	);

	@SqlQuery
	@DefineNamedBindings
	@RegisterConstructorMapper(PreviewItemDbo.class)
	List<PreviewItemDbo> findItemsByPriceDesc(
			@Bind("longitude") Double longitude,
			@Bind("latitude") Double latitude,
			@Bind("minPrice") Double minPrice,
			@Bind("maxPrice") Double maxPrice,
			@Bind("country") String country,
			@Bind("textSearch") String textSearch,
			@Bind("maxMeterDistance") Double maxMeterDistance,
			@Bind("condition") String condition,
			@Bind("offset") int offset,
			@Bind("pageSize") int pageSize
	);

	@SqlQuery
	@DefineNamedBindings
	@RegisterConstructorMapper(PreviewItemDbo.class)
	List<PreviewItemDbo> findItemsByUpdateTimeDesc(
			@Bind("longitude") Double longitude,
			@Bind("latitude") Double latitude,
			@Bind("minPrice") Double minPrice,
			@Bind("maxPrice") Double maxPrice,
			@Bind("country") String country,
			@Bind("textSearch") String textSearch,
			@Bind("maxMeterDistance") Double maxMeterDistance,
			@Bind("condition") String condition,
			@Bind("offset") int offset,
			@Bind("pageSize") int pageSize
	);

	@SqlQuery
	@DefineNamedBindings
	@RegisterConstructorMapper(PreviewItemDbo.class)
	List<PreviewItemDbo> findItemsByUpdateTimeAsc(
			@Bind("longitude") Double longitude,
			@Bind("latitude") Double latitude,
			@Bind("minPrice") Double minPrice,
			@Bind("maxPrice") Double maxPrice,
			@Bind("country") String country,
			@Bind("textSearch") String textSearch,
			@Bind("maxMeterDistance") Double maxMeterDistance,
			@Bind("condition") String condition,
			@Bind("offset") int offset,
			@Bind("pageSize") int pageSize
	);

	@SqlQuery
	@DefineNamedBindings
	int getCountOfAllItems(
			@Bind("longitude") Double longitude,
			@Bind("latitude") Double latitude,
			@Bind("minPrice") Double minPrice,
			@Bind("maxPrice") Double maxPrice,
			@Bind("country") String country,
			@Bind("textSearch") String textSearch,
			@Bind("maxMeterDistance") Double maxMeterDistance,
			@Bind("condition") String condition
	);
}

