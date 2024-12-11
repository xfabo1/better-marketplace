package org.bettermarketplace.db.entity;

import org.jdbi.v3.core.mapper.reflect.ColumnName;

public record UrbanDistrictDbo(String id,
							   @ColumnName("city_id") Long cityId,
							   String name,
							   float latitude,
							   float longitude) {
}

