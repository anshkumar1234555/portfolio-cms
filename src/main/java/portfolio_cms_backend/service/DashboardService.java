package portfolio_cms_backend.service;

import portfolio_cms_backend.model.DashboardStats;
import portfolio_cms_backend.repository.ProjectRepository;
import portfolio_cms_backend.repository.SkillRepository;
import portfolio_cms_backend.repository.ExperienceRepository;
import portfolio_cms_backend.repository.EducationRepository;
import portfolio_cms_backend.repository.CertificationRepository;
import portfolio_cms_backend.repository.BlogPostRepository;
import portfolio_cms_backend.repository.ContactMessageRepository;

import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final CertificationRepository certificationRepository;
    private final BlogPostRepository blogPostRepository;
    private final ContactMessageRepository contactMessageRepository;

    public DashboardService(
            ProjectRepository projectRepository,
            SkillRepository skillRepository,
            ExperienceRepository experienceRepository,
            EducationRepository educationRepository,
            CertificationRepository certificationRepository,
            BlogPostRepository blogPostRepository,
            ContactMessageRepository contactMessageRepository) {

        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.certificationRepository = certificationRepository;
        this.blogPostRepository = blogPostRepository;
        this.contactMessageRepository = contactMessageRepository;
    }

    public DashboardStats getStats() {

        return new DashboardStats(
                projectRepository.count(),
                skillRepository.count(),
                experienceRepository.count(),
                educationRepository.count(),
                certificationRepository.count(),
                blogPostRepository.count(),
                contactMessageRepository.count()
        );
    }
}