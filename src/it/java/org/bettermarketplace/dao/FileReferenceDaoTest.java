package org.bettermarketplace.dao;

import org.bettermarketplace.configuration.PostgisTest;
import org.bettermarketplace.db.dao.FileReferenceDao;
import org.bettermarketplace.model.FileReference;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class FileReferenceDaoTest extends PostgisTest {

    @Autowired
    private FileReferenceDao fileReferenceDao;

    @Test
    public void insertEntity_validEntity_entityPresentInDatabase() {
        FileReference fileReference = new FileReference();
        fileReference.setName("test");
        fileReference.setType("jpeg");
        var id = fileReferenceDao.insertFile(fileReference);
    }
}
