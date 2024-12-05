package org.bettermarketplace.db.dao;

import java.util.Optional;

import org.bettermarketplace.db.entity.Item;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.locator.UseClasspathSqlLocator;
import org.jdbi.v3.sqlobject.statement.SqlQuery;

@UseClasspathSqlLocator
public interface ItemDao {

	@SqlQuery
	Optional<Item> findItemById(@Bind("id") String id);
}
