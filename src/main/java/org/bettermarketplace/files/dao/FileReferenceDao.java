package org.bettermarketplace.files.dao;

import org.bettermarketplace.files.entity.FileReference;
import org.jdbi.v3.sqlobject.CreateSqlObject;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.jdbi.v3.stringtemplate4.UseStringTemplateSqlLocator;
import org.springframework.stereotype.Component;

import java.util.Optional;

@UseStringTemplateSqlLocator
@RegisterBeanMapper(FileReference.class)
@Component
public interface FileReferenceDao {

    @CreateSqlObject
    FileReference insertFile(@BindBean("file_reference") FileReference file);

    @SqlQuery
    Optional<FileReference> selectFile(@Bind("id") Long id);

    @SqlUpdate
    void update(@BindBean("file_reference") FileReference fileReference);
}
