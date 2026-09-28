package portfolio_cms_backend.repository;

import portfolio_cms_backend.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {
}