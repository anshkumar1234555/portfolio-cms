package portfolio_cms_backend.service;

import portfolio_cms_backend.model.Education;
import portfolio_cms_backend.repository.EducationRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {

    private final EducationRepository educationRepository;

    public EducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    // CREATE
    public Education createEducation(Education education) {
        return educationRepository.save(education);
    }

    // GET ALL
    public List<Education> getAllEducation() {
        return educationRepository.findAll();
    }

    // GET BY ID
    public Education getEducationById(Long id) {

        return educationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Education not found")
                );
    }

    // UPDATE
    public Education updateEducation(
            Long id,
            Education education) {

        Education existingEducation =
                educationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Education not found"
                                )
                        );

        existingEducation.setDegree(
                education.getDegree()
        );

        existingEducation.setInstitution(
                education.getInstitution()
        );

        existingEducation.setStartYear(
                education.getStartYear()
        );

        existingEducation.setEndYear(
                education.getEndYear()
        );

        existingEducation.setDescription(
                education.getDescription()
        );

        return educationRepository.save(existingEducation);
    }

    // DELETE
    public void deleteEducation(Long id) {

        if (!educationRepository.existsById(id)) {
            throw new RuntimeException("Education not found");
        }

        educationRepository.deleteById(id);
    }
}