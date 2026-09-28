package portfolio_cms_backend.service;

import portfolio_cms_backend.model.Project;
import portfolio_cms_backend.repository.ProjectRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {

        return projectRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Project not found")
                );
    }

    public Project updateProject(Long id, Project project) {

        Project existingProject =
                projectRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Project not found")
                        );

        existingProject.setTitle(project.getTitle());
        existingProject.setDescription(project.getDescription());
        existingProject.setTechStack(project.getTechStack());
        existingProject.setImageUrl(project.getImageUrl());
        existingProject.setGithubUrl(project.getGithubUrl());
        existingProject.setLiveUrl(project.getLiveUrl());

        return projectRepository.save(existingProject);
    }

    public void deleteProject(Long id) {

        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Project not found");
        }

        projectRepository.deleteById(id);
    }
}