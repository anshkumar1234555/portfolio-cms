package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.Certification;
import portfolio_cms_backend.service.CertificationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/certifications")
public class PublicCertificationController {

    private final CertificationService certificationService;

    public PublicCertificationController(
            CertificationService certificationService) {

        this.certificationService = certificationService;
    }

    @GetMapping
    public ResponseEntity<List<Certification>>
    getAllCertifications() {

        return ResponseEntity.ok(
                certificationService.getAllCertifications()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Certification> getCertificationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                certificationService.getCertificationById(id)
        );
    }
}