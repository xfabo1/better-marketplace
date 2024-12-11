package org.bettermarketplace.db.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UrbanDistrict {

	private String id;
	private Long city_id;
	private String name;
	private float latitude;
	private float longitude;
}

