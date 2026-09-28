package portfolio_cms_backend.repository;

import portfolio_cms_backend.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}