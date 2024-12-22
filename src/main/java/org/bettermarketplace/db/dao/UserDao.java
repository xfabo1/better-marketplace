package org.bettermarketplace.db.dao;

import java.util.List;
import java.util.Optional;

import org.bettermarketplace.db.entity.UserDbo;
import org.bettermarketplace.model.User;
import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindMethods;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.jdbi.v3.stringtemplate4.UseStringTemplateSqlLocator;

@UseStringTemplateSqlLocator
@RegisterConstructorMapper(UserDbo.class)
public interface UserDao {

	@SqlQuery
	List<UserDbo> getUsers();

	@SqlUpdate
	@GetGeneratedKeys
	@RegisterConstructorMapper(User.class)
	void insertUser(@BindMethods("user") User user);

	@SqlQuery
	Optional<UserDbo> getUser(@Bind("id") Long id);
}
