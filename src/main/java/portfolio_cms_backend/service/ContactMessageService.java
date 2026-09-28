package portfolio_cms_backend.service;

import portfolio_cms_backend.model.ContactMessage;
import portfolio_cms_backend.repository.ContactMessageRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(
            ContactMessageRepository contactMessageRepository) {

        this.contactMessageRepository = contactMessageRepository;
    }

    // CREATE
    public ContactMessage createMessage(
            ContactMessage message) {

        return contactMessageRepository.save(message);
    }

    // GET ALL
    public List<ContactMessage> getAllMessages() {

        return contactMessageRepository.findAll();
    }

    // GET BY ID
    public ContactMessage getMessageById(Long id) {

        return contactMessageRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Message not found"
                        )
                );
    }

    // DELETE
    public void deleteMessage(Long id) {

        if (!contactMessageRepository.existsById(id)) {

            throw new RuntimeException(
                    "Message not found"
            );
        }

        contactMessageRepository.deleteById(id);
    }
}