package org.bettermarketplace.api.response;

public record ResponseStatusMessage(int statusCode, String statusMessage) {

	public static final ResponseStatusMessage SUCCESS = new ResponseStatusMessage(200, "success");
	public static final ResponseStatusMessage UNAUTHORIZED = new ResponseStatusMessage(401, "unauthorized");
	public static final ResponseStatusMessage NOT_FOUND = new ResponseStatusMessage(404, "not found");
	public static final ResponseStatusMessage INTERNAL_SERVER_ERROR = new ResponseStatusMessage(500, "internal server error");
	public static final ResponseStatusMessage CREATED = new ResponseStatusMessage(201, "created");
}
