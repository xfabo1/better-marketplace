package org.bettermarketplace.service;

import java.io.IOError;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.bettermarketplace.api.dto.OpenedFileDto;
import org.bettermarketplace.api.dto.RenameFileDto;
import org.bettermarketplace.db.FileRepository;
import org.bettermarketplace.db.entity.FileReference;
import org.jdbi.v3.sqlobject.transaction.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {

    private final FileRepository fileRepository;

    private final Path directory;

    @Autowired
    public FileService(FileRepository fileRepository, @Value("${file-service.storage-directory}") String directory) {
        this.fileRepository = fileRepository;
        this.directory = Path.of(directory);
    }

    public FileReference rename(Long id, RenameFileDto renameFileDto) {
        Optional<FileReference> file = fileRepository.findById(id);

        if (file.isEmpty()) {
            return null;
        }

        FileReference fileReference = file.get();
        fileReference.setName(renameFileDto.name());
        fileRepository.update(fileReference);
        return fileReference;
    }

    public OpenedFileDto openFile(Long id) {
        Optional<FileReference> file = fileRepository.findById(id);

        if (file.isEmpty()) {
            return null;
        }

        try (InputStream inputStream = Files.newInputStream(createPath(id))) {
            return OpenedFileDto.from(file.get(), inputStream.readAllBytes());
        } catch (IOException e) {
           throw new IOError(e);
        }
    }

    @Transaction
    public List<OpenedFileDto> createFiles(List<MultipartFile> multipartFiles) {
        return multipartFiles.stream().map(this::createReference
        ).collect(Collectors.toList());
    }

    private OpenedFileDto createReference(MultipartFile file) {
        FileReference fileReference = new FileReference();
        fileReference.setName(file.getOriginalFilename());
        fileReference.setType(file.getContentType());

        fileReference = fileRepository.saveAndReturn(fileReference);

        return createFileOnFs(file, fileReference);
    }

    private OpenedFileDto createFileOnFs(MultipartFile file, FileReference fileReference) {
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, createPath(fileReference.getId()), StandardCopyOption.REPLACE_EXISTING);
            return OpenedFileDto.from(fileReference, inputStream.readAllBytes());
        } catch (IOException e) {
            throw new IOError(e);
        }
    }

    private Path createPath(Long id) {
        return Path.of(directory.toString(), id.toString());
    }
}
