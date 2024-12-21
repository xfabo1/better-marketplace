package org.bettermarketplace.db.entity;

import lombok.Builder;

@Builder
public record UserDbo(Long id,
					  String name,
					  String surname,
					  String email) {
}
