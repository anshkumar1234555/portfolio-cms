package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.Profile;
import portfolio_cms_backend.service.ProfileService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public ResponseEntity<Profile> createProfile(
            @RequestBody Profile profile) {

        return ResponseEntity.ok(
                profileService.createProfile(profile)
        );
    }

    @GetMapping
    public ResponseEntity<List<Profile>> getAllProfiles() {

        return ResponseEntity.ok(
                profileService.getAllProfiles()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfileById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                profileService.getProfileById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profile> updateProfile(
            @PathVariable Long id,
            @RequestBody Profile profile) {

        return ResponseEntity.ok(
                profileService.updateProfile(id, profile)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProfile(
            @PathVariable Long id) {

        profileService.deleteProfile(id);

        return ResponseEntity.ok(
                "Profile deleted successfully"
        );
    }
}