package org.bettermarketplace.files.dao;

import org.bettermarketplace.db.PostgisTest;
import org.bettermarketplace.db.dao.FileReferenceDao;
import org.bettermarketplace.db.entity.FileReference;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class FileReferenceDaoTest extends PostgisTest {

    @Autowired
    private FileReferenceDao fileReferenceDao;

    @Test
    public void insertEntity_validEntity_entityPresentInDatabase() {
        FileReference fileReference = new FileReference();
        fileReference.setName("test");
        fileReference.setType("jpeg");
        fileReferenceDao.insertFile(fileReference);
    }
}
