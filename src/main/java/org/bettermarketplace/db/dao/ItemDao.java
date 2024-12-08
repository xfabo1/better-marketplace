package org.bettermarketplace.db.dao;

import java.util.Optional;

import org.bettermarketplace.db.entity.Item;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.jdbi.v3.stringtemplate4.UseStringTemplateSqlLocator;

@UseStringTemplateSqlLocator
@RegisterBeanMapper(Item.class)
public interface ItemDao {

	@SqlQuery
	Optional<Item> findItemById(@Bind("id") String id);

	@SqlUpdate
	void updateItem(@Bind("id") String id, @BindBean("updatedItem") Item updatedItem);

	@SqlUpdate
	void insertItem(@BindBean("item") Item item);
}
