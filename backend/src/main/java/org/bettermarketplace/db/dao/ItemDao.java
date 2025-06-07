package org.bettermarketplace.db.dao;

import java.util.List;
import java.util.Optional;

import org.bettermarketplace.api.dto.item.UpdateItemDto;
import org.bettermarketplace.db.entity.ItemDbo;
import org.bettermarketplace.model.Item;
import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.BindMethods;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.jdbi.v3.stringtemplate4.UseStringTemplateSqlLocator;

@UseStringTemplateSqlLocator
@RegisterConstructorMapper(ItemDbo.class)
public interface ItemDao {

	@SqlQuery
	Optional<ItemDbo> findItem(@Bind("id") Long id);

	@SqlQuery
	List<ItemDbo> findItems();

	@SqlUpdate
	@GetGeneratedKeys
	Long insertItem(@BindBean("item") Item item);


	@SqlUpdate
	Long updateItem(@BindMethods("updateItem") UpdateItemDto updateItemDto, @Bind("id") Long id);
}
