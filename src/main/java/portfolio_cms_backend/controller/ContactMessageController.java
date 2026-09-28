package portfolio_cms_backend.controller;

import portfolio_cms_backend.model.ContactMessage;
import portfolio_cms_backend.service.ContactMessageService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    public ContactMessageController(
            ContactMessageService contactMessageService) {

        this.contactMessageService = contactMessageService;
    }

    // GET ALL MESSAGES
    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllMessages() {

        return ResponseEntity.ok(
                contactMessageService.getAllMessages()
        );
    }

    // GET MESSAGE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ContactMessage> getMessageById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                contactMessageService.getMessageById(id)
        );
    }

    // DELETE MESSAGE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(
            @PathVariable Long id) {

        contactMessageService.deleteMessage(id);

        return ResponseEntity.noContent().build();
    }
}