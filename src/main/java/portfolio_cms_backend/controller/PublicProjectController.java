package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.Project;
import portfolio_cms_backend.service.ProjectService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/projects")
public class PublicProjectController {

    private final ProjectService projectService;

    public PublicProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {

        return ResponseEntity.ok(
                projectService.getAllProjects()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                projectService.getProjectById(id)
        );
    }
}