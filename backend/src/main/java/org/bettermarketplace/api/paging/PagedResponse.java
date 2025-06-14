package org.bettermarketplace.api.paging;

import java.util.List;

import lombok.Builder;

@Builder
public record PagedResponse<T>(List<T> records, int page, int pageSize, int totalItems) {
}
