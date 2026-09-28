package portfolio_cms_backend.service;

import portfolio_cms_backend.model.Certification;
import portfolio_cms_backend.repository.CertificationRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificationService {

    private final CertificationRepository certificationRepository;

    public CertificationService(
            CertificationRepository certificationRepository) {

        this.certificationRepository = certificationRepository;
    }

    // CREATE
    public Certification createCertification(
            Certification certification) {

        return certificationRepository.save(certification);
    }

    // GET ALL
    public List<Certification> getAllCertifications() {

        return certificationRepository.findAll();
    }

    // GET BY ID
    public Certification getCertificationById(Long id) {

        return certificationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Certification not found"
                        )
                );
    }

    // UPDATE
    public Certification updateCertification(
            Long id,
            Certification certification) {

        Certification existingCertification =
                certificationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Certification not found"
                                )
                        );

        existingCertification.setName(
                certification.getName()
        );

        existingCertification.setIssuer(
                certification.getIssuer()
        );

        existingCertification.setIssueDate(
                certification.getIssueDate()
        );

        existingCertification.setCredentialUrl(
                certification.getCredentialUrl()
        );

        return certificationRepository.save(
                existingCertification
        );
    }

    // DELETE
    public void deleteCertification(Long id) {

        if (!certificationRepository.existsById(id)) {

            throw new RuntimeException(
                    "Certification not found"
            );
        }

        certificationRepository.deleteById(id);
    }
}