package portfolio_cms_backend.repository;

import portfolio_cms_backend.model.Certification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificationRepository
        extends JpaRepository<Certification, Long> {
}