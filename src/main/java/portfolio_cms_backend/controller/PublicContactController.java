package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.ContactMessage;
import portfolio_cms_backend.service.ContactMessageService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/contact")
@CrossOrigin(origins = "*")
public class PublicContactController {

    private final ContactMessageService contactMessageService;

    public PublicContactController(
            ContactMessageService contactMessageService) {

        this.contactMessageService = contactMessageService;
    }

    // PUBLIC - SEND CONTACT MESSAGE
    @PostMapping
    public ResponseEntity<ContactMessage> createMessage(
            @RequestBody ContactMessage message) {

        return ResponseEntity.ok(
                contactMessageService.createMessage(message)
        );
    }
}