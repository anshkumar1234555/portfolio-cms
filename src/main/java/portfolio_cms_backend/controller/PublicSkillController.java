package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.Skill;
import portfolio_cms_backend.service.SkillService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/skills")
public class PublicSkillController {

    private final SkillService skillService;

    public PublicSkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {

        return ResponseEntity.ok(
                skillService.getAllSkills()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                skillService.getSkillById(id)
        );
    }
}