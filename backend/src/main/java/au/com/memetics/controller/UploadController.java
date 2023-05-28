package au.com.memetics.controller;

import au.com.memetics.service.ProfileService;
import au.com.memetics.service.UploadException;
import au.com.memetics.service.UploadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.HttpStatus.OK;

@RestController
@Slf4j
@Tag(name = "upload", description = "Upload files")
public class UploadController {
    private final UploadService service;
    private final ProfileService profileService;

    @Autowired
    public UploadController(final UploadService uploadService, ProfileService profileService) {
        this.service = uploadService;
        this.profileService = profileService;
    }

    @PostMapping(path = "/upload")
    @ResponseStatus(OK)
    @Operation(summary = "Upload file")
    public void upload(final @RequestParam("file") MultipartFile file, final @RequestParam("flowFilename") String filename, final @RequestParam("flowIdentifier") String tag) throws UploadException {
        service.upload(file, filename, tag, profileService.getProfileFromContext());
    }
}
