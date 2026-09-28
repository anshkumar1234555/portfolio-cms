package portfolio_cms_backend.service;

import portfolio_cms_backend.model.Experience;
import portfolio_cms_backend.repository.ExperienceRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceService(
            ExperienceRepository experienceRepository) {

        this.experienceRepository = experienceRepository;
    }

    public Experience createExperience(
            Experience experience) {

        return experienceRepository.save(experience);
    }

    public List<Experience> getAllExperiences() {

        return experienceRepository.findAll();
    }

    public Experience getExperienceById(Long id) {

        return experienceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Experience not found"
                        )
                );
    }

    public Experience updateExperience(
            Long id,
            Experience experience) {

        Experience existingExperience =
                experienceRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Experience not found"
                                )
                        );

        existingExperience.setCompany(
                experience.getCompany()
        );

        existingExperience.setPosition(
                experience.getPosition()
        );

        existingExperience.setStartDate(
                experience.getStartDate()
        );

        existingExperience.setEndDate(
                experience.getEndDate()
        );

        existingExperience.setDescription(
                experience.getDescription()
        );

        existingExperience.setTechStack(
                experience.getTechStack()
        );

        return experienceRepository.save(
                existingExperience
        );
    }

    public void deleteExperience(Long id) {

        if (!experienceRepository.existsById(id)) {

            throw new RuntimeException(
                    "Experience not found"
            );
        }

        experienceRepository.deleteById(id);
    }
}