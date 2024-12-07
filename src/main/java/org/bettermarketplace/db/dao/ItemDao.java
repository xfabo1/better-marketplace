package org.bettermarketplace.db.dao;

import java.util.Optional;

import org.bettermarketplace.db.entity.Item;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.stringtemplate4.UseStringTemplateSqlLocator;

@UseStringTemplateSqlLocator
public interface ItemDao {

	@SqlQuery
	Optional<Item> findItemById(@Bind("id") String id);
}
