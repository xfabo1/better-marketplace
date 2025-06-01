package org.bettermarketplace.model;

import java.math.BigDecimal;

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
	private Location location;
	private User creator;
}
