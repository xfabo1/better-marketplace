package org.bettermarketplace.db.entity;

import java.time.Instant;

import org.jdbi.v3.core.mapper.reflect.ColumnName;
import org.bettermarketplace.model.Country;

import lombok.Builder;

@Builder
public record UserDbo(Long id,
					  @ColumnName("display_items_from_other_country")
					  boolean displayItemsFromOtherCountry,
					  Country country,
					  String password,
					  @ColumnName("created_at")
					  Instant createdAt,
					  @ColumnName("updated_at")
					  Instant updatedAt,
					  String username,
					  String email) {
}
