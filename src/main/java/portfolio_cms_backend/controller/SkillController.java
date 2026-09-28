package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.Skill;
import portfolio_cms_backend.service.SkillService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Skill> createSkill(
            @RequestBody Skill skill) {

        return ResponseEntity.ok(
                skillService.createSkill(skill)
        );
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {

        return ResponseEntity.ok(
                skillService.getAllSkills()
        );
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                skillService.getSkillById(id)
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(
            @PathVariable Long id,
            @RequestBody Skill skill) {

        return ResponseEntity.ok(
                skillService.updateSkill(id, skill)
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(
            @PathVariable Long id) {

        skillService.deleteSkill(id);

        return ResponseEntity.noContent().build();
    }
}