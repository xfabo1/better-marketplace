package org.bettermarketplace.files.repository;

import org.bettermarketplace.files.dao.FileReferenceDao;
import org.bettermarketplace.files.entity.FileReference;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class FileRepository {

    private final FileReferenceDao fileReferenceDao;

    public FileRepository(FileReferenceDao fileReferenceDao) {
        this.fileReferenceDao = fileReferenceDao;
    }

    public FileReference saveAndReturn(FileReference fileReference) {
        return fileReferenceDao.insertFile(fileReference);
    }

    public void update(FileReference fileReference) {
        fileReferenceDao.update(fileReference);
    }

    public Optional<FileReference> findById(Long id) {
        return fileReferenceDao.selectFile(id);
    }
}
