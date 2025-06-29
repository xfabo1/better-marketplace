package org.bettermarketplace.api.dto.location;

import org.bettermarketplace.db.entity.LocationDbo;

import lombok.Builder;

@Builder
public record LocationDto(
		Long id,
		String name) {

	public static LocationDto from(LocationDbo locationDbo) {
		return LocationDto.builder()
				.id(locationDbo.id())
				.name(locationDbo.toString())
				.build();
	}
	@Override
	public String toString() {
		return name;
	}
}
