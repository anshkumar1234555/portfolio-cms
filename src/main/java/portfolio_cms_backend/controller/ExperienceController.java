package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.Experience;
import portfolio_cms_backend.service.ExperienceService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(
            ExperienceService experienceService) {

        this.experienceService = experienceService;
    }

    // ==========================================
    // CREATE EXPERIENCE
    // ==========================================

    @PostMapping
    public ResponseEntity<Experience> createExperience(
            @RequestBody Experience experience) {

        return ResponseEntity.ok(
                experienceService.createExperience(experience)
        );
    }

    // ==========================================
    // GET ALL EXPERIENCES
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Experience>> getAllExperiences() {

        return ResponseEntity.ok(
                experienceService.getAllExperiences()
        );
    }

    // ==========================================
    // GET EXPERIENCE BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<Experience> getExperienceById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                experienceService.getExperienceById(id)
        );
    }

    // ==========================================
    // UPDATE EXPERIENCE
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<Experience> updateExperience(
            @PathVariable Long id,
            @RequestBody Experience experience) {

        return ResponseEntity.ok(
                experienceService.updateExperience(
                        id,
                        experience
                )
        );
    }

    // ==========================================
    // DELETE EXPERIENCE
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(
            @PathVariable Long id) {

        experienceService.deleteExperience(id);

        return ResponseEntity.noContent().build();
    }
}