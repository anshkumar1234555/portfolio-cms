package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.Certification;
import portfolio_cms_backend.service.CertificationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
public class CertificationController {

    private final CertificationService certificationService;

    public CertificationController(
            CertificationService certificationService) {

        this.certificationService = certificationService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Certification> createCertification(
            @RequestBody Certification certification) {

        return ResponseEntity.ok(
                certificationService.createCertification(
                        certification
                )
        );
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Certification>> getAllCertifications() {

        return ResponseEntity.ok(
                certificationService.getAllCertifications()
        );
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Certification> getCertificationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                certificationService.getCertificationById(id)
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Certification> updateCertification(
            @PathVariable Long id,
            @RequestBody Certification certification) {

        return ResponseEntity.ok(
                certificationService.updateCertification(
                        id,
                        certification
                )
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertification(
            @PathVariable Long id) {

        certificationService.deleteCertification(id);

        return ResponseEntity.noContent().build();
    }
}