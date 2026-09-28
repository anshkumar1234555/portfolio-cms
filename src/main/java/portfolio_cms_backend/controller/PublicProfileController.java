package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.Profile;
import portfolio_cms_backend.service.ProfileService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/profile")
public class PublicProfileController {

    private final ProfileService profileService;

    public PublicProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<List<Profile>> getProfiles() {

        return ResponseEntity.ok(
                profileService.getAllProfiles()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfile(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                profileService.getProfileById(id)
        );
    }
}