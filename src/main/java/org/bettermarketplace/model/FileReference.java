package org.bettermarketplace.model;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class FileReference {

	private Instant createdAt;
	private Instant updatedAt;
	private String type;
	private String name;
}
