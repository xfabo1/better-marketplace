package org.bettermarketplace.db.dao;

import java.util.List;
import java.util.Optional;

import org.bettermarketplace.api.dto.user.RegisterUserDto;
import org.bettermarketplace.db.entity.UserDbo;
import org.jdbi.v3.sqlobject.config.RegisterConstructorMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindMethods;
import org.jdbi.v3.sqlobject.customizer.DefineNamedBindings;
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
	Long insertUser(@BindMethods("registerUserObject") RegisterUserDto registerUserDto,
			@Bind("password") String password);

	@SqlQuery
	Optional<UserDbo> getUser(@Bind("id") Long id);

	@SqlQuery
	Optional<UserDbo> getUserByEmail(@Bind("email") String email);

	@SqlQuery
	Optional<UserDbo> getUserByUsername(@Bind("username") String userName);

	@SqlUpdate
	void deleteUser(@Bind("id") Long id);

	@SqlUpdate
	@DefineNamedBindings
	int updateUser(
			@Bind("password") String password,
			@Bind("displayItemsFromOtherCountry") Boolean displayItemsFromOtherCountry,
			@Bind("country") String country,
			@Bind("id") Long id
	);
}
