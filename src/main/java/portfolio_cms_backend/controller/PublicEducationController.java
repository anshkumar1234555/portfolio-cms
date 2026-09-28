package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.Education;
import portfolio_cms_backend.service.EducationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/education")
public class PublicEducationController {

    private final EducationService educationService;

    public PublicEducationController(
            EducationService educationService) {

        this.educationService = educationService;
    }

    @GetMapping
    public ResponseEntity<List<Education>> getAllEducation() {

        return ResponseEntity.ok(
                educationService.getAllEducation()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Education> getEducationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                educationService.getEducationById(id)
        );
    }
}