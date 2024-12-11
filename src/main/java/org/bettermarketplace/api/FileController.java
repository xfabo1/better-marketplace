package org.bettermarketplace.api;

import org.bettermarketplace.api.dto.OpenedFileDto;
import org.bettermarketplace.api.dto.RenameFileDto;
import org.bettermarketplace.db.entity.FileReferenceDbo;
import org.bettermarketplace.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController("/v1/files")
public class FileController {

    private final FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<OpenedFileDto> openedFileDto(@PathVariable("id") Long id) {
        OpenedFileDto openedFileDto = fileService.openFile(id);
        if (openedFileDto == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(openedFileDto);
        }
    }

    @PatchMapping("/{id}/rename")
    public ResponseEntity<Void> rename(@PathVariable("id") Long id, @RequestBody RenameFileDto renameFileDto) {
        FileReferenceDbo file = fileService.rename(id, renameFileDto);
        if (file == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().build();
        }
    }

    @PostMapping
    public ResponseEntity<List<OpenedFileDto>> create(@RequestParam("files") List<MultipartFile> files) {
        return ResponseEntity.ok(fileService.createFiles(files));
    }
}
