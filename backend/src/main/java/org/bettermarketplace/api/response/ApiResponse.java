package org.bettermarketplace.api.response;

import lombok.Builder;

@Builder
public record ApiResponse<T>(
		T body,
		String message,
		int statusCode) {
}
