package org.bettermarketplace.db.entity;

import java.time.Instant;

import lombok.Builder;

@Builder
public record UserDbo(Long id,
					  String username,
					  Instant createdAt,
					  Instant updatedAt,
					  String email) {
}
