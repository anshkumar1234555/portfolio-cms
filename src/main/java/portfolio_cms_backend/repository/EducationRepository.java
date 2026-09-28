package portfolio_cms_backend.repository;

import portfolio_cms_backend.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepository
        extends JpaRepository<Education, Long> {
}