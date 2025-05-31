package org.bettermarketplace.db.dao;

import java.util.List;
import java.util.Optional;

import org.bettermarketplace.db.entity.ItemDbo;
import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.stringtemplate4.UseStringTemplateSqlLocator;

@UseStringTemplateSqlLocator
@RegisterConstructorMapper(ItemDbo.class)
public interface ItemDao {

	@SqlQuery
	Optional<ItemDbo> findItem(@Bind("id") Long id);

	@SqlQuery
	List<ItemDbo> findItems();
}
