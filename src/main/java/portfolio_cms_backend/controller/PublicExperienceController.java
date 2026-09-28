package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.Experience;
import portfolio_cms_backend.service.ExperienceService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/experiences")
public class PublicExperienceController {

    private final ExperienceService experienceService;

    public PublicExperienceController(
            ExperienceService experienceService) {

        this.experienceService = experienceService;
    }

    @GetMapping
    public ResponseEntity<List<Experience>> getAllExperiences() {

        return ResponseEntity.ok(
                experienceService.getAllExperiences()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Experience> getExperienceById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                experienceService.getExperienceById(id)
        );
    }
}