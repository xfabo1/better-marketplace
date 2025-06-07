package org.bettermarketplace.model;

import java.math.BigDecimal;
import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Item {

	private Long id;
	private String name;
	private String description;
	private String imageUrl;
	private BigDecimal price;
	private Currency currency;
	private String email;
	private String phoneNumber;
	private Long locationId;
	private Long creatorId;
	private Instant createdAt;
	private Instant updatedAt;
}
