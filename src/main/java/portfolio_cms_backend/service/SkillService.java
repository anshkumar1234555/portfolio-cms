package portfolio_cms_backend.service;

import portfolio_cms_backend.model.Skill;
import portfolio_cms_backend.repository.SkillRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    // CREATE
    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    // GET ALL
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // GET BY ID
    public Skill getSkillById(Long id) {

        return skillRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Skill not found")
                );
    }

    // UPDATE
    public Skill updateSkill(Long id, Skill skill) {

        Skill existingSkill =
                skillRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Skill not found")
                        );

        existingSkill.setName(skill.getName());
        existingSkill.setCategory(skill.getCategory());
        existingSkill.setLevel(skill.getLevel());

        return skillRepository.save(existingSkill);
    }

    // DELETE
    public void deleteSkill(Long id) {

        if (!skillRepository.existsById(id)) {
            throw new RuntimeException("Skill not found");
        }

        skillRepository.deleteById(id);
    }
}