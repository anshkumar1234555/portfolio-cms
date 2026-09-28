package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.Education;
import portfolio_cms_backend.service.EducationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
public class EducationController {

    private final EducationService educationService;

    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Education> createEducation(
            @RequestBody Education education) {

        return ResponseEntity.ok(
                educationService.createEducation(education)
        );
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Education>> getAllEducation() {

        return ResponseEntity.ok(
                educationService.getAllEducation()
        );
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Education> getEducationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                educationService.getEducationById(id)
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Education> updateEducation(
            @PathVariable Long id,
            @RequestBody Education education) {

        return ResponseEntity.ok(
                educationService.updateEducation(
                        id,
                        education
                )
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(
            @PathVariable Long id) {

        educationService.deleteEducation(id);

        return ResponseEntity.noContent().build();
    }
}