package portfolio_cms_backend.repository;

import portfolio_cms_backend.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository
        extends JpaRepository<Experience, Long> {
}