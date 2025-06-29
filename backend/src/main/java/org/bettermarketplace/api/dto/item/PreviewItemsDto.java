package org.bettermarketplace.api.dto.item;

import java.util.List;

import lombok.Builder;

@Builder
public record PreviewItemsDto(
		List<PreviewItemDto> previewItemDtos,
		int totalItems) {
}
