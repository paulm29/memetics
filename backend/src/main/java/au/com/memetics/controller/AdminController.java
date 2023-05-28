package au.com.memetics.controller;

import au.com.memetics.entity.BackupResult;
import au.com.memetics.service.BackupService;
import au.com.memetics.service.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.security.RolesAllowed;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "admin", description = "Admin resources")
@Slf4j
@RestController
@RequestMapping("/rest/admins")
public class AdminController {
    private final ProfileService service;
    private final BackupService backupService;
    @Value("${api.version}")
    private String version;

    @Autowired
    public AdminController(final ProfileService profileService, BackupService backupService) {
        this.service = profileService;
        this.backupService = backupService;
    }

    @PostMapping("backup")
    @RolesAllowed("ROLE_ADMIN")
    @Operation(summary = "Trigger backup of images. Admin only.")
    public BackupResult backupImages() {
        return backupService.backupImages();
    }

    @GetMapping("version")
    @Operation(summary = "Gets version of API")
    public String getVersion() {
        return version;
    }
}
