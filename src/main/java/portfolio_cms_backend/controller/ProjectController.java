package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.Project;
import portfolio_cms_backend.service.ProjectService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // CREATE PROJECT
    @PostMapping
    public ResponseEntity<Project> createProject(
            @RequestBody Project project) {

        return ResponseEntity.ok(
                projectService.createProject(project)
        );
    }

    // GET ALL PROJECTS
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {

        return ResponseEntity.ok(
                projectService.getAllProjects()
        );
    }

    // GET PROJECT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                projectService.getProjectById(id)
        );
    }

    // UPDATE PROJECT
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long id,
            @RequestBody Project project) {

        return ResponseEntity.ok(
                projectService.updateProject(
                        id,
                        project
                )
        );
    }

    // DELETE PROJECT
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long id) {

        projectService.deleteProject(id);

        return ResponseEntity.noContent().build();
    }
}